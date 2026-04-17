export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "File must be an image" }
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 10MB" }
  }

  // Check supported formats
  const supportedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  if (!supportedTypes.includes(file.type)) {
    return { valid: false, error: "Supported formats: JPEG, PNG, WebP" }
  }

  return { valid: true }
}

export function resizeImage(file: File, maxWidth = 1920, maxHeight = 1080): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width *= ratio
        height *= ratio
      }

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height)

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(resizedFile)
          } else {
            resolve(file) // Fallback to original
          }
        },
        file.type,
        0.9, // Quality
      )
    }

    img.src = URL.createObjectURL(file)
  })
}
