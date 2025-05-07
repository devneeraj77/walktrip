"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { BookingModal } from "./booking-modal";
import { Guide } from "@/types";


export function GuideCard({
  id,
  name,
  specialty,
  experience,
  avatar,
  bio,
  languages,
  hourlyRate,
  rating = 0, // Default to 0 if no rating is provided
  reviewCount = 0, // Default to 0 if no reviewCount is provided
}: Guide) {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  return (
    <>
      <Card className="text-center">
        <CardHeader className="pb-0 pt-6 px-4 flex-col items-center">
          <Avatar src={avatar} className="w-20 h-20" size="lg" />
          <h4 className="font-bold text-large mt-2">{name}</h4>
          <p className="text-default-600 text-small">{specialty}</p>
        </CardHeader>
        <CardBody>
          <p className="text-default-600 mb-2">
            {experience} years of experience
          </p>
          <p className="text-default-600 mb-2">{bio}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-2 py-1 bg-default-100 rounded-full text-small"
              >
                {lang}
              </span>
            ))}
          </div>
          <p className="font-semibold">₹{hourlyRate}/hour</p>
        </CardBody>
        <CardFooter className="justify-center">
          <Button
            color="primary"
            endContent={<Icon icon="lucide:calendar" />}
            onPress={() => setIsBookingOpen(true)}
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>

      <BookingModal
        isOpen={isBookingOpen}
        onOpenChange={() => setIsBookingOpen(false)}
        guide={{
          id,
          name,
          specialty,
          experience,
          avatar,
          bio,
          languages,
          hourlyRate,
          availability: {},
          rating, // Pass the rating
          reviewCount, // Pass the reviewCount
        }}
      />
    </>
  );
}