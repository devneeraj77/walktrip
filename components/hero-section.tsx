"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Spotlight } from "./ui/spotlight-new";

export function HeroSection() {
  return (
    <>

      <div className="relative min-h-[80vh] overflow-hidden rounded-md flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://picsum.photos/1920/1080')",
            filter: "brightness(0.7)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-full mx-auto px-4 bg-white/3 backdrop-blur-sm md:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
            Discover Delhi&apos;s Hidden Gems
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Join our expert local guides for immersive walking tours through
            Delhi&apos;s rich history, vibrant culture, and authentic experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button color="default" size="lg" variant="flat">
              Explore Tours
            </Button>
            <Button className="text-white border-white" size="lg" variant="light">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="border-2 border-rose-300 hidden">gf
        <Spotlight />
      </div>
    </>
  );
}
