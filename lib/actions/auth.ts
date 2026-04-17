"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()
  if (!supabase) {
    return { error: "Supabase client not available" }
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()
  if (!supabase) {
    return { error: "Supabase client not available" }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard`,
        data: {
          full_name: fullName?.toString() || "",
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    // Create profile entry
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName?.toString() || "",
      })
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const supabase = createClient()
  if (!supabase) {
    redirect("/auth/login")
    return
  }

  await supabase.auth.signOut()
  redirect("/")
}

export async function resetPassword(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")

  if (!email) {
    return { error: "Email is required" }
  }

  const supabase = createClient()
  if (!supabase) {
    return { error: "Supabase client not available" }
  }

  try {
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
      : `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || "http://localhost:3000"}/auth/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email.toString(), {
      redirectTo: redirectUrl,
    });

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Password reset error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function updatePassword(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  if (!password || !confirmPassword) {
    return { error: "Both password fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.toString().length < 6) {
    return { error: "Password must be at least 6 characters long" }
  }

  const supabase = createClient()
  if (!supabase) {
    return { error: "Supabase client not available" }
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return {
        error: "You must be logged in to update your password. Please click the reset link from your email again.",
      }
    }

    const { error } = await supabase.auth.updateUser({
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Password update error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
