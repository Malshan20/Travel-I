import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const supabase = createClient()
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database not available" }, { status: 500 })
    }

    // Check for existing active session
    const { data: existingSessions } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(1)

    let sessionId: string

    if (existingSessions && existingSessions.length > 0) {
      // Use existing session
      sessionId = existingSessions[0].id

      // Update the session timestamp
      await supabase.from("chat_sessions").update({ updated_at: new Date().toISOString() }).eq("id", sessionId)
    } else {
      // Create new session
      const { data: newSession, error } = await supabase
        .from("chat_sessions")
        .insert({
          user_id: userId,
          title: "Travel Chat",
        })
        .select("id")
        .single()

      if (error || !newSession) {
        throw new Error("Failed to create chat session")
      }

      sessionId = newSession.id
    }

    // Get recent messages for this session
    const { data: messages } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(50)

    const formattedMessages = messages?.map((msg) => ({
      id: msg.id,
      role: msg.role,
      content: msg.message,
      timestamp: new Date(msg.created_at),
    }))

    return NextResponse.json({
      success: true,
      sessionId,
      messages: formattedMessages || [],
    })
  } catch (error) {
    console.error("Session creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create chat session" }, { status: 500 })
  }
}
