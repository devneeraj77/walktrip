import { NextResponse } from "next/server";

import redis from "@/lib/redis";
import { Review } from "@/types";
type Params = Promise<{ id: string }>;

export async function GET(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;

    const reviews = (await redis.get<Review[]>("reviews")) || [];
    const guideReviews = reviews.filter((r) => r.guideId === params.id);

    return NextResponse.json(guideReviews);
  } catch (error) {
    console.error("Error fetching guide reviews:", error); // Log the error

    return NextResponse.json(
      { error: "Failed to fetch guide reviews" },
      { status: 500 },
    );
  }
}
