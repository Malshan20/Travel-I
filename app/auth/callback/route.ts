import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        // In a server environment, you can't use alert, but you can pass the error message to the client via redirect
        const errorMessage = encodeURIComponent(error.message || "auth_error")
        console.error("Auth callback error:", error)
        return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=${errorMessage}`)
      }

      if (data.user) {
        const isPasswordRecovery = requestUrl.searchParams.get("type") === "recovery"

        if (isPasswordRecovery) {
          return NextResponse.redirect(`${requestUrl.origin}/auth/reset-password`)
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", data.user.id)
          .single()

        if (profileError && profileError.code === "PGRST116") {
          // Profile doesn't exist, create one
          const { error: insertError } = await supabase.from("profiles").insert({
            id: data.user.id,
            full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || "",
            email: data.user.email || "",
            username: data.user.user_metadata?.preferred_username || data.user.email?.split("@")[0] || "",
          })

          if (insertError) {
            console.error("Profile creation error:", insertError)
          }
        }
      }

      return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
    } catch (error) {
      console.error("Unexpected auth error:", error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=unexpected_error`)
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=no_code`)
}
