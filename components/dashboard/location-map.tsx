"use client"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, ExternalLink } from "lucide-react"

interface LocationMapProps {
  currentLocation: { lat: number; lng: number } | null
  locationName: string
}

export function LocationMap({ currentLocation, locationName }: LocationMapProps) {
  const googleMapsUrl = currentLocation
    ? `https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}`
    : null

  const embeddedLocationMapUrl = currentLocation
    ? `https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&output=embed`
    : null

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Navigation className="w-5 h-5 mr-2 text-[#3E5F44]" />
        Your Location
      </h3>

      {currentLocation ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <MapPin className="w-4 h-4 text-[#3E5F44]" />
            <span className="text-sm">{locationName}</span>
          </div>

          <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={embeddedLocationMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Current location: ${locationName}`}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Coordinates: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 text-xs text-[#3E5F44] hover:text-[#2f4a35] transition-colors"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Open in Maps
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 text-sm mb-2">Location not available</p>
          <p className="text-xs text-gray-500">Enable location access to see your current position</p>
        </div>
      )}
    </Card>
  )
}
