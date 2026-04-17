"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, Clock, Trash2 } from "lucide-react"

interface ChatSession {
  id: string
  title: string
  updated_at: string
  message_count: number
}

interface ChatHistoryProps {
  userId: string
  onSessionSelect: (sessionId: string) => void
  currentSessionId?: string
}

export function ChatHistory({ userId, onSessionSelect, currentSessionId }: ChatHistoryProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadChatHistory()
  }, [userId])

  const loadChatHistory = async () => {
    try {
      const response = await fetch(`/api/chat/history?userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error("Failed to load chat history:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSession = async (sessionId: string) => {
    try {
      const response = await fetch("/api/chat/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, userId }),
      })

      if (response.ok) {
        setSessions((prev) => prev.filter((session) => session.id !== sessionId))
      }
    } catch (error) {
      console.error("Failed to delete session:", error)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <MessageCircle className="w-4 h-4 mr-2" />
        Chat History
      </h3>

      {sessions.length === 0 ? (
        <p className="text-gray-600 text-sm">No previous conversations</p>
      ) : (
        <div className="space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                currentSessionId === session.id
                  ? "bg-[#3E5F44]/10 border-[#3E5F44]"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => onSessionSelect(session.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{session.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{new Date(session.updated_at).toLocaleDateString()}</span>
                    <span className="ml-2">{session.message_count} messages</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteSession(session.id)
                  }}
                  className="text-gray-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
