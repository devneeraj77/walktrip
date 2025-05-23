"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  addToast,
} from "@heroui/react";

import { Guide } from "@/types";

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  guide: Guide;
}

export function BookingModal({
  isOpen,
  onOpenChange,
  guide,
}: BookingModalProps) {
  const [date, setDate] = React.useState("");
  const [duration, setDuration] = React.useState(2);
  const [loading, setLoading] = React.useState(false);

  const validateForm = () => {
    if (!date) {
      addToast({
        color: "warning",
        title: "Validation Error",
        description: "Please select a date for the booking.",
      });

      return false;
    }

    if (isNaN(duration) || duration < 1 || duration > 8) {
      addToast({
        color: "warning",
        title: "Validation Error",
        description: "Duration must be between 1 and 8 hours.",
      });

      return false;
    }

    return true;
  };

  const handleBooking = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const booking = {
        guideId: guide.id,
        userId: "user123", // This should be dynamic in real apps
        date,
        duration,
        totalPrice: guide.hourlyRate * duration,
        status: "pending",
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      addToast({
        color: "success",
        title: "Booking Confirmed!",
        description: `You have booked ${guide.name}`,
      });

      onOpenChange(); // Close modal
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Booking failed:", error);
      }
      addToast({
        color: "danger",
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Book a Tour with {guide.name}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Select Date"
                type="date"
                value={date}
                onValueChange={setDate}
              />
              <Input
                label="Duration (hours)"
                max={8}
                min={1}
                type="number"
                value={duration.toString()}
                onValueChange={(value) => setDuration(Number(value))}
              />
              <p className="text-default-600">
                Total Price: ₹{guide.hourlyRate * duration}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={loading}
                onPress={handleBooking}
              >
                Confirm Booking
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
