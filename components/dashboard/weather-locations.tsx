"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Thermometer, Droplets, Wind, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

interface UserStatsProps {
  userStats: any
}

interface WeatherData {
  location: {
    name: string
    country: string
  }
  current: {
    temp_c: number
    condition: {
      text: string
      icon: string
    }
    humidity: number
    wind_kph: number
    vis_km: number
  }
  forecast: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        mintemp_c: number
        condition: {
          text: string
          icon: string
        }
        daily_chance_of_rain: number
        daily_chance_of_snow: number
      }
    }>
  }
}

export function WeatherLocation() {
  const [searchLocation, setSearchLocation] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLocationSearch = async () => {
    if (!searchLocation.trim()) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/weather/forecast?location=${encodeURIComponent(searchLocation)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data")
      }

      setWeatherData(data)
    } catch (error: any) {
      setError(error.message)
      setWeatherData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getTravelRisk = (weather: WeatherData) => {
    const current = weather.current
    const forecast = weather.forecast.forecastday[0]?.day

    let riskLevel = "low"
    const riskFactors = []

    // Temperature risks
    if (current.temp_c < -10 || current.temp_c > 40) {
      riskLevel = "high"
      riskFactors.push("Extreme temperatures")
    }

    // Visibility risks
    if (current.vis_km < 5) {
      riskLevel = riskLevel === "high" ? "high" : "medium"
      riskFactors.push("Poor visibility")
    }

    // Wind risks
    if (current.wind_kph > 50) {
      riskLevel = "high"
      riskFactors.push("Strong winds")
    }

    // Precipitation risks
    if (forecast?.daily_chance_of_rain > 80 || forecast?.daily_chance_of_snow > 50) {
      riskLevel = riskLevel === "high" ? "high" : "medium"
      riskFactors.push("High chance of precipitation")
    }

    return { riskLevel, riskFactors }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-[#0077b6]" />
        Weather Forecast & Travel Risk
      </h2>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search any location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleLocationSearch()}
          className="flex-1"
        />
        <Button
          onClick={handleLocationSearch}
          disabled={isLoading}
          className="bg-[#0077b6] hover:bg-[#005a8b] text-white"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0077b6] mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {weatherData && (
        <div className="space-y-6">
          {/* Current Weather */}
          <div className="bg-gradient-to-r from-[#0077b6]/10 to-[#0077b6]/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {weatherData.location.name}, {weatherData.location.country}
                </h3>
                <p className="text-gray-600">{weatherData.current.condition.text}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#0077b6]">{Math.round(weatherData.current.temp_c)}°C</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Droplets className="w-4 h-4 text-[#0077b6] mr-1" />
                <span>{weatherData.current.humidity}% Humidity</span>
              </div>
              <div className="flex items-center">
                <Wind className="w-4 h-4 text-[#0077b6] mr-1" />
                <span>{Math.round(weatherData.current.wind_kph)} km/h</span>
              </div>
              <div className="flex items-center">
                <Thermometer className="w-4 h-4 text-[#0077b6] mr-1" />
                <span>{weatherData.current.vis_km} km visibility</span>
              </div>
            </div>
          </div>

          {/* Travel Risk Assessment */}
          {(() => {
            const { riskLevel, riskFactors } = getTravelRisk(weatherData)
            return (
              <div
                className={`rounded-lg p-4 ${
                  riskLevel === "high"
                    ? "bg-red-50 border border-red-200"
                    : riskLevel === "medium"
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-green-50 border border-green-200"
                }`}
              >
                <div className="flex items-center mb-2">
                  {riskLevel === "high" ? (
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  ) : riskLevel === "medium" ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  )}
                  <h4
                    className={`font-semibold ${
                      riskLevel === "high"
                        ? "text-red-800"
                        : riskLevel === "medium"
                          ? "text-yellow-800"
                          : "text-green-800"
                    }`}
                  >
                    Travel Risk: {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                  </h4>
                </div>
                {riskFactors.length > 0 ? (
                  <ul
                    className={`text-sm ${
                      riskLevel === "high"
                        ? "text-red-700"
                        : riskLevel === "medium"
                          ? "text-yellow-700"
                          : "text-green-700"
                    }`}
                  >
                    {riskFactors.map((factor, index) => (
                      <li key={index}>• {factor}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-700 text-sm">Conditions are favorable for travel</p>
                )}
              </div>
            )
          })()}

          {/* 3-Day Forecast */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">3-Day Forecast</h4>
            <div className="grid grid-cols-3 gap-3">
              {weatherData.forecast.forecastday.slice(0, 3).map((day, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    {index === 0 ? "Today" : new Date(day.date).toLocaleDateString("en", { weekday: "short" })}
                  </div>
                  <img
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    className="w-8 h-8 mx-auto mb-1"
                  />
                  <div className="text-sm font-semibold">
                    {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{day.day.daily_chance_of_rain}% rain</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!weatherData && !isLoading && !error && (
        <div className="text-center py-8 text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Search for any location to view weather forecast and travel risk assessment</p>
        </div>
      )}
    </Card>
  )
}
