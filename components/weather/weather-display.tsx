"use client"

import { useState, useEffect } from "react"
import { Cloud, Sun, CloudRain, Snowflake, MapPin } from "lucide-react"

interface WeatherData {
  location: {
    name: string
    country: string
  }
  current: {
    temp_c: number
    condition: {
      text: string
      code: number
    }
  }
}

export function WeatherDisplay() {
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

            // Fetch weather data from WeatherAPI.com
            const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)

            if (!response.ok) {
              throw new Error("Failed to fetch weather")
            }

            const data = await response.json()
            setWeather(data)
            setLoading(false)
          },
          (error) => {
            console.error("Geolocation error:", error)
            // Fallback to a default location (New York)
            fetchDefaultWeather()
          },
        )
      } catch (err) {
        console.error("Weather fetch error:", err)
        fetchDefaultWeather()
      }
    }

    const fetchDefaultWeather = async () => {
      try {
        const response = await fetch("/api/weather?city=New York")
        if (response.ok) {
          const data = await response.json()
          setWeather(data)
        } else {
          setError("Weather unavailable")
        }
      } catch (err) {
        setError("Weather unavailable")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (code: number) => {
    if (code >= 1000 && code <= 1003) return <Sun className="w-5 h-5" />
    if (code >= 1006 && code <= 1030) return <Cloud className="w-5 h-5" />
    if (code >= 1063 && code <= 1201) return <CloudRain className="w-5 h-5" />
    if (code >= 1204 && code <= 1282) return <Snowflake className="w-5 h-5" />
    return <Sun className="w-5 h-5" />
  }

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="animate-pulse flex items-center space-x-3">
          <div className="w-5 h-5 bg-white/30 rounded"></div>
          <div className="space-y-1">
            <div className="w-16 h-4 bg-white/30 rounded"></div>
            <div className="w-20 h-3 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex items-center space-x-3 text-white/70">
          <Cloud className="w-5 h-5" />
          <div className="text-sm">Weather unavailable</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className="text-primary">{getWeatherIcon(weather.current.condition.code)}</div>
        <div>
          <div className="text-black font-semibold text-lg">{Math.round(weather.current.temp_c)}°C</div>
          <div className="text-black/70 text-xs flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {weather.location.name}
          </div>
        </div>
      </div>
      <div className="text-black/60 text-xs mt-2 capitalize">{weather.current.condition.text}</div>
    </div>
  )
}
