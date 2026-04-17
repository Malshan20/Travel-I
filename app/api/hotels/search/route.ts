import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { location, checkIn, checkOut, guests } = await request.json()

    if (!location) {
      return NextResponse.json({ success: false, error: "Location is required" }, { status: 400 })
    }

    // Store search in database
    const supabase = createClient()
    if (supabase) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          await supabase.from("hotel_searches").insert({
            user_id: user.id,
            city: location,
            check_in_date: checkIn,
            check_out_date: checkOut,
            adults: guests,
            rooms: 1,
          })
        }
      } catch (dbError) {
        console.error("Database error:", dbError)
      }
    }

    // Mock hotel data (in a real app, this would call a hotel booking API)
    const mockHotels = [
      {
        id: "1",
        name: "Grand Plaza Hotel",
        rating: 4.5,
        priceRange: "$120-180",
        distance: "0.5 km",
        amenities: ["wifi", "parking", "breakfast"],
        imageUrl: "/placeholder.svg?height=200&width=300",
        bookingUrl: `https://www.booking.com/search?ss=${encodeURIComponent(location)}`,
        address: `123 Main Street, ${location}`,
      },
      {
        id: "2",
        name: "Boutique City Inn",
        rating: 4.2,
        priceRange: "$90-140",
        distance: "0.8 km",
        amenities: ["wifi", "breakfast"],
        imageUrl: "/placeholder.svg?height=200&width=300",
        bookingUrl: `https://www.booking.com/search?ss=${encodeURIComponent(location)}`,
        address: `456 Central Ave, ${location}`,
      },
      {
        id: "3",
        name: "Luxury Resort & Spa",
        rating: 4.8,
        priceRange: "$250-400",
        distance: "2.1 km",
        amenities: ["wifi", "parking", "breakfast"],
        imageUrl: "/placeholder.svg?height=200&width=300",
        bookingUrl: `https://www.booking.com/search?ss=${encodeURIComponent(location)}`,
        address: `789 Resort Blvd, ${location}`,
      },
    ]

    return NextResponse.json({
      success: true,
      hotels: mockHotels,
      searchParams: { location, checkIn, checkOut, guests },
    })
  } catch (error) {
    console.error("Hotel search error:", error)
    return NextResponse.json({ success: false, error: "An error occurred while searching for hotels" }, { status: 500 })
  }
}
