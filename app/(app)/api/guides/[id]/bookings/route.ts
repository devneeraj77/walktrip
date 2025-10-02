import { NextResponse } from "next/server";

import redis from "@/lib/redis";
import { Booking } from "@/types";

type Params = Promise<{ id: string }>;

export async function GET(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;
    const bookings = await redis.get<Booking[]>("bookings");
    const guideBookings =
      bookings?.filter((b) => b.guideId === params.id) || [];

    return NextResponse.json(guideBookings);
  } catch (error) {
    console.error("Error fetching guide bookings:", error); // Log the error

    return NextResponse.json(
      { error: "Failed to fetch guide bookings" },
      { status: 500 },
    );
  }
}
