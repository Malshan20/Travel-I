import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"
import { WebappNavbar } from "@/components/navigation/webapp-navbar"

export default async function AIChatPage() {
  const supabase = createClient()

  if (!supabase) {
    redirect("/auth/login")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WebappNavbar />
      <main className="pt-20 h-screen">
        <ChatInterface userId={user.id} />
      </main>
    </div>
  )
}
