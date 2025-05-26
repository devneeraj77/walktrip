import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { Guide } from "@/types";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  segmentData: { params: Params }
) {
  const params = await segmentData.params;
  const id = params.id;

  try {
    const guides = await redis.get<Guide[]>("guides");
    if (!guides) {
      return NextResponse.json({ error: "No guides found" }, { status: 404 });
    }

    const guide = guides.find((g) => g.id === id);
    if (!guide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    return NextResponse.json(guide);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch guide" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  segmentData: { params: Params }
) {
  const params = await segmentData.params;
  const id = params.id;

  try {
    const guides = await redis.get<Guide[]>("guides");
    if (!guides) {
      return NextResponse.json({ error: "No guides found" }, { status: 404 });
    }

    const updatedGuides = guides.filter((g) => g.id !== id);

    await redis.set("guides", updatedGuides);

    return NextResponse.json({ message: "Guide deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete guide" },
      { status: 500 }
    );
  }
}
