import React from "react";

// import { ServiceList } from "@/components/admin/service-list";
// import { AddServiceButton } from "@/components/admin/add-service-button";
import { Service } from "@/types";
import redis from "@/lib/redis";

async function getServices(): Promise<Service[]> {
  return (await redis.get<Service[]>("services")) || [];
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        {/* <AddServiceButton /> */}
      </div>
      {/*       
      <ServiceList initialServices={services} /> */}
    </div>
  );
}
