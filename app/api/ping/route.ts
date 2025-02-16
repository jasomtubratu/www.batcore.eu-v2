import { NextResponse } from "next/server";
import { serverLocations } from "@/components/sections/server-locations/data";

export async function GET() {
    const apiKey = process.env.BETTERSTACK_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const headers = { Authorization: `Bearer ${apiKey}` };
    const results = [];

    for (const location of serverLocations) {
        const url = `https://uptime.betterstack.com/api/v2/monitors/${location.id}/response-times`;

        try {
            const response = await fetch(url, { headers });
            if (!response.ok) {
                console.error(`Failed to fetch data for ID ${location.id}`);
                continue;
            }

            const data = await response.json();

            if (!data?.data) {
                console.error(`Unexpected response format for ${location.id}`);
                continue;
            }

            const locationData = data.data;
            const region = locationData?.attributes?.regions?.find((r: any) => r.region === "eu");

            if (!region || !Array.isArray(region.response_times)) {
                console.warn(`No response times available for EU region in ${location.id}`);
                continue;
            }

            const responseTimes = region.response_times;

            const latestTime = responseTimes[responseTimes.length - 1]?.response_time || 0;

            results.push({
                id: location.id,
                latest_response_time: latestTime * 1000,
            });


        } catch (error) {
            console.error(`Error fetching data for ${location.id}:`, error);
        }
    }

    return NextResponse.json(results);
}
