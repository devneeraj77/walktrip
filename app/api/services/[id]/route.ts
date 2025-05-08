import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { Service } from "@/types";
type Params = Promise<{ id: string }>;
export async function PUT(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;
    const updatedService: Service = await request.json();
    const services = (await redis.get<Service[]>("services")) || [];

    const index = services.findIndex((s) => s.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    services[index] = { ...services[index], ...updatedService };
    await redis.set("services", services);

    return NextResponse.json(services[index]);
  } catch (error) {
    console.error("Error updating service:", error); // Log the error
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  segmentData: { params: Params },
) {
  try {
    const params = await segmentData.params;
    const services = (await redis.get<Service[]>("services")) || [];
    const updatedServices = services.filter((s) => s.id !== params.id);

    await redis.set("services", updatedServices);

    return NextResponse.json({
      success: true,
      totalServices: updatedServices.length,
    });
  } catch (error) {
    console.error("Error deleting service:", error); // Log the error
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 },
    );
  }
}
