"use client"

import { useState, useEffect } from "react"
import { DismissibleAnnouncement } from "@/components/site-annoucement-components"

interface Announcement {
  text: string
  type: "WARNING" | "ERROR"
}

export function SiteAnnouncement() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const res = await fetch("/api/announcements")
        if (!res.ok) {
          throw new Error("Chyba pri načítaní oznámenia")
        }
        const data: Announcement = await res.json()
        setAnnouncement(data)
      } catch (err) {
        console.error(err)
        setError("Nepodarilo sa načítať oznámenie.")
      } finally {
        setLoading(false)
      }
    }
    fetchAnnouncement()
  }, [])

  if (loading) return null
  if (error || !announcement) return null

  return (
    <DismissibleAnnouncement text={announcement.text} type={announcement.type} />
  )
}
