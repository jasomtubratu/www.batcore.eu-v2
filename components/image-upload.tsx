"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  label?: string
  maxSizeInMB?: number
}

export function ImageUpload({ value, onChange, label = "Image", maxSizeInMB = 2 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    if (file.size > maxSizeInBytes) {
      setError(`File size exceeds ${maxSizeInMB}MB limit`)
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed")
      return
    }

    setError(null)
    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      onChange(base64String)
      setIsUploading(false)
    }
    reader.onerror = () => {
      setError("Failed to read file")
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleClear = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-gray-400 transition-colors">
          {value ? (
            <div className="relative w-full">
              <img
                src={value || "/placeholder.svg"}
                alt="Uploaded image"
                className="mx-auto max-h-48 object-contain"
                onError={() => setError("Failed to load image")}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 h-6 w-6 rounded-full"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to {maxSizeInMB}MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={value ? "hidden" : "absolute inset-0 w-full h-full opacity-0 cursor-pointer"}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>
    </div>
  )
}

