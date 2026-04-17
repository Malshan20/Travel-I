import { Camera, MapPin, Bot, Shield, Zap, Globe } from "lucide-react"

export function WhyChooseSection() {
  const features = [
    {
      icon: Camera,
      title: "Universal Photo Upload",
      description:
        "Upload any travel photo from anywhere in the world. No account required - everyone can discover locations instantly.",
      highlight: "Free for Everyone",
    },
    {
      icon: MapPin,
      title: "AI Location Detection",
      description:
        "Our advanced AI analyzes your photos and identifies exact locations with incredible accuracy using visual landmarks.",
      highlight: "98% Accuracy",
    },
    {
      icon: Bot,
      title: "Smart Travel Assistant",
      description:
        "Get personalized travel recommendations, flight suggestions, and booking links from our AI-powered chat assistant.",
      highlight: "24/7 Available",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your photos and data are processed securely. We respect your privacy and never share your personal information.",
      highlight: "Secure & Private",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get location identification, hotel suggestions, and travel plans in seconds, not hours of manual research.",
      highlight: "Lightning Fast",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "From famous landmarks to hidden gems, our AI recognizes locations across all continents and countries.",
      highlight: "Worldwide",
    },
  ]

  return (
    <section id="why-choose" className="py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Why Choose Travel~I?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of travel planning with AI-powered location detection and personalized
            recommendations.
            <span className="block mt-3 font-semibold text-cyan-600 text-lg">
              Image upload and location detection is completely free for everyone!
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:border-cyan-200 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-100 to-emerald-100 flex items-center justify-center mb-6 group-hover:from-cyan-600 group-hover:to-emerald-600 transition-all duration-500">
                <feature.icon className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    {feature.highlight}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Discover Your Next Adventure?</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Join thousands of travelers who use Travel~I to explore the world smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/upload"
                className="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Camera className="w-5 h-5 mr-2" />
                Upload Photo Now
              </a>
              <a
                href="/auth/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white font-semibold rounded-xl transition-all duration-300"
              >
                Sign Up for Full Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
