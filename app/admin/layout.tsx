"use client"; // ⬅️ Add this

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
// import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isBordered className="bg-background/70 backdrop-blur-sm">
        <NavbarBrand>
          <Icon className="text-2xl text-primary" icon="lucide:map" />
          <p className="font-bold text-inherit ml-2">Walktrip Admin</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="danger" href="/auth/logout" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex">
        {/* <AdminSidebar /> */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
