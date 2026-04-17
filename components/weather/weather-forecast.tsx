"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets } from "lucide-react"

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
      }
    }>
  }
}

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase()
  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
    return <CloudRain className="w-5 h-5" />
  }
  if (lowerCondition.includes("snow")) {
    return <CloudSnow className="w-5 h-5" />
  }
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
    return <Cloud className="w-5 h-5" />
  }
  return <Sun className="w-5 h-5" />
}

export function WeatherForecast() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        if (!navigator.geolocation) {
          throw new Error("Geolocation not supported")
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords

            const response = await fetch(`/api/weather/forecast?lat=${latitude}&lon=${longitude}`)
            if (!response.ok) throw new Error("Weather fetch failed")

            const data = await response.json()
            setWeather(data)
            setLoading(false)
          },
          (error) => {
            console.error("Geolocation error:", error)
            // Fallback to a default location (London)
            fetchWeatherByLocation("London")
          },
        )
      } catch (error) {
        console.error("Weather error:", error)
        setError("Failed to load weather")
        setLoading(false)
      }
    }

    const fetchWeatherByLocation = async (location: string) => {
      try {
        const response = await fetch(`/api/weather/forecast?location=${location}`)
        if (!response.ok) throw new Error("Weather fetch failed")

        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (error) {
        console.error("Weather error:", error)
        setError("Failed to load weather")
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-[#0077b6]" />
            Weather Forecast
          </h3>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-[#0077b6] border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-600">Loading weather...</p>
        </div>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-[#0077b6]" />
            Weather Forecast
          </h3>
        </div>
        <div className="text-center py-8">
          <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Weather unavailable</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Cloud className="w-5 h-5 mr-2 text-[#0077b6]" />
          Weather Forecast
        </h3>
        <Button variant="outline" size="sm">
          {weather.location.name}
        </Button>
      </div>

      {/* Current Weather */}
      <div className="mb-6 p-4 bg-gradient-to-r from-[#0077b6]/10 to-[#005a8b]/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">{Math.round(weather.current.temp_c)}°C</p>
            <p className="text-sm text-gray-600">{weather.current.condition.text}</p>
          </div>
          <div className="text-[#0077b6]">{getWeatherIcon(weather.current.condition.text)}</div>
        </div>
        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center">
            <Droplets className="w-4 h-4 mr-1 text-[#0077b6]" />
            {weather.current.humidity}%
          </div>
          <div className="flex items-center">
            <Wind className="w-4 h-4 mr-1 text-[#0077b6]" />
            {Math.round(weather.current.wind_kph)} km/h
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900 mb-3">3-Day Forecast</h4>
        {weather.forecast.forecastday.slice(0, 7).map((day, index) => (
          <div key={day.date} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-[#0077b6]">{getWeatherIcon(day.day.condition.text)}</div>
              <div>
                <p className="font-medium text-sm text-gray-900">
                  {index === 0 ? "Today" : new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <p className="text-xs text-gray-600">{day.day.condition.text}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm text-gray-900">{Math.round(day.day.maxtemp_c)}°</p>
              <p className="text-xs text-gray-600">{Math.round(day.day.mintemp_c)}°</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
