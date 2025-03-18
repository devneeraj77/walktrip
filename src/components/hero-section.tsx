"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export function HeroSection() {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://picsum.photos/1920/1080')",
          filter: "brightness(0.7)"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover Delhi&apos;s Hidden Gems
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Join our expert local guides for immersive walking tours through Delhi&apos;s rich history, vibrant culture, and authentic experiences.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            size="lg" 
            color="primary"
            endContent={<Icon icon="lucide:arrow-right" />}
          >
            Explore Tours
          </Button>
          <Button
            size="lg"
            variant="bordered"
            className="text-white border-white"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}