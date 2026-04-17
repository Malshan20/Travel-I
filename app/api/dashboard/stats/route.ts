import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database not available" }, { status: 500 })
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Get or create user stats
    let { data: userStats } = await supabase.from("user_stats").select("*").eq("user_id", user.id).single()

    if (!userStats) {
      // Create initial stats record
      const { data: newStats } = await supabase
        .from("user_stats")
        .insert({
          user_id: user.id,
          photos_uploaded: 0,
          destinations_visited: 0,
          trips_planned: 0,
          hotels_booked: 0,
        })
        .select("*")
        .single()

      userStats = newStats
    }

    // Update stats based on actual data
    const { count: uploadsCount } = await supabase
      .from("uploads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    const { count: chatsCount } = await supabase
      .from("chat_sessions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    const { count: hotelsCount } = await supabase
      .from("hotel_searches")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    // Update the stats
    await supabase
      .from("user_stats")
      .update({
        photos_uploaded: uploadsCount || 0,
        trips_planned: chatsCount || 0,
        hotels_booked: hotelsCount || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)

    return NextResponse.json({
      success: true,
      stats: {
        ...userStats,
        photos_uploaded: uploadsCount || 0,
        trips_planned: chatsCount || 0,
        hotels_booked: hotelsCount || 0,
      },
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
