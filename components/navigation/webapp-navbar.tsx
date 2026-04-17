"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MapPin, Camera, Navigation, MessageCircle, LayoutDashboard, Tickets, Sparkles } from "lucide-react"
import { LogoutButton } from "@/components/auth/logout-button"

export function WebappNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload Image", href: "/upload", icon: Camera },
    { name: "AI Itinerary", href: "/itinerary-builder", icon: Sparkles },
    { name: "Book Flights & Hotels", href: "/flights-stays", icon: Tickets },
    { name: "Directions", href: "/directions", icon: Navigation },
    { name: "AI Chat Assistant", href: "/ai-chat", icon: MessageCircle },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#3E5F44" }}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Travel~I</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-[#3E5F44] hover:bg-[#3E5F44]/5 rounded-lg transition-colors duration-200 font-medium"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LogoutButton variant="ghost" className="text-gray-700 hover:text-[#3E5F44] hover:bg-[#3E5F44]/5" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-[#3E5F44] hover:bg-[#3E5F44]/5 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <LogoutButton
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-[#3E5F44] hover:bg-[#3E5F44]/5"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
