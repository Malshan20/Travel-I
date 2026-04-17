import Link from "next/link"
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#3E5F44] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Travel~I</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              AI-powered travel discovery that helps you identify locations, find hotels, and plan amazing trips from
              any photo.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-[#8fbc8f] transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a> */}
              <a href="https://x.com/Travel_Iapp" className="text-gray-400 hover:text-[#8fbc8f] transition-colors duration-200" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/travel_i.app" className="text-gray-400 hover:text-[#8fbc8f] transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-[#8fbc8f] transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a> */}
              <a href="https://www.tiktok.com/@travel_i.app" className="text-gray-400 hover:text-[#8fbc8f] transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
            {/* Available on Google Play Store Badge */}
            <div className="mt-6">
              <span className="block text-gray-400 text-sm mb-2">Available on:</span>
              <a
                href="https://play.google.com/store/apps/details?id=com.maxmalshan.traveli" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
                  style={{ maxWidth: 180 }}
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Upload Photo
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Testimonials
                </Link>
              </li>
              
              <li>
                <Link href="/#destinations" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Popular Destinations
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">AI Location Detection</span>
              </li>
              <li>
                <span className="text-gray-400">Hotel Finder</span>
              </li>
              <li>
                <span className="text-gray-400">Travel Directions</span>
              </li>
              <li>
                <span className="text-gray-400">AI Chat Assistant</span>
              </li>
              <li>
                <span className="text-gray-400">Trip Planning</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#8fbc8f]" />
                <span className="text-gray-400">support@travel-i.app</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#8fbc8f]" />
                <span className="text-gray-400">+94 71 777 6088</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#8fbc8f] mt-0.5" />
                <span className="text-gray-400">
                  Kurunegala,
                  <br />
                  Sri Lanka
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© {currentYear} Travel~I. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
