"use client";

import Image from "next/image";
import React from "react";
import { Card } from "@heroui/react";
import { IconAlarmFilled } from "@tabler/icons-react";

import { tours } from "@/data/content";

type Tour = (typeof tours)[number];

const ToursCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {tours.map((tour: Tour) => (
        <Card
          key={tour.id}
          className=" rounded-lg shadow-md overflow-hidden transition hover:shadow-xl"
        >
          <Image
            alt={tour.title}
            className="w-full h-48 object-cover"
            height={600}
            src={tour.image}
            width={800}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
            <p className="text-gray-600 mb-2">{tour.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
              <span className="flex justify-center items-center">
                <IconAlarmFilled className="" /> {tour.duration}
              </span>

              <span>₹ {tour.price}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ToursCard;
