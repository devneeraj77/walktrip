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
    console.error("Error fetching guide reviews:", error);

    return NextResponse.json(
      { error: "Failed to fetch guide reviews" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const body = await req.json();
    const reviews = (await redis.get<Review[]>("reviews")) || [];

    const newReview: Review = {
      id: Date.now().toString(),
      guideId: (await params).id,
      ...body,
    };

    reviews.push(newReview);
    await redis.set("reviews", reviews);

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Error posting review:", error); // ✅ This fixes the warning

    return NextResponse.json(
      { error: "Failed to post review" },
      { status: 500 },
    );
  }
}
