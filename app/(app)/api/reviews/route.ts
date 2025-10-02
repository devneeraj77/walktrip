import { NextResponse } from "next/server";

import { auth } from "@/auth";
import redis from "@/lib/redis";
import { Review, Guide } from "@/types";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reviewData: Omit<
      Review,
      "id" | "createdAt" | "userName" | "userAvatar"
    > = await request.json();

    const reviews = (await redis.get<Review[]>("reviews")) || [];
    const guides = (await redis.get<Guide[]>("guides")) || [];

    const guideIndex = guides.findIndex((g) => g.id === reviewData.guideId);

    if (guideIndex === -1) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    const newReview: Review = {
      ...reviewData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      userName: session.user.name || "Anonymous",
      userAvatar: session.user.image,
    };

    reviews.push(newReview);
    await redis.set("reviews", reviews);

    // Update guide rating
    const guideReviews = reviews.filter(
      (r) => r.guideId === reviewData.guideId,
    );
    const averageRating =
      guideReviews.reduce((acc, r) => acc + r.rating, 0) / guideReviews.length;

    guides[guideIndex] = {
      ...guides[guideIndex],
      rating: averageRating,
      reviewCount: guideReviews.length,
    };

    await redis.set("guides", guides);

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Error creating review:", error); // Logging the error to fix ESLint warning

    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 },
    );
  }
}
