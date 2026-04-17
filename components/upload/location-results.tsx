"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Hotel, MessageCircle, Bookmark, ExternalLink } from "lucide-react"
import Link from "next/link"

interface LocationResultsProps {
  location: string
  coordinates?: { lat: number; lng: number }
  landmarks?: string[]
  confidence?: number
  imageUrl?: string | null
  isLoggedIn?: boolean
}

export function LocationResults({ location, coordinates, landmarks, confidence, imageUrl, isLoggedIn = false }: LocationResultsProps) {
  const googleMapsSearchUrl = coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

  const hotelsSearchUrl = coordinates
    ? `https://www.google.com/maps/search/hotels+near+${coordinates.lat},${coordinates.lng}`
    : `https://www.google.com/maps/search/hotels+near+${encodeURIComponent(location)}`

  const embeddedMapUrl = coordinates
    ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image */}
          {imageUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Photo</h3>
              <img src={imageUrl || "/placeholder.svg"} alt="Uploaded" className="w-full rounded-lg shadow-lg" />
            </div>
          )}

          {/* Location Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Location</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#0077b6] mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{location}</h4>
                    {coordinates && (
                      <p className="text-sm text-gray-600">
                        {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                      </p>
                    )}
                  </div>
                </div>

                {confidence && (
                  <div className="bg-[#0077b6]/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-[#0077b6]">Confidence: {confidence}%</p>
                  </div>
                )}
              </div>
            </div>

            {/* Landmarks */}
            {landmarks && landmarks.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Nearby Landmarks</h4>
                <div className="flex flex-wrap gap-2">
                  {landmarks.map((landmark, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {landmark}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Explore This Location</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={`/hotels?location=${encodeURIComponent(location)}`}
                  className="flex items-center justify-center px-4 py-2 border border-[#0077b6] text-[#0077b6] rounded-lg hover:bg-[#0077b6] hover:text-white transition-colors"
                >
                  <Hotel className="w-4 h-4 mr-2" />
                  Find Hotels
                </Link>
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#005a8b] transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Maps
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location on Map</h3>
        <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
          <iframe
            src={embeddedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing ${location}`}
          />
        </div>
        <div className="mt-4 text-center">
          <a
            href={googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm text-[#0077b6] hover:text-[#005a8b] transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Google Maps
          </a>
        </div>
      </Card>

      {/* Premium Features CTA */}
      {!isLoggedIn && (
        <Card className="p-6 bg-gradient-to-r from-[#0077b6]/10 to-[#0077b6]/5 border-[#0077b6]/20">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Want More Features?</h3>
           
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard">
                <Button className="bg-[#0077b6] hover:bg-[#005a8b] text-white">Check out our Premium Features</Button>
              </Link>
              
            </div> 

            {/* Feature Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Hotel className="w-6 h-6 text-[#0077b6] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Hotel Booking</p>
              </div>
              <div className="text-center">
                <Navigation className="w-6 h-6 text-[#0077b6] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Directions</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-6 h-6 text-[#0077b6] mx-auto mb-1" />
                <p className="text-xs text-gray-600">AI Assistant</p>
              </div>
              <div className="text-center">
                <Bookmark className="w-6 h-6 text-[#0077b6] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Save Places</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
