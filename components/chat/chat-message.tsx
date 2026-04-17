import { Card } from "@/components/ui/card"
import { Bot, User, MapPin, Plane, Hotel, Calendar } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  // Enhanced message rendering with travel-specific formatting
  const renderContent = (content: string) => {
    // Check for travel-related keywords and add icons
    const lines = content.split("\n")
    return lines.map((line, index) => {
      let icon = null
      if (line.toLowerCase().includes("flight") || line.toLowerCase().includes("airline")) {
        icon = <Plane className="w-4 h-4 text-[#3E5F44] inline mr-2" />
      } else if (line.toLowerCase().includes("hotel") || line.toLowerCase().includes("accommodation")) {
        icon = <Hotel className="w-4 h-4 text-[#3E5F44] inline mr-2" />
      } else if (line.toLowerCase().includes("destination") || line.toLowerCase().includes("location")) {
        icon = <MapPin className="w-4 h-4 text-[#3E5F44] inline mr-2" />
      } else if (line.toLowerCase().includes("date") || line.toLowerCase().includes("schedule")) {
        icon = <Calendar className="w-4 h-4 text-[#3E5F44] inline mr-2" />
      }

      return (
        <div key={index} className={index > 0 ? "mt-2" : ""}>
          {icon}
          {line}
        </div>
      )
    })
  }

  return (
    <div className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-gray-600" : "bg-[#3E5F44]"
        }`}
      >
        {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
      </div>

      {/* Message */}
      <Card
        className={`p-4 max-w-2xl ${
          isUser
            ? "bg-[#3E5F44] text-white border-[#3E5F44]"
            : "bg-white border-gray-200 hover:shadow-md transition-shadow"
        }`}
      >
        <div className={`text-sm leading-relaxed ${isUser ? "text-white" : "text-gray-900"}`}>
          {isUser ? message.content : renderContent(message.content)}
        </div>
        <div className={`text-xs mt-2 ${isUser ? "text-green-100" : "text-gray-500"}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </Card>
    </div>
  )
}
