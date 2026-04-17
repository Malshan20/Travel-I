"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Upload, BarChart3 } from "lucide-react"
import Link from "next/link"
import { QuickActions } from "./quick-actions"
import { WeatherLocation } from "./weather-locations"
import { LocationMap } from "./location-map"
import { WelcomeTour } from "./welcome-tour"
import { WeatherForecast } from "../weather/weather-forecast"

interface DashboardOverviewProps {
  user: any
  profile: any
  userStats: any
  recentUploads: any[]
  recentChats: any[]
}

export function DashboardOverview({ user, profile, userStats, recentUploads, recentChats }: DashboardOverviewProps) {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationName, setLocationName] = useState<string>("")
  const [showWelcomeTour, setShowWelcomeTour] = useState(false)

  // Check if this is a new user (no uploads or chats)
  useEffect(() => {
    const isNewUser = recentUploads.length === 0 && recentChats.length === 0
    const hasSeenTour = localStorage.getItem("travel-i-welcome-tour")

    if (isNewUser && !hasSeenTour) {
      setShowWelcomeTour(true)
    }
  }, [recentUploads, recentChats])

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          // Reverse geocode to get location name (simplified)
          setLocationName("Current Location")
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationName("Location unavailable")
        },
      )
    }
  }, [])

  const handleWelcomeTourComplete = () => {
    setShowWelcomeTour(false)
    localStorage.setItem("travel-i-welcome-tour", "completed")
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name || user.email?.split("@")[0]}!
          </h1>
          <p className="text-lg text-gray-600">Ready to explore the world? Let's plan your next adventure.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <QuickActions />

            {/* Current Weather Forecast */}
            <WeatherForecast />

            {/* User Stats */}
            <WeatherLocation />

            
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Location */}
            
            <LocationMap currentLocation={currentLocation} locationName={locationName} />

            {/* Quick Stats Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-[#3E5F44]" />
                Your Travel Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Photos Uploaded</span>
                  <span className="font-semibold text-[#3E5F44]">{userStats?.photos_uploaded || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Destinations Visited</span>
                  <span className="font-semibold text-[#3E5F44]">{userStats?.destinations_visited || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Trips Planned</span>
                  <span className="font-semibold text-[#3E5F44]">{userStats?.trips_planned || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hotels Booked</span>
                  <span className="font-semibold text-[#3E5F44]">{userStats?.hotels_booked || 0}</span>
                </div>
              </div>
            </Card>

            {/* Travel Tips */}
            <Card className="p-6 bg-gradient-to-br from-[#3E5F44]/5 to-[#8fbc8f]/10">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#3E5F44]" />
                Travel Tip
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Upload photos from your past trips to rediscover amazing places and get personalized recommendations for
                similar destinations!
              </p>
              <Link href="/upload">
                <Button size="sm" className="bg-[#3E5F44] hover:bg-[#2f4a35] text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      {/* Welcome Tour */}
      {showWelcomeTour && <WelcomeTour onComplete={handleWelcomeTourComplete} />}
    </>
  )
}
