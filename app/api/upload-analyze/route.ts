import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateWithFallback } from "@/lib/gemini/client"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "File must be an image" }, { status: 400 })
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "Compressed file size must be less than 2MB" }, { status: 400 })
    }

    console.log(`[v0] Processing compressed image: ${(file.size / 1024).toFixed(2)}KB`)

    // Convert file to base64 for Gemini API
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")

    // Analyze image with Gemini (with retry + model fallback)
    const prompt = `
    Analyze this travel photo and identify the exact location. Please provide:
    1. The specific location name (city, landmark, or place)
    2. Country and region
    3. Approximate coordinates (latitude, longitude) if recognizable
    4. Confidence level (0-100%)
    5. Notable landmarks or features visible
    6. Brief description of what makes this location identifiable

    Format your response as JSON with these fields:
    {
      "location": "Specific place name, City, Country",
      "coordinates": {"lat": number, "lng": number},
      "confidence": number,
      "landmarks": ["landmark1", "landmark2"],
      "description": "Brief description"
    }

    If you cannot identify the location with reasonable confidence, set confidence to 0 and explain why in the description.
    `

    const text = await generateWithFallback([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: file.type,
        },
      },
    ])

    // Parse the JSON response
    let analysisResult
    try {
      // Extract JSON from the response (remove any markdown formatting)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to analyze image. Please try with a clearer photo of a recognizable location.",
        },
        { status: 500 },
      )
    }

    // Validate confidence level
    if (analysisResult.confidence < 30) {
      return NextResponse.json({
        success: false,
        error:
          "Could not identify location with sufficient confidence. Please try a photo with more recognizable landmarks or features.",
      })
    }

    // Store upload in database
    const supabase = createClient()
    let uploadId = null

    if (supabase) {
      try {
        // Get current user (if logged in)
        const {
          data: { user },
        } = await supabase.auth.getUser()

        // Store upload record
        const { data: uploadData, error: uploadError } = await supabase
          .from("uploads")
          .insert({
            user_id: user?.id || null, // Allow anonymous uploads
            image_url: `data:${file.type};base64,${base64Image}`, // Store as data URL for demo
            detected_location: analysisResult.location,
            latitude: analysisResult.coordinates?.lat || null,
            longitude: analysisResult.coordinates?.lng || null,
          })
          .select("id")
          .single()

        if (uploadData) {
          uploadId = uploadData.id
        }
      } catch (dbError) {
        console.error("Database error:", dbError)
        // Continue without storing - don't fail the request
      }
    }

    return NextResponse.json({
      success: true,
      location: analysisResult.location,
      coordinates: analysisResult.coordinates,
      confidence: analysisResult.confidence,
      landmarks: analysisResult.landmarks || [],
      description: analysisResult.description,
      uploadId,
    })
  } catch (error) {
    console.error("Upload analysis error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while analyzing your image. Please try again.",
      },
      { status: 500 },
    )
  }
}
