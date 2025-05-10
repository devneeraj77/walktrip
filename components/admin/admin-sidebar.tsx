"use client";

import React from "react";
import { Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "lucide:home",
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: "lucide:package",
  },
  {
    name: "Guides",
    href: "/admin/guides",
    icon: "lucide:users",
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: "lucide:calendar",
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: "lucide:message-square",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-default-50 p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                isActive ? "bg-primary text-white" : "hover:bg-default-100"
              }`}
              href={item.href}
            >
              <Icon className="text-xl" icon={item.icon} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
