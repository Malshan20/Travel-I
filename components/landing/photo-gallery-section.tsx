export function PhotoGallerySection() {
  const galleryImages = [
    { src: "/paris.webp?height=400&width=300", alt: "Paris" },
    { src: "/lake-louise.webp?height=300&width=400", alt: "Lake Louise" },
    { src: "/maldives.webp?height=350&width=300", alt: "Maldives" },
    { src: "/mount-fuji.webp?height=300&width=300", alt: "Mount Fuji" },
    { src: "/santorini.webp?height=400&width=350", alt: "Santorini" },
    { src: "/machu-picchu.webp?height=350&width=400", alt: "Machu Picchu" },
  ]

  return (
    <section id="destinations" className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-light text-gray-900 mb-6">
            Discover Amazing Places
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore breathtaking destinations and see how our AI technology reveals the stories behind every location
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl aspect-square hover:scale-105 transition-transform duration-500"
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
