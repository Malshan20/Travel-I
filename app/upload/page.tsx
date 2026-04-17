import { ImageUploadSection } from "@/components/upload/image-upload-section"
import { PublicNavbar } from "@/components/navigation/public-navbar"
import { WebappNavbar } from "@/components/navigation/webapp-navbar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upload Travel Photos - AI Location Detection | Free Photo Analysis",
  description:
    "Upload your travel photos and instantly discover where they were taken using AI. Free photo location detection service. Identify landmarks, cities, and destinations from any travel image.",
  keywords: [
    "photo location detection",
    "AI photo analysis",
    "travel photo identification",
    "where was this photo taken",
    "image location finder",
    "travel photo AI",
    "location from photo",
    "photo geolocation",
    "travel image recognition",
    "free photo analysis",
  ],
  openGraph: {
    title: "Upload Travel Photos - AI Location Detection | Travel~I",
    description:
      "Upload your travel photos and instantly discover where they were taken using AI. Free photo location detection service.",
    url: "/upload",
    images: [
      {
        url: "/og-upload.jpg",
        width: 1200,
        height: 630,
        alt: "Upload Travel Photos for AI Location Detection",
      },
    ],
  },
  twitter: {
    title: "Upload Travel Photos - AI Location Detection",
    description: "Upload your travel photos and instantly discover where they were taken using AI. Free service.",
    images: ["/twitter-upload.jpg"],
  },
  alternates: {
    canonical: "/upload",
  },
}

export default async function UploadPage() {
  const supabase = createClient()

  if (!supabase) {
    redirect("/auth/login")
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0077b6]/5 to-[#87ceeb]/10">
      {user ? <WebappNavbar /> : <PublicNavbar />}
      <main className="pt-20">
        <ImageUploadSection />
      </main>
    </div>
  )
}
