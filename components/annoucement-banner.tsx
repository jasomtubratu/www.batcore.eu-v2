"use client"

import { AlertTriangle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnnouncementBannerProps {
  type: "WARNING" | "ERROR"
  message: string
  onDismiss?: () => void
  dismissible?: boolean
}

export function AnnouncementBanner({ type, message, onDismiss, dismissible = true }: AnnouncementBannerProps) {
  return (
    <div
      className={`w-full p-3 flex items-center justify-between ${
        type === "WARNING"
          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
      }`}
    >
      <div className="flex items-center gap-2">
        {type === "WARNING" ? (
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <span>{message}</span>
      </div>
      {dismissible && onDismiss && (
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onDismiss}>
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  )
}