import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileText, Shield, Users, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - Travel~I",
  description: "Terms of Service for Travel~I AI-powered travel assistant platform.",
}

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Terms of Service</h1>
            <p className="text-primary/80 text-lg">Last updated: September 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="space-y-8">
              {/* Section 1 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">1. Acceptance of Terms</h2>
                </div>
                <p className="text-black leading-relaxed">
                  By accessing and using Travel~I, you accept and agree to be bound by these terms. 
                  If you do not agree, please do not use the platform.
                </p>
              </section>

              {/* Section 2 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">2. Use License</h2>
                </div>
                <p className="text-black leading-relaxed mb-4">
                  Users are granted a limited license to use Travel~I for personal, non-commercial purposes.
                  You may not:
                </p>
                <ul className="list-disc list-inside text-black space-y-2 ml-4">
                  <li>Modify or copy any part of the platform</li>
                  <li>Use the platform for commercial purposes or public display</li>
                  <li>Attempt to reverse-engineer our software</li>
                  <li>Remove any proprietary notices</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">3. AI Services Disclaimer</h2>
                </div>
                <p className="text-black leading-relaxed">
                  Travel~I uses AI to detect locations from uploaded images. All uploads are faceless by design, 
                  reducing privacy risks. However, there is still a residual ~1% risk that a location could be inferred 
                  in rare cases. Users should exercise caution and avoid uploading sensitive content.
                </p>
              </section>

              {/* Section 4 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-2xl font-semibold text-primary mb-4">4. User Data and Privacy</h2>
                <p className="text-black leading-relaxed">
                  We only collect the personal information you voluntarily provide (name and email). 
                  No uploaded images or other data are stored. For more details, please review our Privacy Policy.
                </p>
              </section>

              {/* Section 5 */}
              <section className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Limitations</h2>
                <p className="text-black leading-relaxed">
                  Travel~I and its suppliers are not liable for damages arising from the use or inability to use the platform, 
                  including data loss or inaccuracies, even if notified of potential risks.
                </p>
              </section>

              {/* Contact */}
              <section className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <div className="bg-[#0077b6]/10 border border-[#0077b6]/20 rounded-xl p-6 mt-12">
                  <h3 className="text-xl font-semibold text-primary mb-3">Questions?</h3>
                  <p className="text-black">
                    If you have any questions about these Terms of Service, please contact us at{" "}
                    <a
                      href="mailto:legal@travel-i.app"
                      className="text-primary hover:text-black transition-colors"
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
