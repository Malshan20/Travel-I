"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, Clock, Route, Loader2, Car, Train, ExternalLink, Plane } from "lucide-react"

interface RouteInfo {
  distance: string
  duration: string
  mode: string
  steps: string[]
}

export function DirectionsPlanner() {
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [travelMode, setTravelMode] = useState("driving")
  const [isCalculating, setIsCalculating] = useState(false)
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setFromLocation("Current Location")
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  const handleCalculateRoute = async () => {
    if (!fromLocation.trim() || !toLocation.trim()) return

    setIsCalculating(true)
    try {
      const response = await fetch("/api/directions/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromLocation,
          to: toLocation,
          mode: travelMode,
          userLocation,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setRouteInfo(data.route)
      }
    } catch (error) {
      console.error("Route calculation error:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(fromLocation)}/${encodeURIComponent(toLocation)}`

  const realTimeDirectionsMapUrl =
    fromLocation && toLocation
      ? `https://www.google.com/maps?saddr=${encodeURIComponent(fromLocation)}&daddr=${encodeURIComponent(toLocation)}&output=embed`
      : null

  const travelModes = [
    { id: "driving", name: "Driving", icon: Car },
    { id: "transit", name: "Transit", icon: Train },
    { id: "walking", name: "Walking", icon: Navigation },
    { id: "flight", name: "Flight", icon: Plane },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Directions</h1>
        <p className="text-lg text-gray-600">Plan your route and get turn-by-turn directions to any destination</p>
      </div>

      {/* Route Planning Form */}
      <Card className="p-6 mb-8">
        <div className="space-y-6">
          {/* From and To Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                <Input
                  id="from"
                  type="text"
                  placeholder="Enter starting location"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
                <Input
                  id="to"
                  type="text"
                  placeholder="Enter destination"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleCalculateRoute()}
                />
              </div>
            </div>
          </div>

          {/* Travel Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Travel Mode</label>
            <div className="flex space-x-4">
              {travelModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setTravelMode(mode.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    travelMode === mode.id
                      ? "bg-[#3E5F44] text-white border-[#3E5F44]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#3E5F44]"
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  <span>{mode.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <Button
            onClick={handleCalculateRoute}
            disabled={isCalculating || !fromLocation.trim() || !toLocation.trim()}
            className="w-full md:w-auto bg-[#3E5F44] hover:bg-[#2f4a35] text-white px-8"
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Calculating Route...
              </>
            ) : (
              <>
                <Route className="w-4 h-4 mr-2" />
                Get Directions
              </>
            )}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Route Information */}
        <div className="lg:col-span-1 space-y-6">
          {routeInfo ? (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#3E5F44]/5 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#3E5F44]" />
                    <span className="font-medium">Duration</span>
                  </div>
                  <span className="font-semibold text-[#3E5F44]">{routeInfo.duration}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#3E5F44]/5 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Route className="w-4 h-4 text-[#3E5F44]" />
                    <span className="font-medium">Distance</span>
                  </div>
                  <span className="font-semibold text-[#3E5F44]">{routeInfo.distance}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Turn-by-turn Directions</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {routeInfo.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 text-sm">
                        <div className="w-6 h-6 bg-[#3E5F44] text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ) : fromLocation && toLocation && !isCalculating ? (
            <Card className="p-6 text-center">
              <Route className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Click "Get Directions" to calculate your route</p>
            </Card>
          ) : (
            <Card className="p-6 text-center">
              <Navigation className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Enter your starting point and destination to get directions</p>
            </Card>
          )}
        </div>

        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Map</h3>
            <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
              {realTimeDirectionsMapUrl ? (
                <iframe
                  src={realTimeDirectionsMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Real-time directions from ${fromLocation} to ${toLocation}`}
                />
              ) : (
                <div className="h-full bg-gradient-to-br from-[#3E5F44]/5 to-[#8fbc8f]/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter locations to view route on map</p>
                  </div>
                </div>
              )}
            </div>
            {fromLocation && toLocation && (
              <div className="mt-4 text-center">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm text-[#3E5F44] hover:text-[#2f4a35] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </a>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
