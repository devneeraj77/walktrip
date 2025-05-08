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

  const handleBooking = async () => {
    try {
      setLoading(true);
      const booking = {
        guideId: guide.id,
        userId: "user123", // In a real app, this would come from authentication
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

      onOpenChange();
    } catch (error) {
      console.error("Booking error:", error);
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
                type="date"
                label="Select Date"
                value={date}
                onValueChange={setDate}
              />
              <Input
                type="number"
                label="Duration (hours)"
                value={duration.toString()}
                onValueChange={(value) => setDuration(Number(value))}
                min={1}
                max={8}
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
                onPress={handleBooking}
                isLoading={loading}
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
