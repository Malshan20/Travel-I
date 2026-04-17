import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const city = searchParams.get("city")

  // You'll need to add WEATHER_API_KEY to your environment variables
  const apiKey = process.env.WEATHER_API_KEY || "demo_key"

  try {
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`

    if (lat && lon) {
      url += `&q=${lat},${lon}`
    } else if (city) {
      url += `&q=${city}`
    } else {
      url += `&q=New York` // Default fallback
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Weather API request failed")
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Weather API error:", error)

    // Return mock data as fallback
    return NextResponse.json({
      location: {
        name: "Unknown",
        country: "Unknown",
      },
      current: {
        temp_c: 22,
        condition: {
          text: "Partly cloudy",
          code: 1003,
        },
      },
    })
  }
}
