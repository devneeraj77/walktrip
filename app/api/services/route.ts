import redis from "@/lib/redis";

import { Service } from "@/types";

import { NextResponse } from "next/server";


export async function GET() {
  try {
    const services = (await redis.get<Service[]>("services")) || [];

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error); // Logging error
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const service: Service = await request.json();
    const services = (await redis.get<Service[]>("services")) || [];

    const newService = {
      ...service,
      id: crypto.randomUUID(),
      likes: 0,
      likedBy: [],
    };

    services.push(newService);
    await redis.set("services", services);

    return NextResponse.json({
      service: newService,
      totalServices: services.length,
    });
  } catch (error) {
    console.error("Error creating service:", error); // Logging error
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 },
    );
  }
}
