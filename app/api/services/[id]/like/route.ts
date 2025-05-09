import { NextResponse } from "next/server";

import redis from "@/lib/redis";
import { Service } from "@/types";
import { auth } from "@/auth";

type Params = Promise<{ id: string }>;

export async function POST(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const services = (await redis.get<Service[]>("services")) || [];
    const serviceIndex = services.findIndex((s) => s.id === params.id);

    if (serviceIndex === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const service = services[serviceIndex];
    const userId = session.user.id;
    const hasLiked = service.likedBy.includes(userId);

    if (hasLiked) {
      service.likes -= 1;
      service.likedBy = service.likedBy.filter((id) => id !== userId);
    } else {
      service.likes += 1;
      service.likedBy.push(userId);
    }

    services[serviceIndex] = service;
    await redis.set("services", services);

    return NextResponse.json({ service, totalLikes: service.likes });
  } catch (error) {
    console.error("Error updating service likes:", error); // ✅ Logs the error to avoid ESLint warning

    return NextResponse.json(
      { error: "Failed to update service likes" },
      { status: 500 },
    );
  }
}
