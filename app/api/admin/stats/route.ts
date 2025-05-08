import redis from "@/lib/redis";
import { Booking, Guide, Service } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [bookings, guides, services] = await Promise.all([
      redis.get<Booking[]>("bookings"),
      redis.get<Guide[]>("guides"),
      redis.get<Service[]>("services"),
    ]);

    const stats = {
      totalBookings: bookings?.length || 0,
      totalRevenue:
        bookings?.reduce((acc, booking) => acc + booking.totalPrice, 0) || 0,
      activeGuides: guides?.length || 0,
      pendingBookings:
        bookings?.filter((b) => b.status === "pending").length || 0,
      totalServices: services?.length || 0, // Now using `services`
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error); // Log error to console
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 },
    );
  }
}
