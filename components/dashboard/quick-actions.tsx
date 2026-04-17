import { Card } from "@/components/ui/card"
import { Camera, MessageCircle, Hotel, Navigation, Sparkles, Plane } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Upload Image",
      description: "Identify locations from your travel photos",
      icon: Camera,
      href: "/upload",
      color: "bg-[#0077b6]",
      bgColor: "bg-[#0077b6]/10",
    },
    {
      title: "AI Itinerary",
      description: "Generate personalized travel plans with AI",
      icon: Sparkles,
      href: "/itinerary-builder",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Flights & Stays",
      description: "Search and book flights and hotels",
      icon: Plane,
      href: "/flights-stays",
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      title: "AI Assistant",
      description: "Get personalized travel recommendations",
      icon: MessageCircle,
      href: "/ai-chat",
      color: "bg-teal-500",
      bgColor: "bg-teal-50",
    },
    {
      title: "Find Hotels",
      description: "Discover and book accommodations",
      icon: Hotel,
      href: "/hotels",
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Get Directions",
      description: "Plan routes to your destinations",
      icon: Navigation,
      href: "/directions",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-[#3E5F44]" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <div
              className={`${action.bgColor} rounded-xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`${action.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
