import redis from "@/lib/redis";
import { Guide } from "@/types";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;
    const id = params.id;
    const guides = (await redis.get<Guide[]>("guides")) || [];
    const guideIndex = guides.findIndex((g) => g.id === id);

    if (guideIndex === -1) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    const updatedAvailability = await request.json();
    guides[guideIndex].availability = updatedAvailability;

    await redis.set("guides", guides);

    return NextResponse.json({
      message: "Availability updated",
      guide: guides[guideIndex],
    });
  } catch (error) {
    console.error("Error updating guide availability:", error); // Prevent ESLint error
    return NextResponse.json(
      { error: "Failed to update availability" },
      { status: 500 },
    );
  }
}
