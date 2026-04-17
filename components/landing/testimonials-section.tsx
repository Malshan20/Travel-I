"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      avatar: "/sarah.jpg?height=80&width=80",
      rating: 5,
      text: "Travel~I identified my vacation photo from Santorini instantly! The AI found the exact location and suggested amazing hotels nearby. This app is a game-changer for travel planning.",
      trip: "Greece Adventure",
    },
    {
      name: "Marco Rodriguez",
      location: "Barcelona, Spain",
      avatar: "/marco.jpg?height=80&width=80",
      rating: 5,
      text: "I uploaded a random photo from my Tokyo trip, and Travel~I not only identified the district but also gave me a complete travel itinerary. The AI chat assistant is incredibly helpful!",
      trip: "Japan Discovery",
    },
    {
      name: "Emma Chen",
      location: "Toronto, Canada",
      avatar: "/emma.jpg?height=80&width=80",
      rating: 5,
      text: "As a travel blogger, I use Travel~I to verify locations and find hidden gems. The accuracy is amazing, and the hotel recommendations have saved me hours of research.",
      trip: "Southeast Asia Tour",
    },
    {
      name: "David Thompson",
      location: "London, UK",
      avatar: "/david.jpg?height=80&width=80",
      rating: 5,
      text: "The free photo upload feature is fantastic! I can identify any location without signing up. When I did create an account, the full features blew me away.",
      trip: "European Backpacking",
    },
    {
      name: "Julia Smith",
      location: "Paris, France",
      avatar: "/julia.jpg?height=80&width=80",
      rating: 5,
      text: "Travel~I helped me plan my entire honeymoon. From identifying romantic spots in Paris to booking the perfect hotels, everything was seamless and personalized.",
      trip: "Paris Honeymoon",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">What Travelers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied travelers who've discovered the world with Travel~I
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 relative overflow-hidden border border-gray-100">
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-20 h-20 text-primary" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center justify-center mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-10 font-medium">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="flex items-center justify-center space-x-6">
                <img
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-cyan-100 shadow-lg"
                />
                <div className="text-center">
                  <div className="font-bold text-gray-900 text-xl">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-600 text-lg">{testimonials[currentIndex].location}</div>
                  <div className="text-sm text-gray-900 font-semibold mt-1">{testimonials[currentIndex].trip}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-10">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="w-14 h-14 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="w-14 h-14 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: "50K+", label: "Happy Travelers" },
            { number: "200+", label: "Countries Covered" },
            { number: "98%", label: "Accuracy Rate" },
            { number: "4.9/5", label: "Average Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-3">{stat.number}</div>
              <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
