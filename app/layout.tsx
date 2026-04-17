import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import Script from "next/script"


const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})



export const metadata: Metadata = {
  title: {
    default: "Travel~I - AI-Powered Travel Assistant | Photo Location Detection & Travel Planning",
    template: "%s | Travel~I - AI Travel Assistant",
  },
  icons: {
    icon: "/logo/logo.png",
  },
  description:
    "Discover any location from travel photos using AI. Upload images, get instant location detection, find nearby hotels, plan routes, and chat with our intelligent travel assistant. Free photo analysis for everyone.",
  keywords: [
    "AI travel assistant",
    "photo location detection",
    "travel planning",
    "hotel finder",
    "route planner",
    "travel AI",
    "location identification",
    "travel photos",
    "destination discovery",
    "travel technology",
    "smart travel",
    "AI travel planner",
    "travel companion",
    "vacation planning",
    "trip organizer",
    "travel guide AI",
  ],
  authors: [{ name: "Travel~I Team" }],
  creator: "Travel~I",
  publisher: "Travel~I",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://travel-i.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Travel~I - AI-Powered Travel Assistant | Photo Location Detection",
    description:
      "Upload travel photos and instantly discover locations with AI. Find hotels, plan routes, and get personalized travel recommendations. Free photo analysis for everyone.",
    siteName: "Travel~I",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Travel~I - AI-Powered Travel Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel~I - AI-Powered Travel Assistant",
    description:
      "Upload travel photos and instantly discover locations with AI. Free photo analysis and smart travel planning.",
    images: ["/twitter-image.jpg"],
    creator: "@TravelI_AI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "travel",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://travel-i.vercel.app/#website",
                  url: "https://travel-i.vercel.app/",
                  name: "Travel~I",
                  description: "AI-Powered Travel Assistant for Photo Location Detection and Travel Planning",
                  publisher: {
                    "@id": "https://travel-i.vercel.app/#organization",
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://travel-i.vercel.app/search?q={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                  inLanguage: "en-US",
                },
                {
                  "@type": "Organization",
                  "@id": "https://travel-i.vercel.app/#organization",
                  name: "Travel~I",
                  url: "https://travel-i.vercel.app/",
                  logo: {
                    "@type": "ImageObject",
                    inLanguage: "en-US",
                    "@id": "https://travel-i.vercel.app/#/schema/logo/image/",
                    url: "https://travel-i.vercel.app/logo.png",
                    contentUrl: "https://travel-i.vercel.app/logo.png",
                    width: 512,
                    height: 512,
                    caption: "Travel~I",
                  },
                  image: {
                    "@id": "https://travel-i.vercel.app/#/schema/logo/image/",
                  },
                  sameAs: [
                    "https://twitter.com/TravelI_AI",
                    "https://facebook.com/TravelI",
                    "https://instagram.com/travel_i_ai",
                  ],
                },
                {
                  "@type": "WebApplication",
                  name: "Travel~I AI Assistant",
                  url: "https://travel-i.vercel.app/",
                  description:
                    "Upload travel photos to instantly identify locations using AI. Find hotels, plan routes, and get personalized travel recommendations.",
                  applicationCategory: "TravelApplication",
                  operatingSystem: "Web Browser",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                    description: "Free photo location detection for everyone",
                  },
                  featureList: [
                    "AI-powered photo location detection",
                    "Hotel search and booking",
                    "Route planning and directions",
                    "AI travel chat assistant",
                    "Real-time travel recommendations",
                  ],
                },
              ],
            }),
          }}
        />
        <link rel="canonical" href="https://travel-i.vercel.app/" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="theme-color" content="#3E5F44" />
        <meta name="msapplication-TileColor" content="#3E5F44" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Travel~I" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      {/*  Google tag (gtag.js)  */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RJ5N6PB713"></Script>
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RJ5N6PB713');
        `}
      </Script>

      <body className="font-sans">{children}</body>
    </html>
  )
}
