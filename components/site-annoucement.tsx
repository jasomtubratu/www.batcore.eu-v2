import { DismissibleAnnouncement } from "@/components/site-annoucement-components"
import prisma from "@/prisma/client"

export const dynamic = "force-dynamic";

export async function SiteAnnouncement() {
  const announcement = await prisma.announcements.findFirst()

  if (!announcement) {
    return null
  }

  return <DismissibleAnnouncement text={announcement.title} type={announcement.category} />
}

