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
  Textarea,
} from "@heroui/react";
import { Service } from "@/types";

interface EditServiceModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  service: Service | null;
  onSuccess: (service: Service) => void;
}

export function EditServiceModal({
  isOpen,
  onOpenChange,
  service,
  onSuccess,
}: EditServiceModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<Service>>({});

  React.useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

  const handleSubmit = async () => {
    if (!service) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedService = await response.json();

        onSuccess(updatedService);
        onOpenChange();
      }
    } catch (error) {
      console.error("Failed to update service:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit Service</ModalHeader>
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
                value={formData.price?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, price: Number(value) })
                }
              />
              <Input
                label="Max Group Size"
                type="number"
                value={formData.maxGroupSize?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, maxGroupSize: Number(value) })
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
                Update Service
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
