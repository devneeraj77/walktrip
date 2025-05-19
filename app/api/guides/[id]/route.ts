import { NextResponse } from "next/server";

import redis from "@/lib/redis";
import { Guide } from "@/types";

type Params = Promise<{ id: string, username: string }>;

export async function GET(request: Request, segmentData: Promise<{ params: Params }>) {
  try {
    const params = (await segmentData).params;

    const guides = await redis.get<Guide[]>("guides");
    const guide = guides?.find(async (g) => g.username === (await params).username);

    if (!guide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    return NextResponse.json(guide);
  } catch (error) {
    console.error("Error fetching guide:", error); // Log the error to use it

    return NextResponse.json(
      { error: "Failed to fetch guide" },
      { status: 500 },
    );
  }
}
