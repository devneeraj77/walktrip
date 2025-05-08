import { NextResponse } from "next/server";

import redis from "@/lib/redis";

import { Guide } from "@/types";

export async function GET() {
  try {
    const guides = await redis.get<Guide[]>("guides");
    return NextResponse.json(guides || []);
  } catch (error) {
    console.error("Error fetching guides:", error); // Log the error
    return NextResponse.json(
      { error: "Failed to fetch guides" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const guide: Guide = await request.json();
    const guides = (await redis.get<Guide[]>("guides")) || [];

    const newGuide = { ...guide, id: crypto.randomUUID() };
    guides.push(newGuide);
    await redis.set("guides", guides);

    return NextResponse.json({ guide: newGuide, totalGuides: guides.length });
  } catch (error) {
    console.error("Error creating guide:", error); // Log the error
    return NextResponse.json(
      { error: "Failed to create guide" },
      { status: 500 },
    );
  }
}
