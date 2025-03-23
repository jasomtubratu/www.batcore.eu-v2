import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { getServerAuthSession } from "@/auth"

// Get the current announcement
export async function GET() {
  try {
    // Get the only announcement (should be only one)
    const announcement = await prisma.announcements.findFirst()

    if (!announcement) {
      return NextResponse.json(null)
    }

    return NextResponse.json({
      id: announcement.id,
      text: announcement.title,
      type: announcement.category,
    })
  } catch (error) {
    console.error("Error fetching announcement:", error)
    return NextResponse.json({ error: "Failed to fetch announcement" }, { status: 500 })
  }
}

// Create or update an announcement
export async function POST(request: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.text || !data.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // First, delete any existing announcements
    await prisma.announcements.deleteMany({})

    // Then create the new announcement
    const announcement = await prisma.announcements.create({
      data: {
        title: data.text,
        category: data.type as "WARNING" | "ERROR",
      },
    })

    return NextResponse.json({
      id: announcement.id,
      text: announcement.title,
      type: announcement.category,
    })
  } catch (error) {
    console.error("Error saving announcement:", error)
    return NextResponse.json({ error: "Failed to save announcement" }, { status: 500 })
  }
}

// Delete the announcement
export async function DELETE() {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    // Delete all announcements (should be only one)
    await prisma.announcements.deleteMany({})

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting announcement:", error)
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
  }
}

