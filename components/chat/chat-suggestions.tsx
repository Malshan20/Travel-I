"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Plane, Hotel, Calendar, Compass, Star } from "lucide-react"

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const suggestions = [
    {
      icon: MapPin,
      text: "Plan a 7-day trip to Japan",
      category: "Trip Planning",
    },
    {
      icon: Plane,
      text: "Find flights from New York to Paris",
      category: "Flights",
    },
    {
      icon: Hotel,
      text: "Recommend hotels in Rome under $200/night",
      category: "Hotels",
    },
    {
      icon: Calendar,
      text: "Best time to visit Thailand",
      category: "Travel Tips",
    },
    {
      icon: Compass,
      text: "Hidden gems in Southeast Asia",
      category: "Destinations",
    },
    {
      icon: Star,
      text: "Create a romantic getaway itinerary",
      category: "Special Trips",
    },
  ]

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Try asking about:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onSuggestionClick(suggestion.text)}
            className="h-auto p-4 text-left border-gray-200 hover:border-[#3E5F44] hover:bg-[#3E5F44]/5 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <suggestion.icon className="w-5 h-5 text-[#3E5F44] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm">{suggestion.text}</div>
                <div className="text-xs text-gray-500 mt-1">{suggestion.category}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
