import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    // Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("[v0] Cloudinary configuration missing")
      return NextResponse.json(
        { success: false, error: "Server configuration error: Missing Cloudinary credentials" },
        { status: 500 },
      )
    }

    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      console.error("[v0] No file provided in convert request")
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.error("[v0] Invalid file type in convert request:", file.type)
      return NextResponse.json({ success: false, error: "File must be an image" }, { status: 400 })
    }

    console.log(`[v0] Converting image: ${file.name}, size: ${(file.size / 1024).toFixed(2)}KB, type: ${file.type}`)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary and convert to JPEG
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          format: "jpg",
          quality: 60, // Optimize for size
          public_id: `converted_${Date.now()}`,
        },
        (error, result) => {
          if (error) {
            console.error("[v0] Cloudinary upload error:", error)
            reject(new Error("Failed to convert image with Cloudinary"))
          } else {
            resolve(result)
          }
        },
      )
      uploadStream.end(buffer)
    })

    const result = uploadResult as { secure_url: string }

    // Fetch the converted image as a buffer
    const response = await fetch(result.secure_url)
    if (!response.ok) {
      console.error("[v0] Failed to fetch converted image:", response.statusText)
      throw new Error("Failed to retrieve converted image")
    }

    const convertedBuffer = await response.arrayBuffer()
    const base64Image = Buffer.from(convertedBuffer).toString("base64")

    console.log("[v0] Image converted successfully, size: ${(convertedBuffer.byteLength / 1024).toFixed(2)}KB")

    return NextResponse.json({
      success: true,
      base64: base64Image,
      mimeType: "image/jpeg",
      fileName: file.name.replace(/\.(heic|heif)$/i, ".jpg"),
    })
  } catch (error: any) {
    console.error("[v0] Image conversion error:", error.message, error.stack)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to convert image. Please try another image.",
      },
      { status: 500 },
    )
  }
}