"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Camera, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { LocationResults } from "./location-results"
import Link from "next/link"
import { isHeic, heicTo } from "heic-to"

interface UploadResult {
  success: boolean
  location?: string
  coordinates?: { lat: number; lng: number }
  confidence?: number
  landmarks?: string[]
  error?: string
  uploadId?: string
}

interface ImageUploadSectionProps {
  user?: any
}

const compressImage = (file: File, maxSizeKB = 300): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    const img = new Image()

    img.onload = () => {
      const maxDimension = 1200 // Start with reasonable size
      const { width, height } = img

      // Function to resize and compress
      const compressWithDimensions = (maxDim: number) => {
        let newWidth = width
        let newHeight = height

        if (newWidth > newHeight && newWidth > maxDim) {
          newHeight = (newHeight * maxDim) / newWidth
          newWidth = maxDim
        } else if (newHeight > maxDim) {
          newWidth = (newWidth * maxDim) / newHeight
          newHeight = maxDim
        }

        canvas.width = newWidth
        canvas.height = newHeight
        ctx.drawImage(img, 0, 0, newWidth, newHeight)

        let quality = 0.8
        const tryCompress = () => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const sizeKB = blob.size / 1024
                console.log(
                  `[v0] Compression attempt: ${sizeKB.toFixed(2)}KB at quality ${quality} with dimensions ${newWidth}x${newHeight}`,
                )

                if (sizeKB <= maxSizeKB) {
                  // Success - file is small enough
                  const compressedFile = new File([blob], file.name, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  })
                  resolve(compressedFile)
                } else if (quality > 0.1) {
                  // Try lower quality
                  quality -= 0.1
                  tryCompress()
                } else if (maxDim > 400) {
                  // Try smaller dimensions
                  console.log(`[v0] Reducing dimensions from ${maxDim} to ${maxDim * 0.8}`)
                  compressWithDimensions(Math.floor(maxDim * 0.8))
                } else {
                  // Last resort - create very small file
                  canvas.width = 300
                  canvas.height = 300
                  ctx.drawImage(img, 0, 0, 300, 300)
                  canvas.toBlob(
                    (finalBlob) => {
                      const finalFile = new File([finalBlob!], file.name, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                      })
                      console.log(`[v0] Final compressed size: ${(finalBlob!.size / 1024).toFixed(2)}KB`)
                      resolve(finalFile)
                    },
                    "image/jpeg",
                    0.3,
                  )
                }
              }
            },
            "image/jpeg",
            quality,
          )
        }

        tryCompress()
      }

      // Start compression process
      compressWithDimensions(maxDimension)
    }

    img.src = URL.createObjectURL(file)
  })
}

export function ImageUploadSection({ user }: ImageUploadSectionProps) {
  console.log("[v0] ImageUploadSection - user prop:", user)
  console.log("[v0] ImageUploadSection - user exists:", !!user)
  console.log("[v0] ImageUploadSection - should show signup:", !user)

  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsUploading(true)
    setUploadResult(null)

    try {
      let processFile = file
      let imageUrl = URL.createObjectURL(file)

      // Check if file is HEIC/HEIF and convert if necessary
      if (await isHeic(file)) {
        console.log("[v0] Detected HEIC/HEIF file, converting to JPEG...")
        const jpegBlob = await heicTo({
          blob: file,
          type: "image/jpeg",
          quality: 0.9 // High initial quality, will compress further if needed
        })
        processFile = new File([jpegBlob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
          type: "image/jpeg",
          lastModified: Date.now(),
        })
        imageUrl = URL.createObjectURL(processFile)
        console.log(`[v0] Converted HEIC/HEIF to JPEG: ${(processFile.size / 1024 / 1024).toFixed(2)}MB`)
      } else {
        console.log(`[v0] Processing non-HEIC file: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
      }

      // Create preview URL
      setUploadedImage(imageUrl)

      // Compress the (possibly converted) image
      const compressedFile = await compressImage(processFile, 200) // Target 200KB to be safe
      console.log(`[v0] Compressed file size: ${(compressedFile.size / 1024).toFixed(2)}KB`)

      if (compressedFile.size > 1.5 * 1024 * 1024) {
        // 1.5MB safety margin
        throw new Error("Compressed file is still too large. Please try a smaller image.")
      }

      // Create FormData with compressed image
      const formData = new FormData()
      formData.append("image", compressedFile)

      // Upload and analyze image
      const response = await fetch("/api/upload-analyze", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadResult(result)
      } else {
        setUploadResult({
          success: false,
          error: result.error || "Failed to analyze image",
        })
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadResult({
        success: false,
        error: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".heic", ".heif"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const resetUpload = () => {
    setUploadResult(null)
    setUploadedImage(null)
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Photo Location Detection</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload any travel photo and let our AI instantly identify the location. Completely free for everyone!
        </p>
      </div>

      {!uploadResult ? (
        <Card className="p-8 border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
          <div
            {...getRootProps()}
            className={`cursor-pointer text-center ${
              isDragActive ? "bg-primary/5" : ""
            } rounded-xl p-8 transition-colors`}
          >
            <input {...getInputProps()} />

            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Analyzing your photo...</h3>
                  <p className="text-gray-600">Our AI is identifying the location. This may take a few moments.</p>
                </div>
                {uploadedImage && (
                  <div className="mt-6">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="max-w-xs mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-[#0077b6]/10 rounded-full flex items-center justify-center">
                    {isDragActive ? (
                      <Upload className="w-10 h-10 text-primary" />
                    ) : (
                      <Camera className="w-10 h-10 text-primary" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {isDragActive ? "Drop your photo here" : "Upload your travel photo"}
                  </h3>
                  <p className="text-gray-600">Drag and drop your image here, or click to select from your device</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-xl">
                    <Camera className="w-5 h-5 mr-2" />
                    Choose Photo
                  </Button>
                  <span className="text-gray-500">or drag and drop</span>
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>Supported formats: JPEG, PNG, WebP, HEIC, HEIF</p>
                  <p>Maximum file size: 10MB</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Instant Location</h4>
                    <p className="text-sm text-gray-600">Get exact coordinates and place names</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">98% Accuracy</h4>
                    <p className="text-sm text-gray-600">Powered by advanced AI technology</p>
                  </div>
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Free Forever</h4>
                    <p className="text-sm text-gray-600">
                      {user ? "Enjoy unlimited uploads" : "No account required for basic detection"}
                    </p>
                  </div>
                </div>

                
              </div>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {uploadResult.success ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Location Detected Successfully!</h3>
                  <p className="text-blue-700">
                    We found your photo location with {uploadResult.confidence}% confidence.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900">Detection Failed</h3>
                  <p className="text-red-700">{uploadResult.error}</p>
                </div>
              </div>
            </div>
          )}

          {uploadResult.success && uploadResult.location && (
            <LocationResults
              location={uploadResult.location}
              coordinates={uploadResult.coordinates}
              landmarks={uploadResult.landmarks}
              confidence={uploadResult.confidence}
              imageUrl={uploadedImage}
            />
          )}

          <div className="text-center">
            <Button
              onClick={resetUpload}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
            >
              Upload Another Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}