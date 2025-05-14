// components/home.tsx (Client Component)
"use client";

import ToursCard from "./tours";

import { HeroSection } from "@/components/hero-section";
import { GuideCard } from "@/components/guide-card";
import { Guide } from "@/types";

interface HomeProps {
  guides: Guide[];
}

export default function Home({ guides }: HomeProps) {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ToursCard />
      <section className="py-20 " id="guides">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Expert Local Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides && guides.length > 0 ? (
              guides.map((guide) => <GuideCard key={guide.id} {...guide} />)
            ) : (
              <GuideCard
                availability={{ Monday: false, Tuesday: false }}
                avatar={"https://i.pravatar.cc/150?u=41"}
                bio="A dedicated guide who will appear once data is available."
                description="We couldn’t load the guides right now. Please check back later."
                experience="5 years"
                hourlyRate={0}
                id="default"
                languages={["English"]}
                link="#"
                name="John Doe"
                rating={0}
                reviewCount={0}
                specialty="General Guide"
                title="No Guides Available"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
