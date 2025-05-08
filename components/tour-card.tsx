"use client";

import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
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
        <Image alt={title} className="h-48 w-full object-cover" src={image} />
      </CardHeader>
      <CardBody>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-default-600">{description}</p>
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
          fullWidth
          color="primary"
          endContent={<Icon icon="lucide:arrow-right" />}
          variant="flat"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
