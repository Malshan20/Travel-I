"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { resetPassword } from "@/lib/actions/auth"
import Link from "next/link"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary/80 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Sending reset link...
        </>
      ) : (
        "Send Reset Link"
      )}
    </Button>
  )
}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(resetPassword, null)

  if (state?.success) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Check Your Email</h3>
        <p className="text-gray-600">
          We've sent a password reset link to your email address. Please check your inbox and follow the instructions to
          reset your password.
        </p>
        <div className="pt-4">
          <Link href="/auth/login">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{state.error}</div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="pl-10 py-3 border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      <SubmitButton />

      <div className="text-center">
        <Link href="/auth/login">
          <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </Link>
      </div>
    </form>
  )
}
