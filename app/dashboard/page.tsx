import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { WebappNavbar } from "@/components/navigation/webapp-navbar"

export default async function DashboardPage() {
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

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get user stats
  const { data: userStats } = await supabase.from("user_stats").select("*").eq("user_id", user.id).single()

  // Get recent uploads
  const { data: recentUploads } = await supabase
    .from("uploads")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Get recent chat sessions
  const { data: recentChats } = await supabase
    .from("chat_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(3)

  return (
    <div className="min-h-screen bg-gray-50">
      <WebappNavbar />
      <main className="pt-20">
        <DashboardOverview
          user={user}
          profile={profile}
          userStats={userStats}
          recentUploads={recentUploads || []}
          recentChats={recentChats || []}
        />
      </main>
    </div>
  )
}
