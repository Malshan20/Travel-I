import Link from "next/link"
import { Home, ArrowLeft, Compass, MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-[#355938] to-[#02531d] bg-clip-text animate-pulse">
            404
          </div>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-[#0077b6]/20 animate-float">404</div>
        </div>

        {/* Floating Icons */}
        <div className="relative mb-8">
          <div className="absolute -top-4 -left-4 animate-float-delayed">
            <Compass className="w-8 h-8 text-primary/60" />
          </div>
          <div className="absolute -top-2 -right-6 animate-float-slow">
            <MapPin className="w-6 h-6 text-primary/40" />
          </div>

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-slide-up">Oops! Page Not Found</h1>
            <p className="text-slate-300 text-lg mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Looks like you've wandered off the beaten path. The page you're looking for doesn't exist, but don't worry
              - we'll help you find your way back to your travel adventure!
            </p>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary hover:bg-[#1e6c41] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#0077b6]/25"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>

              <Link
                href="/upload"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-slate-600 hover:border-slate-500 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                Upload Photo
              </Link>
            </div>

            {/* Fun Travel Quote */}
            <div
              className="mt-12 p-6 bg-[#0077b6]/10 border border-[#0077b6]/20 rounded-xl animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-slate-300 italic">
                "Not all those who wander are lost... but this page definitely is!"
              </p>
              <p className="text-slate-400 text-sm mt-2">- Travel~I Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
