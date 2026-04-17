import { Button } from "@/components/ui/button"
import { Brain, Camera, Map, Sparkles } from "lucide-react"
import Link from "next/link"

export function AIFeaturesSection() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-black mb-8 leading-tight">
              AI-Powered Travel Intelligence
            </h2>
            <p className="text-lg text-black/80 mb-8 leading-relaxed">
              Harness the power of artificial intelligence to transform your travel experience. From instant photo
              location detection to personalized journey recommendations, Travel~I brings the future of travel to your
              fingertips.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Photo Location Detection</h3>
                  <p className="text-black/70">
                    Upload any travel photo and instantly discover its exact location with AI precision
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Smart Travel Assistant</h3>
                  <p className="text-black/70">
                    Get personalized recommendations and travel plans powered by advanced AI
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Map className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Intelligent Route Planning</h3>
                  <p className="text-black/70">Discover optimal routes and hidden gems with AI-powered navigation</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Hotels & Directions</h3>
                  <p className="text-black/70">
                    Find nearby accommodations and get real-time directions to any destination
                  </p>
                </div>
              </div>
            </div>

            <Link href="/auth/login">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-xl font-medium">
                <Sparkles className="w-5 h-5 mr-2" />
                Experience AI Travel
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/feature.webp?height=300&width=250"
                alt="AI Travel Interface"
                className="rounded-2xl shadow-2xl"
              />
              <img
                src="/features-2.webp?height=400&width=250"
                alt="Travel AI in Action"
                className="rounded-2xl shadow-2xl mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
