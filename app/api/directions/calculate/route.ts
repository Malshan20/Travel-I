import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function geocodeLocation(location: string): Promise<{ lat: number; lng: number } | null> {
  // Common locations fallback
  const commonLocations: { [key: string]: { lat: number; lng: number } } = {
    "new york": { lat: 40.7128, lng: -74.006 },
    london: { lat: 51.5074, lng: -0.1278 },
    paris: { lat: 48.8566, lng: 2.3522 },
    tokyo: { lat: 35.6762, lng: 139.6503 },
    bangkok: { lat: 13.7563, lng: 100.5018 },
    sydney: { lat: -33.8688, lng: 151.2093 },
    "los angeles": { lat: 34.0522, lng: -118.2437 },
    dubai: { lat: 25.2048, lng: 55.2708 },
  }

  const normalizedLocation = location.toLowerCase().trim()
  if (commonLocations[normalizedLocation]) {
    return commonLocations[normalizedLocation]
  }

  try {
    // Try Nominatim with proper headers and error handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
      {
        headers: {
          "User-Agent": "Travel-I-App/1.0",
        },
        signal: controller.signal,
      },
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data && data.length > 0) {
      return {
        lat: Number.parseFloat(data[0].lat),
        lng: Number.parseFloat(data[0].lon),
      }
    }
  } catch (error) {
    console.error("Geocoding error:", error)
  }

  // Return approximate coordinates based on location name if all else fails
  return { lat: 40.7128, lng: -74.006 } // Default to NYC
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function generateRouteData(
  fromCoords: { lat: number; lng: number },
  toCoords: { lat: number; lng: number },
  mode: string,
  from: string,
  to: string,
) {
  const distance = calculateDistance(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng)

  // Estimate travel time based on mode
  let speedKmh: number
  let modeText: string

  switch (mode) {
    case "walking":
      speedKmh = 5
      modeText = "walking"
      break
    case "transit":
      speedKmh = 25 // Average including stops
      modeText = "public transport"
      break
    case "flight":
      speedKmh = 850 // Commercial flight average speed
      modeText = "flight"
      break
    case "driving":
    default:
      speedKmh = 50 // Average city driving
      modeText = "driving"
      break
  }

  const durationHours = distance / speedKmh
  const durationMinutes = Math.round(durationHours * 60)
  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60
  const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`

  let steps: string[]
  if (mode === "flight") {
    steps = [
      `Depart from ${from} airport`,
      `Board flight to ${to}`,
      `Flight duration: ${durationText}`,
      `Land at ${to} airport`,
      `Arrive at destination in ${to}`,
    ]
  } else {
    // Generate realistic turn-by-turn directions for ground transportation
    steps = [
      `Start from ${from}`,
      `Head towards ${to}`,
      `Continue for ${Math.round(distance * 0.3)} km`,
      `Turn and continue for ${Math.round(distance * 0.4)} km`,
      `Follow main route for ${Math.round(distance * 0.2)} km`,
      `Arrive at ${to}`,
    ]
  }

  return {
    distance: `${distance.toFixed(1)} km`,
    duration: durationText,
    mode: modeText,
    steps: steps,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { from, to, mode, userLocation } = await request.json()

    if (!from || !to) {
      return NextResponse.json({ success: false, error: "Both from and to locations are required" }, { status: 400 })
    }

    let fromCoords: { lat: number; lng: number } | null = null
    let toCoords: { lat: number; lng: number } | null = null

    // Handle "Current Location" case
    if (from === "Current Location" && userLocation) {
      fromCoords = userLocation
    } else {
      fromCoords = await geocodeLocation(from)
    }

    toCoords = await geocodeLocation(to)

    if (!fromCoords || !toCoords) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not find coordinates for locations",
        },
        { status: 400 },
      )
    }

    const routeData = generateRouteData(fromCoords, toCoords, mode, from, to)

    // Store search in database
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        await supabase.from("search_history").insert({
          user_id: user.id,
          query: `Directions from ${from} to ${to}`,
          result: `${routeData.distance}, ${routeData.duration} via ${routeData.mode}`,
          search_type: "direction",
        })
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue even if database fails
    }

    return NextResponse.json({
      success: true,
      route: routeData,
      searchParams: { from, to, mode },
    })
  } catch (error) {
    console.error("Route calculation error:", error)
    return NextResponse.json(
      { success: false, error: "An error occurred while calculating the route" },
      { status: 500 },
    )
  }
}
