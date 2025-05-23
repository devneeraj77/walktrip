// app/guides/[username]/page.tsx

import { notFound } from "next/navigation";
import { Guide } from "@/types";

async function getGuide(username: string): Promise<Guide | null> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/guides/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

type Params = Promise<{ username: string }>

export default async function GuideProfilePage(props: {
  params: Params

}) {
  const params = await props.params
  const guide = await getGuide(params.username);

  if (!guide) return notFound();

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <img
          alt={guide.name}
          className="w-24 h-24 rounded-full object-cover"
          src={guide.avatar}
        />
        <div>
          <h1 className="text-3xl font-bold">{guide.name}</h1>
          <p className="text-gray-600">{guide.location}</p>
        </div>
      </div>
      <p className="mt-4">{guide.bio}</p>
      <p className="mt-2">
        <strong>Specialty:</strong> {guide.specialty}
      </p>
      <p>
        <strong>Experience:</strong> {guide.experience}
      </p>
      <p>
        <strong>Languages:</strong> {guide.languages.join(", ")}
      </p>
      <p>
        <strong>Hourly Rate:</strong> ${guide.hourlyRate}
      </p>
      <p>
        <strong>Rating:</strong> {guide.rating} / 5 ({guide.reviewCount} reviews)
      </p>
    </div>
  );
}
