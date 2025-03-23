"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, AlertCircle, Save, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Skeleton } from "@/components/ui/skeleton"

interface Announcement {
  id?: string
  text: string
  type: "WARNING" | "ERROR"
}

export function AnnouncementDashboard() {
  const [announcementType, setAnnouncementType] = useState<"WARNING" | "ERROR">("WARNING")
  const [announcementText, setAnnouncementText] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState<string | undefined>(undefined)

  // Fetch the current announcement on component mount
  useEffect(() => {
    fetchAnnouncement()
  }, [])

  const fetchAnnouncement = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/announcements")
      if (!response.ok) {
        throw new Error("Failed to fetch announcement")
      }

      const data = await response.json()
      if (data) {
        setAnnouncementText(data.text || "")
        setAnnouncementType(data.type || "WARNING")
        setCurrentAnnouncementId(data.id)
        setIsActive(true)
      } else {
        // No announcement found
        setAnnouncementText("")
        setAnnouncementType("WARNING")
        setCurrentAnnouncementId(undefined)
        setIsActive(false)
      }

      setError(null)
    } catch (err) {
      setError("Error loading announcement. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      if (!isActive) {
        // If inactive, delete any existing announcement
        await deleteAnnouncement()
        return
      }

      // Validate
      if (!announcementText.trim()) {
        toast({
          title: "Error",
          description: "Announcement text cannot be empty.",
          variant: "destructive",
        })
        return
      }

      const announcement: Announcement = {
        text: announcementText,
        type: announcementType,
      }

      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announcement),
      })

      if (!response.ok) {
        throw new Error("Failed to save announcement")
      }

      const savedAnnouncement = await response.json()
      setCurrentAnnouncementId(savedAnnouncement.id)

      toast({
        title: "Announcement updated",
        description: "Your announcement has been saved successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save announcement. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  const deleteAnnouncement = async () => {
    try {
      const response = await fetch("/api/announcements", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete announcement")
      }

      setCurrentAnnouncementId(undefined)
      setIsActive(false)

      toast({
        title: "Announcement removed",
        description: "The announcement has been deactivated.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to remove announcement. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Announcement Dashboard</h1>
        <p className="text-muted-foreground">Manage the announcement that appears at the top of your website.</p>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Preview</h2>
        {loading ? (
          <Skeleton className="h-16 w-full" />
        ) : (
          isActive && (
            <div
              className={`p-4 rounded-md flex items-center gap-3 ${
                announcementType === "WARNING"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
              }`}
            >
              {announcementType === "WARNING" ? (
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <span>{announcementText || "Your announcement will appear here"}</span>
            </div>
          )
        )}
      </div>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Announcement</CardTitle>
          <CardDescription>Configure the type and content of your announcement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">
              {error}
              <Button variant="outline" className="mx-auto mt-4 block" onClick={fetchAnnouncement}>
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="status">Announcement Status</Label>
                <div className="flex items-center space-x-2">
                  <Button variant={isActive ? "default" : "outline"} size="sm" onClick={() => setIsActive(true)}>
                    Active
                  </Button>
                  <Button variant={!isActive ? "default" : "outline"} size="sm" onClick={() => setIsActive(false)}>
                    Inactive
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Announcement Type</Label>
                <RadioGroup
                  defaultValue="WARNING"
                  value={announcementType}
                  onValueChange={(value) => setAnnouncementType(value as "WARNING" | "ERROR")}
                  className="flex flex-col space-y-1"
                  disabled={!isActive}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="WARNING" id="warning" />
                    <Label htmlFor="warning" className="flex items-center gap-2 cursor-pointer">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      WARNING
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ERROR" id="error" />
                    <Label htmlFor="error" className="flex items-center gap-2 cursor-pointer">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      ERROR
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="announcement-text">Announcement Text</Label>
                <Input
                  id="announcement-text"
                  placeholder="Enter your announcement text here..."
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  disabled={!isActive}
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isActive && currentAnnouncementId && (
            <Button variant="destructive" onClick={deleteAnnouncement} disabled={loading}>
              <Trash className="mr-2 h-4 w-4" />
              Remove Announcement
            </Button>
          )}
          <div className={!isActive || !currentAnnouncementId ? "ml-auto" : ""}>
            <Button onClick={handleSave} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}

