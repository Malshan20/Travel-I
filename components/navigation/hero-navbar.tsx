"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Camera, MapPin } from "lucide-react"

export function HeroNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "Features", href: "/#features" },
    { name: "Popular Destinations", href: "/#destinations" },
    { name: "FAQ", href: "/#faq" },
    { name: "Testimonials", href: "/#testimonials" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#3E5F44" }}>
              <MapPin className="w-5 h-5 text-white/70" />
            </div>
            <span className="text-xl font-bold text-gray-900">Travel~I</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-900 hover:text-[#3E5F44] transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/upload">
              <Button
                variant="outline"
                className="border-[#3E5F44] text-[#3E5F44] hover:bg-[#3E5F44] hover:text-white bg-transparent"
              >
                <Camera className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-900 hover:text-[#3E5F44]">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-[#3E5F44] hover:bg-[#2f4a35] text-white">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900">
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
                  className="block px-3 py-2 text-gray-900 hover:text-[#3E5F44] font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/upload" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-[#3E5F44] text-[#3E5F44] hover:bg-[#3E5F44] hover:text-white bg-transparent"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </Link>
                <Link href="/auth/login" className="block">
                  <Button variant="ghost" className="w-full text-gray-900 hover:text-[#3E5F44]">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up" className="block">
                  <Button className="w-full bg-[#3E5F44] hover:bg-[#2f4a35] text-gray-900">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
