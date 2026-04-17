"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, Camera, MessageCircle, Hotel, Navigation } from "lucide-react"

interface WelcomeTourProps {
  onComplete: () => void
}

export function WelcomeTour({ onComplete }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Travel~I!",
      description: "Your AI-powered travel companion is ready to help you explore the world.",
      icon: "🌍",
    },
    {
      title: "Upload Photos",
      description: "Upload any travel photo and our AI will instantly identify the location for you.",
      icon: Camera,
    },
    {
      title: "AI Assistant",
      description: "Chat with our AI to get personalized travel recommendations and trip planning.",
      icon: MessageCircle,
    },
    {
      title: "Find Hotels",
      description: "Search and book accommodations anywhere in the world with our hotel finder.",
      icon: Hotel,
    },
    {
      title: "Get Directions",
      description: "Plan routes and get turn-by-turn directions to your dream destinations.",
      icon: Navigation,
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const step = steps[currentStep]
  const IconComponent = typeof step.icon === "string" ? null : step.icon

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full p-6 relative bg-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={onComplete}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-[#3E5F44]/10 rounded-full flex items-center justify-center">
            {IconComponent ? (
              <IconComponent className="w-8 h-8 text-[#3E5F44]" />
            ) : (
              <span className="text-2xl">{step.icon}</span>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>

          <div className="flex items-center justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? "bg-[#3E5F44]" : "bg-gray-300"
                } transition-colors`}
              />
            ))}
          </div>

          <Button onClick={nextStep} className="w-full bg-[#3E5F44] hover:bg-[#2f4a35] text-white">
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
