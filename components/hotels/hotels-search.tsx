"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Search, Calendar, Users, Loader2, ExternalLink } from "lucide-react"

export function HotelsSearch() {
  const searchParams = useSearchParams()
  const [searchLocation, setSearchLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const locationParam = searchParams.get("location")
    if (locationParam) {
      setSearchLocation(decodeURIComponent(locationParam))
    }
  }, [searchParams])

  // Set default dates (today + 1 day for check-in, today + 2 days for check-out)
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(dayAfter.getDate() + 2)

    setCheckIn(tomorrow.toISOString().split("T")[0])
    setCheckOut(dayAfter.toISOString().split("T")[0])
  }, [])

  const handleSearch = async () => {
    if (!searchLocation.trim()) return

    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
    }, 1000)
  }

  const googleMapsHotelsUrl = `https://www.google.com/maps/search/hotels+near+${encodeURIComponent(searchLocation)}`

  const embeddedHotelsMapUrl = searchLocation
    ? `https://www.google.com/maps?q=hotels+near+${encodeURIComponent(searchLocation)}&output=embed`
    : null

  const bookingUrl = searchLocation ? `https://booking.com/${encodeURIComponent(searchLocation)}` : null

  // const bookingUrl = searchLocation
  // ? `https://www.trip.com/?Allianceid=7032628&SID=256111535&trip_sub1=&trip_sub3=D5205503/${encodeURIComponent(searchLocation)}`
  // : null

  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Hotels</h1>
        <p className="text-lg text-gray-600">Discover and book the perfect accommodation for your travels</p>
      </div>

      {/* Search Form */}
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="location"
                type="text"
                placeholder="Enter city or landmark"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          <div>
            <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-2">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-2">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
              Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchLocation.trim()}
            className="w-full md:w-auto bg-[#0077b6] hover:bg-[#005a8b] text-white px-8"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search Hotels
              </>
            )}
          </Button>
        </div>
      </Card>

      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Hotels Map</h3>
          <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
            {embeddedHotelsMapUrl ? (
              <iframe
                src={embeddedHotelsMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Hotels map for ${searchLocation}`}
              />
            ) : (
              <div className="h-full bg-gradient-to-br from-[#0077b6]/5 to-[#87ceeb]/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Enter a location to view hotels on map</p>
                </div>
              </div>
            )}
          </div>
          {searchLocation && (
            <div className="mt-4 text-center">
              <a
                href={googleMapsHotelsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm text-[#0077b6] hover:text-[#005a8b] transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Maps
              </a>
            </div>
          )}

          {searchLocation && bookingUrl && (
            <div className="mt-4 text-center">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-[#0077b6] hover:bg-[#005a8b] text-white font-semibold rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Book Now
              </a>
            </div>
          )}


          
        </Card>
      </div>
    </div>
  )
}
