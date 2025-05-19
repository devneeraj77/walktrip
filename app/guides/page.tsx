"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Guide } from "@/types";

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    const fetchGuides = async () => {
      const res = await fetch("/api/guides");
      const data = await res.json();

      setGuides(data);
    };

    fetchGuides();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Guides</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            className="p-4 border rounded shadow hover:bg-gray-50 transition"
            href={`/guides/${guide.username}`}
          >
            <div className="flex items-center gap-4">
              <img
                alt={guide.name}
                className="w-16 h-16 rounded-full object-cover"
                src={guide.avatar}
              />
              <div>
                <h2 className="font-semibold text-lg">{guide.name}</h2>
                <p className="text-sm text-gray-500">{guide.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
