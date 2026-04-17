import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { WebappNavbar } from "@/components/navigation/webapp-navbar"
import { ItineraryBuilder } from "@/components/itinerary-builder/itinerary-builder"

export default async function ItineraryBuilderPage() {
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
      <main className="pt-20">
        <ItineraryBuilder />
      </main>
    </div>
  )
}
