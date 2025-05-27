import { NextRequest, NextResponse } from "next/server";

import redis from "@/lib/redis";
import { Guide } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

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
    console.error("GET error:", error); // log for server debugging

    return NextResponse.json(
      { error: (error as Error).message || "Failed to fetch guide" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  try {
    const guides = await redis.get<Guide[]>("guides");

    if (!guides) {
      return NextResponse.json({ error: "No guides found" }, { status: 404 });
    }

    const updatedGuides = guides.filter((g) => g.id !== id);

    await redis.set("guides", updatedGuides);

    return NextResponse.json({ message: "Guide deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error); // log for server debugging

    return NextResponse.json(
      { error: (error as Error).message || "Failed to delete guide" },
      { status: 500 },
    );
  }
}
