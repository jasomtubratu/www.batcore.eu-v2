import { NextRequest, NextResponse } from "next/server";
import { serverLocations } from "@/components/sections/server-locations/data";
import ping from "tcp-ping";

export async function GET(request: NextRequest, props: { params: Promise<{id: string}>}) {
    const params = await props.params;
    const location = serverLocations.find((loc) => loc.id === params.id);

    if (!location) {
        return NextResponse.json({}, { status: 404 });
    }


    const pingResult = await new Promise<number>((resolve, reject) => {
        ping.ping({
            address: location.ip,
            attempts: 1,
            timeout: 1000,
        }, (err, data) => {
            return err ? reject(err) : resolve(data.avg);
        });
    });

    return NextResponse.json({
        location,
        ping: pingResult,
    });


}