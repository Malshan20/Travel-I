import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Upload, Sparkles } from "lucide-react"
import { HeroNavbar } from "../navigation/hero-navbar"
import { WeatherDisplay } from "../weather/weather-display"

export function HeroSection() {
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero.webp')`,
        }}
      />
      <div className="absolute inset-0 " />

      {/* Weather Display */}
      <div className="absolute top-20 right-4 z-30 md:top-24 md:right-6 ">
        <WeatherDisplay />
      </div>

      {/* Navigation Bar */}
      <HeroNavbar />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black mb-6 md:mb-8 leading-tight">
              AI Travel Intelligence
            </h1>
            <p className="text-lg md:text-xl text-black/80 mb-8 md:mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Discover any location from travel photos using advanced AI. Upload images, get instant location detection,
              and unlock personalized travel experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/upload">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <Upload className="w-5 h-5 mr-3" />
                  Upload Your Travel Photo
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/ai-chat">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-900/30 text-gray-900 hover:bg-gray-900/10 px-8 py-4 text-lg rounded-xl w-full sm:w-auto bg-transparent"
                >
                  <Camera className="w-5 h-5 mr-3" />
                  Try AI Assistant
                </Button>
              </Link>
            </div>

            <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
              <div className="text-gray-900/70">
                <div className="text-2xl font-bold text-accent mb-1">AI Powered</div>
                <div className="text-sm">Advanced Recognition</div>
              </div>
              <div className="text-gray-900/70">
                <div className="text-2xl font-bold text-accent mb-1">Instant</div>
                <div className="text-sm">Location Detection</div>
              </div>
              <div className="text-gray-900/70">
                <div className="text-2xl font-bold text-accent mb-1">Free</div>
                <div className="text-sm">Photo Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
