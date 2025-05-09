// components/home.tsx (Client Component)
"use client";

import { HeroSection } from "@/components/hero-section";
import { GuideCard } from "@/components/guide-card";
import { Guide } from "@/types";
import { Spotlight } from "./ui/spotlight-new";

interface HomeProps {
  guides: Guide[];
}

export default function Home({ guides }: HomeProps) {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      {/* <Spotlight /> */}
      <section id="guides" className="py-20 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Expert Local Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides && guides.length > 0 ? (
              guides.map((guide) => <GuideCard key={guide.id} {...guide} />)
            ) : (
              <GuideCard
                id="default"
                title="No Guides Available"
                description="We couldn’t load the guides right now. Please check back later."
                image="/default-guide.jpg"
                link="#"
                name="John Doe"
                specialty="General Guide"
                experience="5 years"
                avatar="/default-avatar.jpg"
                bio="A dedicated guide who will appear once data is available."
                languages={["English"]}
                hourlyRate={0}
                availability={{ Monday: false, Tuesday: false }}
                rating={0}
                reviewCount={0}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
