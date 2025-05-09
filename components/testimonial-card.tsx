"use client";

import React from "react";
import { Avatar, Card, CardBody, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TestimonialCardProps {
  id: string;
  name: string;
  location: string;
  comment: string;
  avatar: string;
  rating: number;
}

export function TestimonialCard({
  name,
  location,
  comment,
  avatar,
  rating,
}: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex gap-3">
          <Avatar size="md" src={avatar} />
          <div className="flex flex-col">
            <p className="text-md font-semibold">{name}</p>
            <p className="text-small text-default-600">{location}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Icon key={i} className="text-warning" icon="lucide:star" />
          ))}
        </div>
      </CardHeader>

      <CardBody>
        <p className="text-default-600">{comment}</p>
      </CardBody>
    </Card>
  );
}
