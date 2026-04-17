"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@/lib/actions/auth"

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function LogoutButton({ variant = "ghost", size = "default", className }: LogoutButtonProps) {
  return (
    <form action={signOut}>
      <Button type="submit" variant={variant} size={size} className={className}>
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </form>
  )
}
