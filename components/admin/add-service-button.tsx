"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export function AddServiceButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    maxGroupSize: "",
    meetingPoint: "",
    includes: [] as string[],
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          maxGroupSize: Number(formData.maxGroupSize),
          image: `https://picsum.photos/800/600?random=${Math.random()}`,
        }),
      });

      if (response.ok) {
        setIsOpen(false);
        setFormData({
          title: "",
          description: "",
          duration: "",
          price: "",
          maxGroupSize: "",
          meetingPoint: "",
          includes: [],
        });
      }
    } catch (error) {
      console.error("Failed to create service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        color="primary"
        endContent={<Icon icon="lucide:plus" />}
        onPress={() => setIsOpen(true)}
      >
        Add Service
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New Service</ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  value={formData.title}
                  onValueChange={(value) =>
                    setFormData({ ...formData, title: value })
                  }
                />
                <Textarea
                  label="Description"
                  value={formData.description}
                  onValueChange={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                />
                <Input
                  label="Duration"
                  value={formData.duration}
                  onValueChange={(value) =>
                    setFormData({ ...formData, duration: value })
                  }
                />
                <Input
                  label="Price"
                  type="number"
                  value={formData.price}
                  onValueChange={(value) =>
                    setFormData({ ...formData, price: value })
                  }
                />
                <Input
                  label="Max Group Size"
                  type="number"
                  value={formData.maxGroupSize}
                  onValueChange={(value) =>
                    setFormData({ ...formData, maxGroupSize: value })
                  }
                />
                <Input
                  label="Meeting Point"
                  value={formData.meetingPoint}
                  onValueChange={(value) =>
                    setFormData({ ...formData, meetingPoint: value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={loading}
                  onPress={handleSubmit}
                >
                  Create Service
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
