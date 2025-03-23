import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { getServerAuthSession } from "@/auth"

// Helper function to convert between API and database models
function mapPackageToResponse(pkg: any) {
  return {
    id: pkg.id,
    name: pkg.name,
    price: pkg.cost,
    discount: pkg.discount,
    cpu: pkg.cpu,
    ram: pkg.ram,
    disk: pkg.disk,
    image: pkg.image,
    type: pkg.category === 1 ? "minecraft" : "vps",
  }
}

function mapRequestToPackage(pkg: any) {
  return {
    name: pkg.name,
    cost: pkg.price,
    discount: pkg.discount || 0, // Default to 0 if not provided
    cpu: pkg.cpu,
    ram: pkg.ram,
    disk: pkg.disk,
    image: pkg.image,
    category: pkg.type === "minecraft" ? 1 : 2,
  }
}

export async function GET() {
  try {
    const packages = await prisma.packages.findMany()
    return NextResponse.json(packages.map(mapPackageToResponse))
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
    const session = await getServerAuthSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
  try {
    const requestData = await request.json()

    // Validate required fields
    if (!requestData.name || requestData.price === undefined || !requestData.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const packageData = mapRequestToPackage(requestData)

    let result

    // Update existing package or create a new one
    if (requestData.id && !requestData.id.startsWith("new-")) {
      // Update existing package
      result = await prisma.packages.update({
        where: { id: requestData.id },
        data: packageData,
      })
    } else {
      // Create new package
      result = await prisma.packages.create({
        data: packageData,
      })
    }

    return NextResponse.json(mapPackageToResponse(result))
  } catch (error) {
    console.error("Error saving package:", error)

    // Handle Prisma-specific errors
    if ((error as any).code === "P2025") {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed to save package" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
    const session = await getServerAuthSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 })
    }

    // Delete the package with the given ID
    await prisma.packages.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting package:", error)

    // Handle Prisma-specific errors
    if ((error as any).code === "P2025") {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 })
  }
}

