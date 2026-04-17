import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
  structuredData?: object
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/og-image.jpg",
  noIndex = false,
  structuredData,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | Travel~I` : "Travel~I - AI-Powered Travel Assistant"
  const fullDescription =
    description ||
    "Upload travel photos and instantly discover locations with AI. Find hotels, plan routes, and get personalized travel recommendations."
  const fullCanonical = canonical ? `https://travel-i.vercel.app${canonical}` : "https://travel-i.vercel.app"

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={`https://travel-i.vercel.app${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`https://travel-i.vercel.app${ogImage}`} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  )
}
