import React from "react";

// import { AdminDashboardStats } from "@/components/admin/admin-dashboard-stats";
import redis from "@/lib/redis";
import { AdminStats, Booking } from "@/types";

async function getAdminStats(): Promise<AdminStats> {
  const bookings = await redis.get<Booking[]>("bookings");
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const guides = await redis.get<{ length: number }>("guides");
  const activeGuides =
    guides && typeof guides.length === "number" ? guides.length : 0;

  return {
    totalBookings: safeBookings.length,
    totalRevenue: safeBookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0,
    ),
    activeGuides: activeGuides,
    pendingBookings: safeBookings.filter((b) => b.status === "pending").length,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* <AdminDashboardStats stats={stats} /> */}
    </div>
  );
}
