// components/home.tsx (Client Component)
"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { HeroSection } from "@/components/hero-section";
import { GuideCard } from "@/components/guide-card";
import { Guide } from "../../types";

interface HomeProps {
  guides: Guide[];
}

export default function Home({ guides }: HomeProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isBordered className="bg-background/70 backdrop-blur-sm">
        <NavbarBrand>
          <Icon icon="lucide:map" className="text-2xl text-primary" />
          <p className="font-bold text-inherit ml-2">Walktrip</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#guides">
              Our Guides
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#how-it-works">
              How It Works
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="primary" variant="flat">
              Become a Guide
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <HeroSection />

      <section id="guides" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Expert Local Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <GuideCard key={guide.id} {...guide} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
