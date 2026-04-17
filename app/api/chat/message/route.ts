import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateWithFallback } from "@/lib/gemini/client"

export async function POST(request: NextRequest) {
  try {
    const { sessionId, message, userId } = await request.json()

    if (!sessionId || !message || !userId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createClient()
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database not available" }, { status: 500 })
    }

    // Store user message
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      user_id: userId,
      role: "user",
      message: message,
    })

    // Get conversation history for context
    const { data: messageHistory } = await supabase
      .from("chat_messages")
      .select("role, message")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(10)

    // Build conversation context
    const conversationHistory = messageHistory
      ?.map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.message}`)
      .join("\n")

    // Create travel-focused prompt
    const travelPrompt = `
You are an expert AI Travel Assistant for Travel~I, a travel planning platform. You help users with:

1. **Trip Planning**: Create detailed itineraries, suggest destinations, plan activities
2. **Flight Recommendations**: Help find flights, explain booking processes, suggest airlines
3. **Hotel Suggestions**: Recommend accommodations based on budget, location, preferences
4. **Travel Tips**: Provide practical advice about destinations, weather, culture, safety
5. **Booking Assistance**: Guide users through booking processes and provide relevant links

**Guidelines:**
- Be helpful, friendly, and enthusiastic about travel
- Provide specific, actionable recommendations
- Include practical details like costs, timing, and booking tips
- When suggesting flights or hotels, mention that users can book through Travel~I's partners
- For complex itineraries, break them down day by day
- Always consider budget, travel dates, and user preferences
- Provide booking links when relevant (use placeholder URLs like booking.com, expedia.com)

**Conversation History:**
${conversationHistory}

**Current User Message:** ${message}

Respond as the Travel~I AI Assistant:
`

    // Get AI response (with retry + model fallback)
    const aiResponse = await generateWithFallback(travelPrompt)

    // Store AI response
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      user_id: userId,
      role: "assistant",
      message: aiResponse,
    })

    // Update session timestamp
    await supabase.from("chat_sessions").update({ updated_at: new Date().toISOString() }).eq("id", sessionId)

    return NextResponse.json({
      success: true,
      response: aiResponse,
    })
  } catch (error) {
    console.error("Chat message error:", error)
    return NextResponse.json({ success: false, error: "Failed to process message" }, { status: 500 })
  }
}
