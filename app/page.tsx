import { HeroSection } from "@/components/landing/hero-section"
import { AIFeaturesSection } from "@/components/landing/ai-features-section"
import { PhotoGallerySection } from "@/components/landing/photo-gallery-section"
import { MidnightSunSection } from "@/components/landing/midnight-sun-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FAQSection } from "@/components/landing/faq-section"
import { ContactSection } from "@/components/landing/contact-section"
import { Footer } from "@/components/navigation/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <AIFeaturesSection />
        <PhotoGallerySection />
        <MidnightSunSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
