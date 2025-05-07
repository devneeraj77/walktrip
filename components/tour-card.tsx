"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface TourCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

export function TourCard({
  title,
  description,
  duration,
  price,
  image,
}: TourCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="p-0">
        <Image src={image} alt={title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardBody>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-default-600 mb-4">{description}</p>
        <div className="flex items-center gap-4 text-default-600">
          <div className="flex items-center gap-1">
            <Icon icon="lucide:clock" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="lucide:indian-rupee" />
            <span>{price}</span>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          color="primary"
          variant="flat"
          fullWidth
          endContent={<Icon icon="lucide:arrow-right" />}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}