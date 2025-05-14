"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { EditServiceModal } from "./edit-service-modal";

import { Service } from "@/types";

interface ServiceListProps {
  initialServices: Service[];
}

export function ServiceList({ initialServices }: ServiceListProps) {
  const [services, setServices] = React.useState<Service[]>(initialServices);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedService, setSelectedService] = React.useState<Service | null>(
    null,
  );

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  return (
    <>
      <Table aria-label="Services table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DURATION</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>GROUP SIZE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.title}</TableCell>
              <TableCell>{service.duration}</TableCell>
              <TableCell>₹{service.price}</TableCell>
              <TableCell>{service.maxGroupSize}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    color="primary"
                    variant="light"
                    onPress={() => handleEdit(service)}
                  >
                    <Icon icon="lucide:edit" />
                  </Button>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => handleDelete(service.id)}
                  >
                    <Icon icon="lucide:trash" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditServiceModal
        isOpen={isOpen}
        service={selectedService}
        onOpenChange={onOpenChange}
        onSuccess={(updatedService) => {
          setServices(
            services.map((s) =>
              s.id === updatedService.id ? updatedService : s,
            ),
          );
        }}
      />
    </>
  );
}
