"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does the AI location detection work?",
      answer:
        "Our advanced AI analyzes visual elements in your photos including landmarks, architecture, natural features, and geographical markers. It cross-references this data with our global database to identify exact locations with 98% accuracy. The process takes just seconds and works with photos from anywhere in the world.",
    },
    {
      question: "Is the photo upload feature really free for everyone?",
      answer:
        "Yes! Anyone can upload travel photos and get location identification completely free. This core feature helps everyone discover where their photos were taken. To access premium features—including hotel booking, directions, AI chat assistant, personalized travel planning, and the ability to save your discoveries—a free account signup is required.",
    },
    {
      question: "What information do I get from uploading a photo?",
      answer:
        "You'll receive the exact location name, coordinates, nearby landmarks, and an interactive map centered on the detected location. Registered users also get hotel recommendations, directions, local attractions, weather information, and personalized travel suggestions from our AI assistant.",
    },
    {
      question: "How accurate is the location detection?",
      answer:
        "Our AI achieves 98% accuracy for recognizable locations worldwide. It works best with photos containing distinctive landmarks, architecture, or geographical features. Even for remote or lesser-known locations, our system can often identify the general area or region.",
    },
    {
      question: "Can I use Travel~I for trip planning?",
      answer:
        "Registered users can access our AI travel assistant that creates personalized itineraries, suggests flights and accommodations, recommends local attractions, and provides real-time travel advice. Simply upload photos of places you want to visit or chat with our AI about your travel preferences.",
    },
    {
    question: "Can I book hotels or flights via Travel~I?",
    answer:
      "Yes, you can book both hotels and flights directly through Travel~I. We partner with trusted platforms like Trip.com and Booking.com to provide you with seamless booking experiences for your travels.",
    },
    {
      question: "Is my photo data secure and private?",
      answer:
        "Yes, we take privacy seriously. Photos are processed securely and are not stored permanently unless you choose to save them to your account. We never share your personal information or photos with third parties. You can delete your data at any time from your account settings.",
    },
    {
      question: "What countries and regions are supported?",
      answer:
        "Travel~I works globally! Our AI recognizes locations across all continents, from famous landmarks in major cities to remote natural wonders. We continuously expand our database to include more locations and improve accuracy for underrepresented regions.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about Travel~I and how it works</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#3E5F44]/20 focus:ring-inset"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#3E5F44]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#3E5F44]/10 to-[#8fbc8f]/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Our support team is here to help you make the most of Travel~I</p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#3E5F44] hover:bg-[#2f4a35] text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
