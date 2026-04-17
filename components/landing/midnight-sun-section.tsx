import { Button } from "@/components/ui/button"
import { Sunrise, Navigation, Globe } from "lucide-react"
import Link from "next/link"

export function MidnightSunSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `url('/midnight.webp?height=800&width=1600')`,
        }}
      />
      <div className="absolute inset-0 " />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="lg:order-2">
            <h2 className="font-serif text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
              24/7 AI Travel Intelligence
            </h2>
            <p className="text-lg text-gray-900/80 mb-8 leading-relaxed">
              Like the midnight sun that never sets, our AI travel intelligence works around the clock to provide you
              with instant insights, real-time recommendations, and seamless travel experiences no matter where your
              journey takes you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sunrise className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Always Active</h3>
                <p className="text-sm text-gray-900/70">24/7 AI assistance</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Navigation className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Real-time Guidance</h3>
                <p className="text-sm text-gray-900/70">Instant navigation</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Global Coverage</h3>
                <p className="text-sm text-gray-900/70">Worldwide intelligence</p>
              </div>
            </div>

            <Link href="/auth/login">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-xl font-medium">
                Start Your Journey
              </Button>
            </Link>
          </div>

          <div className="lg:order-1">
            <img
              src="/midnight.webp?height=600&width=500"
              alt="AI Travel Intelligence"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
