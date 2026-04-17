"use client"

import { useState } from "react"
import { MapPin, Star, Users } from "lucide-react"

export function PopularDestinations() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const destinations = [
    {
      name: "Paris, France",
      image: "/placeholder.svg?height=400&width=600",
      description: "The City of Light with iconic landmarks",
      rating: 4.9,
      visitors: "2.1M",
      highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"],
    },
    {
      name: "Tokyo, Japan",
      image: "/placeholder.svg?height=400&width=600",
      description: "Modern metropolis meets ancient tradition",
      rating: 4.8,
      visitors: "1.8M",
      highlights: ["Shibuya Crossing", "Mount Fuji", "Cherry Blossoms"],
    },
    {
      name: "Santorini, Greece",
      image: "/placeholder.svg?height=400&width=600",
      description: "Stunning sunsets and white-washed buildings",
      rating: 4.9,
      visitors: "890K",
      highlights: ["Blue Domes", "Sunset Views", "Volcanic Beaches"],
    },
    {
      name: "Machu Picchu, Peru",
      image: "/placeholder.svg?height=400&width=600",
      description: "Ancient Incan citadel in the clouds",
      rating: 4.7,
      visitors: "650K",
      highlights: ["Ancient Ruins", "Mountain Views", "Hiking Trails"],
    },
    {
      name: "Bali, Indonesia",
      image: "/placeholder.svg?height=400&width=600",
      description: "Tropical paradise with rich culture",
      rating: 4.8,
      visitors: "1.2M",
      highlights: ["Rice Terraces", "Temples", "Beaches"],
    },
    {
      name: "New York City, USA",
      image: "/placeholder.svg?height=400&width=600",
      description: "The city that never sleeps",
      rating: 4.6,
      visitors: "3.2M",
      highlights: ["Times Square", "Central Park", "Statue of Liberty"],
    },
  ]

  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Popular Destinations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the world's most beloved travel destinations. Upload a photo from any of these places and watch our
            AI work its magic!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-cyan-600/40 to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="space-y-3">
                  {/* Location and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{destination.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{destination.visitors}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-200 text-sm">{destination.description}</p>

                  {/* Highlights */}
                  <div
                    className={`transition-all duration-300 ${
                      hoveredIndex === index ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="flex flex-wrap gap-2 pt-2">
                      {destination.highlights.map((highlight, highlightIndex) => (
                        <span
                          key={highlightIndex}
                          className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute top-4 right-4 transition-all duration-300 ${
                  hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-semibold text-cyan-600 shadow-lg">
                  Upload photo to identify!
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-gray-600 mb-8 text-lg">
            Don't see your destination? Our AI recognizes locations worldwide!
          </p>
          <a
            href="/upload"
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Upload Any Travel Photo
          </a>
        </div>
      </div>
    </section>
  )
}
