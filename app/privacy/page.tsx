import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy - Travel~I",
  description: "Privacy Policy for Travel~I AI-powered travel assistant platform.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className=" backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-12 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0077b6]/20 rounded-full mb-6">
              <Shield className="w-8 h-8 text-[#0077b6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Privacy Policy</h1>
            <p className="text-primary/80 text-lg">Last updated: September 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="space-y-8">
              {/* Section 1 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">Information We Collect</h2>
                </div>
                <p className="text-black leading-relaxed mb-4">
                  Travel~I respects your privacy. We do not collect or store the images you upload for AI analysis. 
                  We only collect the personal information you provide when creating an account or contacting us:
                </p>
                <ul className="list-disc list-inside text-black space-y-2 ml-4">
                  <li>Name</li>
                  <li>Email</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">Data Security</h2>
                </div>
                <p className="text-black leading-relaxed">
                  We implement strong technical and organizational measures to protect your personal information. 
                  Your name and email are encrypted and stored securely.
                </p>
              </section>

              {/* Section 3 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">Information Sharing</h2>
                </div>
                <p className="text-black leading-relaxed mb-4">
                  We do not sell or trade your personal information. Information may only be shared:
                </p>
                <ul className="list-disc list-inside text-black space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>With trusted service providers who assist in our operations</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
                <p className="text-black leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-black space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data</li>
                  <li>Opt-out of communications</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <h2 className="text-2xl font-semibold text-primary mb-4">AI and Machine Learning</h2>
                <p className="text-black leading-relaxed">
                  Travel~I uses AI to analyze uploaded images. We implement face detection to ensure only faceless images are processed, 
                  protecting user privacy. No personal images or data are used for training AI models without explicit consent.
                </p>
              </section>

              {/* Contact */}
              <section className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <div className="bg-[#0077b6]/10 border border-[#0077b6]/20 rounded-xl p-6 mt-12">
                  <h3 className="text-xl font-semibold text-primary mb-3">Contact Us</h3>
                  <p className="text-black">
                    If you have any questions about this Privacy Policy, please contact us at{" "}
                    <a
                      href="mailto:info@travel-i.app"
                      className="text-black hover:text-grey/50 transition-colors"
                    >
                      info@travel-i.app
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
