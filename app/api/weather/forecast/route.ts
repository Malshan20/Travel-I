import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")
    const location = searchParams.get("location")

    const apiKey = process.env.WEATHER_API_KEY

    if (!apiKey) {
      console.log("[v0] Weather API key not found, using mock data")
      return NextResponse.json({
        location: { name: "Demo City", country: "Demo Country" },
        current: {
          temp_c: 22,
          condition: { text: "Partly cloudy", icon: "" },
          humidity: 65,
          wind_kph: 15,
        },
        forecast: {
          forecastday: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            day: {
              maxtemp_c: 25 - i,
              mintemp_c: 15 - i,
              condition: { text: i % 2 === 0 ? "Sunny" : "Cloudy", icon: "" },
            },
          })),
        },
      })
    }

    let query = ""
    if (lat && lon) {
      query = `${lat},${lon}`
    } else if (location) {
      query = location
    } else {
      query = "London" // Default fallback
    }

    console.log("[v0] Fetching weather forecast for:", query)

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=no&alerts=no`,
      { next: { revalidate: 1800 } }, // Cache for 30 minutes
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Weather forecast fetched successfully")

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Weather forecast error:", error)

    // Return mock data on error
    return NextResponse.json({
      location: { name: "Demo City", country: "Demo Country" },
      current: {
        temp_c: 22,
        condition: { text: "Partly cloudy", icon: "" },
        humidity: 65,
        wind_kph: 15,
      },
      forecast: {
        forecastday: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          day: {
            maxtemp_c: 25 - i,
            mintemp_c: 15 - i,
            condition: { text: i % 2 === 0 ? "Sunny" : "Cloudy", icon: "" },
          },
        })),
      },
    })
  }
}
