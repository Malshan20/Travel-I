import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { MapPin } from "lucide-react"

export default async function LoginPage() {
  const supabase = createClient()

  if (supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If user is already logged in, redirect to dashboard
    if (session) {
      redirect("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3E5F44]/5 to-[#8fbc8f]/10 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#3E5F44] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Travel~I</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Sign in to access your travel dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <LoginForm />

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="font-semibold text-[#3E5F44] hover:text-[#2f4a35] transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link href="/" className="text-gray-500 hover:text-[#3E5F44] transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
