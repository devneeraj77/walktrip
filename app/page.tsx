import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import HomePage from "./home-page";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import GuideReview from "@/components/GuideReview";
import GuideWrite from "@/components/SpecificGuideWrite";

export default function Home({ params }: { params: { id: string } }) {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div> */}
        <HomePage />
        {/* <div className="py-16 bg-muted" id="testimonials">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">What Travelers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} {...testimonial} />
              ))}
            </div>
          </div>
        </div> */}
        <TestimonialCarousel />

        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Guide Details</h1>
          {/* Other guide details here */}
          <GuideWrite guideId={params.id} />
          <GuideReview guideId={params.id} />
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.instagram}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </>
  );
}
