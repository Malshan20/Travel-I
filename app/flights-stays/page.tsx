import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { FlightStayBooking } from "@/components/flights-stays/flight-stay-booking"
import { WebappNavbar } from "@/components/navigation/webapp-navbar"

export default async function FlightStayPage() {
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
        <FlightStayBooking />
      </main>
    </div>
  )
}
