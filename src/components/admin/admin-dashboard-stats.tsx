"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AdminStats } from "../../../types";

interface AdminDashboardStatsProps {
  stats: AdminStats;
}

export function AdminDashboardStats({ stats }: AdminDashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Icon icon="lucide:users" className="text-2xl text-primary" />
          </div>
          <div>
            <p className="text-small text-default-500">Total Bookings</p>
            <p className="text-xl font-semibold">{stats.totalBookings}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="p-2 bg-success-100 rounded-lg">
            <Icon
              icon="lucide:indian-rupee"
              className="text-2xl text-success"
            />
          </div>
          <div>
            <p className="text-small text-default-500">Total Revenue</p>
            <p className="text-xl font-semibold">₹{stats.totalRevenue}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="p-2 bg-warning-100 rounded-lg">
            <Icon icon="lucide:map-pin" className="text-2xl text-warning" />
          </div>
          <div>
            <p className="text-small text-default-500">Active Guides</p>
            <p className="text-xl font-semibold">{stats.activeGuides}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="p-2 bg-danger-100 rounded-lg">
            <Icon icon="lucide:clock" className="text-2xl text-danger" />
          </div>
          <div>
            <p className="text-small text-default-500">Pending Bookings</p>
            <p className="text-xl font-semibold">{stats.pendingBookings}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
