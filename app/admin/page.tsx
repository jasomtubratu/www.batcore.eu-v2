"use client";
import { AnnouncementDashboard } from "@/components/announcement-dashboard"
import { PackageManagement } from "@/components/package-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Megaphone, Package } from "lucide-react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    return (
        <main className="min-h-screen p-4 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>

            <Tabs defaultValue="announcements" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="announcements" className="flex items-center gap-2">
                        <Megaphone className="h-4 w-4" />
                        Announcements
                    </TabsTrigger>
                    <TabsTrigger value="packages" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Packages
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="announcements">
                    <AnnouncementDashboard />
                </TabsContent>

                <TabsContent value="packages">
                    <PackageManagement />
                </TabsContent>
            </Tabs>
        </main>
    )
}