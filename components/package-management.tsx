"use client"

import { useState, useEffect } from "react"
import { Edit, Trash, Save, Plus, Server, Gamepad2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageUpload } from "@/components/image-upload"

// Define the package type
interface Package {
  id: string
  type: "minecraft" | "vps"
  name: string
  price: number
  discount?: number
  cpu: number
  ram: number
  disk: number
  image: string
}

export function PackageManagement() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/packages")
      if (!response.ok) {
        throw new Error("Failed to fetch packages")
      }
      const data = await response.json()
      setPackages(data)
      setError(null)
    } catch (err) {
      setError("Error loading packages. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const savePackage = async (pkg: Package) => {
    try {
      const response = await fetch("/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pkg),
      })

      if (!response.ok) {
        throw new Error("Failed to save package")
      }

      // Update local state
      setPackages((prevPackages) => {
        const index = prevPackages.findIndex((p) => p.id === pkg.id)
        if (index >= 0) {
          const newPackages = [...prevPackages]
          newPackages[index] = pkg
          return newPackages
        } else {
          return [...prevPackages, pkg]
        }
      })

      setEditingPackage(null)
      toast({
        title: "Package saved",
        description: "Your package has been updated successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save package. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  const deletePackage = async (id: string) => {
    try {
      const response = await fetch(`/api/packages?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete package")
      }

      // Update local state
      setPackages((prevPackages) => prevPackages.filter((p) => p.id !== id))

      toast({
        title: "Package deleted",
        description: "Your package has been deleted successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete package. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  const addNewPackage = (type: "minecraft" | "vps") => {
    const newPackage: Package = {
      id: `new-${Date.now()}`,
      type,
      name: `New ${type === "minecraft" ? "Minecraft" : "VPS"} Package`,
      price: 0,
      discount: 0,
      cpu: 1,
      ram: 1,
      disk: 10,
      image: "",
    }

    setEditingPackage(newPackage)
  }

  const handleInputChange = (field: keyof Package, value: string | number) => {
    if (!editingPackage) return

    setEditingPackage({
      ...editingPackage,
      [field]: field === "name" || field === "image" ? value : Number(value),
    })
  }

  // Filter packages by type
  const minecraftPackages = packages.filter((pkg) => pkg.type === "minecraft")
  const vpsPackages = packages.filter((pkg) => pkg.type === "vps")

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Package Management</h2>
        <p className="text-muted-foreground">Manage Minecraft and VPS packages for your website.</p>
      </div>

      <Tabs defaultValue="minecraft">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="minecraft" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Minecraft Packages
          </TabsTrigger>
          <TabsTrigger value="vps" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            VPS Packages
          </TabsTrigger>
        </TabsList>

        {/* Minecraft Packages Tab */}
        <TabsContent value="minecraft" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => addNewPackage("minecraft")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Minecraft Package
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-40" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-red-500">{error}</div>
                <Button variant="outline" className="mx-auto mt-4 block" onClick={fetchPackages}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {minecraftPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onEdit={() => setEditingPackage(pkg)}
                  onDelete={() => deletePackage(pkg.id)}
                />
              ))}
              {minecraftPackages.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="pt-6 text-center">
                    <p>No Minecraft packages found. Add your first package!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* VPS Packages Tab */}
        <TabsContent value="vps" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => addNewPackage("vps")}>
              <Plus className="mr-2 h-4 w-4" />
              Add VPS Package
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-40" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-red-500">{error}</div>
                <Button variant="outline" className="mx-auto mt-4 block" onClick={fetchPackages}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {vpsPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onEdit={() => setEditingPackage(pkg)}
                  onDelete={() => deletePackage(pkg.id)}
                />
              ))}
              {vpsPackages.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="pt-6 text-center">
                    <p>No VPS packages found. Add your first package!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Package Modal */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingPackage.id.startsWith("new") ? "Add New Package" : "Edit Package"}</CardTitle>
              <CardDescription>Update the details for this {editingPackage.type} package.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Package Name</Label>
                <Input
                  id="name"
                  value={editingPackage.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (Credits per day)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={editingPackage.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  value={editingPackage?.discount || 0}
                  onChange={(e) => handleInputChange("discount", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpu">CPU (%)</Label>
                  <Input
                    id="cpu"
                    type="number"
                    min="1"
                    value={editingPackage.cpu}
                    onChange={(e) => handleInputChange("cpu", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ram">RAM (MB)</Label>
                  <Input
                    id="ram"
                    type="number"
                    min="1"
                    value={editingPackage.ram}
                    onChange={(e) => handleInputChange("ram", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disk">Disk (MB)</Label>
                  <Input
                    id="disk"
                    type="number"
                    min="1"
                    value={editingPackage.disk}
                    onChange={(e) => handleInputChange("disk", e.target.value)}
                  />
                </div>
              </div>

              <ImageUpload
                value={editingPackage.image}
                onChange={(value) => handleInputChange("image", value)}
                label="Package Image"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setEditingPackage(null)}>
                Cancel
              </Button>
              <Button onClick={() => savePackage(editingPackage)}>
                <Save className="mr-2 h-4 w-4" />
                Save Package
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

// Package Card Component
function PackageCard({
  pkg,
  onEdit,
  onDelete,
}: {
  pkg: Package
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{pkg.name}</span>
          <div className="text-right">
            {pkg.discount ? (
              <>
                <span className="text-lg font-medium">{pkg.price - pkg.discount} Credits</span>
                <span className="text-sm text-muted-foreground line-through ml-2">{pkg.price}</span>
              </>
            ) : (
              <span className="text-lg font-medium">{pkg.price} Credits</span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <img
            src={pkg.image || "/placeholder.svg"}
            alt={pkg.name}
            className="h-24 w-auto object-contain"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-sm text-muted-foreground">CPU</p>
            <p className="font-medium">{pkg.cpu} %</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">RAM</p>
            <p className="font-medium">{pkg.ram} MB</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Disk</p>
            <p className="font-medium">{pkg.disk} MB</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

