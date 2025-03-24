"use client";
import { AnnouncementDashboard } from "@/components/announcement-dashboard"
import { PackageManagement } from "@/components/package-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Megaphone, Package } from "lucide-react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BackgroundAnimation } from "@/components/background-animation";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider attribute="class" defaultTheme="dark">
            <main className="min-h-screen bg-gradient-to-b from-background to-blue-950 relative">
                
                <h1 className="text-3xl font-bold tracking-tight mb-6 text-center mt-3">Admin Dashboard</h1>

                <Tabs defaultValue="announcements" className="space-y-6">
                    <div className="flex justify-center">
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
                    </div>

                    <TabsContent value="announcements">
                        <AnnouncementDashboard />
                    </TabsContent>

                    <TabsContent value="packages">
                        <PackageManagement />
                    </TabsContent>
                </Tabs>
            </main>
        </ThemeProvider>
    )
}