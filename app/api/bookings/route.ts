import { NextResponse } from "next/server";

import redis from "@/lib/redis";
import { Booking } from "@/types";

export async function GET() {
  try {
    const bookings = (await redis.get<Booking[]>("bookings")) || [];

    const stats = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce(
        (acc, booking) => acc + booking.totalPrice,
        0,
      ),
      pendingBookings: bookings.filter((b) => b.status === "pending").length,
    };

    return NextResponse.json({ bookings, stats });
  } catch (error) {
    console.error("Error fetching bookings:", error); // Logging the error

    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const booking: Booking = await request.json();
    const bookings = (await redis.get<Booking[]>("bookings")) || [];

    const newBooking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    await redis.set("bookings", bookings);

    return NextResponse.json({
      booking: newBooking,
      totalBookings: bookings.length,
    });
  } catch (error) {
    console.error("Error creating booking:", error); // Logging the error

    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
