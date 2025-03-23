"use client"

import { useState } from "react"
import { AlertTriangle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DismissibleAnnouncementProps {
  text: string
  type: "WARNING" | "ERROR"
}

export function DismissibleAnnouncement({ text, type }: DismissibleAnnouncementProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return null
  }

  return (
    <div
      className={`w-full p-3 flex items-center justify-between text-center ${
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
        <span>{text}</span>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setVisible(false)}>
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </div>
  )
}

