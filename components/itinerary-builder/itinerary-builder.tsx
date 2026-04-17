"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Clock, Sparkles, Download, Share2, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DayItinerary {
  day: number
  date: string
  activities: Activity[]
  meals: Meal[]
  accommodation: Accommodation
  dailyBudget: number
  timeAllocation: string
}

interface Activity {
  time: string
  name: string
  description: string
  duration: string
  cost: number
  category: string
  priority: "must-see" | "recommended" | "optional"
}

interface Meal {
  type: "breakfast" | "lunch" | "dinner"
  suggestion: string
  estimatedCost: number
  location: string
}

interface Accommodation {
  name: string
  type: string
  costPerNight: number
  location: string
}

interface ItineraryResult {
  destination: string
  duration: number
  totalBudget: number
  budgetBreakdown: {
    accommodation: number
    food: number
    activities: number
    transportation: number
    miscellaneous: number
  }
  days: DayItinerary[]
  tips: string[]
  alternatives: (string | { alternative?: string; description?: string })[]
}

export function ItineraryBuilder() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null)

  // Form state
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState(3)
  const [budget, setBudget] = useState(1000)
  const [travelStyle, setTravelStyle] = useState("balanced")
  const [interests, setInterests] = useState("")
  const [startDate, setStartDate] = useState("")

  const handleGenerateItinerary = async () => {
    if (!destination || !startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in destination and start date",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          duration,
          budget,
          travelStyle,
          interests,
          startDate,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate itinerary")

      const data = await response.json()
      setItinerary(data.itinerary)

      toast({
        title: "Itinerary Generated!",
        description: "Your personalized travel plan is ready",
      })
    } catch (error) {
      console.error("Itinerary generation error:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!itinerary) return

    const content = generateItineraryText(itinerary)
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${itinerary.destination}-itinerary.txt`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Your itinerary has been downloaded",
    })
  }

  const generateItineraryText = (itinerary: ItineraryResult): string => {
    let text = `${itinerary.destination} Travel Itinerary\n`
    text += `Duration: ${itinerary.duration} days\n`
    text += `Total Budget: $${itinerary.totalBudget}\n\n`

    text += "Budget Breakdown:\n"
    text += `- Accommodation: $${itinerary.budgetBreakdown.accommodation}\n`
    text += `- Food: $${itinerary.budgetBreakdown.food}\n`
    text += `- Activities: $${itinerary.budgetBreakdown.activities}\n`
    text += `- Transportation: $${itinerary.budgetBreakdown.transportation}\n`
    text += `- Miscellaneous: $${itinerary.budgetBreakdown.miscellaneous}\n\n`

    itinerary.days.forEach((day) => {
      text += `\nDay ${day.day} - ${day.date}\n`
      text += `Daily Budget: $${day.dailyBudget}\n\n`

      text += "Activities:\n"
      day.activities.forEach((activity) => {
        text += `${activity.time} - ${activity.name} (${activity.duration})\n`
        text += `  ${activity.description}\n`
        text += `  Cost: $${activity.cost} | ${activity.priority}\n\n`
      })

      text += "Meals:\n"
      day.meals.forEach((meal) => {
        text += `${meal.type}: ${meal.suggestion} at ${meal.location} (~$${meal.estimatedCost})\n`
      })

      text += `\nAccommodation: ${day.accommodation.name} ($${day.accommodation.costPerNight}/night)\n`
      text += "---\n"
    })

    text += "\nTravel Tips:\n"
    itinerary.tips.forEach((tip, i) => {
      text += `${i + 1}. ${tip}\n`
    })

    return text
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Itinerary Builder</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create personalized travel plans with perfect budget and time balance using advanced AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#0077b6]" />
                Trip Details
              </h2>

              <div className="space-y-6">
                {/* Destination */}
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, France"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                {/* Duration */}
                <div>
                  <Label htmlFor="duration">Duration: {duration} days</Label>
                  <Slider
                    id="duration"
                    min={1}
                    max={30}
                    step={1}
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    className="mt-3"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 day</span>
                    <span>30 days</span>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <Label htmlFor="budget">Budget: ${budget}</Label>
                  <Slider
                    id="budget"
                    min={100}
                    max={10000}
                    step={100}
                    value={[budget]}
                    onValueChange={(value) => setBudget(value[0])}
                    className="mt-3"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$100</span>
                    <span>$10,000</span>
                  </div>
                </div>

                {/* Travel Style */}
                <div>
                  <Label htmlFor="travelStyle">Travel Style</Label>
                  <Select value={travelStyle} onValueChange={setTravelStyle}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget Traveler</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="comfort">Comfort</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interests */}
                <div>
                  <Label htmlFor="interests">Interests & Preferences</Label>
                  <Textarea
                    id="interests"
                    placeholder="e.g., museums, food tours, hiking, photography, nightlife..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateItinerary}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#005f8f] hover:to-[#0096b8]"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Itinerary
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {!itinerary && !isGenerating && (
              <Card className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <MapPin className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Plan Your Trip?</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Fill in your trip details and let our AI create a perfectly balanced itinerary for you
                </p>
              </Card>
            )}

            {isGenerating && (
              <Card className="p-12 text-center">
                <Loader2 className="w-12 h-12 text-[#0077b6] animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Perfect Itinerary</h3>
                <p className="text-gray-600">Analyzing destinations and optimizing your travel plan...</p>
              </Card>
            )}

            {itinerary && (
              <div className="space-y-6">
                {/* Header Actions */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{itinerary.destination}</h2>
                      <p className="text-gray-600">
                        {itinerary.duration} days • ${itinerary.totalBudget} total budget
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Budget Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Accommodation</p>
                      <p className="text-lg font-semibold text-[#0077b6]">${itinerary.budgetBreakdown.accommodation}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Food</p>
                      <p className="text-lg font-semibold text-[#0077b6]">${itinerary.budgetBreakdown.food}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Activities</p>
                      <p className="text-lg font-semibold text-[#0077b6]">${itinerary.budgetBreakdown.activities}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Transport</p>
                      <p className="text-lg font-semibold text-[#0077b6]">
                        ${itinerary.budgetBreakdown.transportation}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Misc</p>
                      <p className="text-lg font-semibold text-[#0077b6]">${itinerary.budgetBreakdown.miscellaneous}</p>
                    </div>
                  </div>
                </Card>

                {/* Daily Itinerary */}
                {itinerary.days.map((day) => (
                  <Card key={day.day} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Day {day.day}</h3>
                        <p className="text-sm text-gray-600">{day.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Daily Budget</p>
                        <p className="text-lg font-semibold text-[#0077b6]">${day.dailyBudget}</p>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-[#0077b6]" />
                        Activities
                      </h4>
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                              <span className="text-sm font-semibold text-[#0077b6]">{activity.time}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h5 className="font-semibold text-gray-900">{activity.name}</h5>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  activity.priority === "must-see"
                                    ? "bg-red-100 text-red-700"
                                    : activity.priority === "recommended"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {activity.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>⏱️ {activity.duration}</span>
                              <span>💰 ${activity.cost}</span>
                              <span>🏷️ {activity.category}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Meals */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Meals</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {day.meals.map((meal, idx) => (
                          <div key={idx} className="p-3 bg-orange-50 rounded-lg">
                            <p className="text-xs font-semibold text-orange-700 uppercase mb-1">{meal.type}</p>
                            <p className="text-sm font-medium text-gray-900 mb-1">{meal.suggestion}</p>
                            <p className="text-xs text-gray-600">📍 {meal.location}</p>
                            <p className="text-xs text-gray-600">~${meal.estimatedCost}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accommodation */}
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Accommodation</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{day.accommodation.name}</p>
                          <p className="text-sm text-gray-600">
                            {day.accommodation.type} • {day.accommodation.location}
                          </p>
                        </div>
                        <p className="text-lg font-semibold text-[#0077b6]">${day.accommodation.costPerNight}/night</p>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Tips & Alternatives */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                      Travel Tips
                    </h3>
                    <ul className="space-y-2">
                      {itinerary.tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex">
                          <span className="mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                      Alternative Options
                    </h3>
                    <ul className="space-y-2">
                      {itinerary.alternatives.map((alt, idx) => {
                        const altText =
                          typeof alt === "string" ? alt : alt.alternative || alt.description || "Alternative option"
                        return (
                          <li key={idx} className="text-sm text-gray-700 flex">
                            <span className="mr-2">•</span>
                            <span>{altText}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
