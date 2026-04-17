import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Parse the request body
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Get current user (optional - contact form can work for anonymous users)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Prepare contact submission data
    const contactData = {
      name: `${firstName} ${lastName}`,
      email,
      subject,
      message,
      category: "general", // Default category
      priority: "normal", // Default priority
      status: "new", // Default status
      user_id: user?.id || null, // Optional user ID if logged in
      created_at: new Date().toISOString(),
    }

    // Insert into contact_submissions table
    const { data, error } = await supabase.from("contact_submissions").insert([contactData]).select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        data: data[0],
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
