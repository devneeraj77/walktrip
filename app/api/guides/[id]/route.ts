import redis from "@/lib/redis";
import { Guide } from "@/types";
import { NextResponse } from "next/server";


type Params = Promise<{ id: string }>;

export async function GET(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;

    const guides = await redis.get<Guide[]>("guides");
    const guide = guides?.find((g) => g.id === params.id);

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
