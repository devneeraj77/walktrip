import redis from "@/lib/redis";
import { Guide } from "@/types";
import Image from "next/image";
import { Chip } from "@heroui/chip";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

// Fetch guide by username from Redis
async function getGuide(username: string): Promise<Guide | null> {
  const guides = await redis.get<Guide[]>("guides");
  if (!guides) return null;

  return guides.find((g) => g.username === username) || null;
}

export default async function GuideProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const guide = await getGuide(username);

  if (!guide) {
    return (
      <div className="h-80 flex justify-center items-center">
        <div className="bg-[#3E625918] rounded-sm py-4 max-w-xl m-auto flex flex-col items-center justify-center">
          <span>
            <IconAlertTriangleFilled height={40} width={40} />
          </span>
          <Chip
            size="sm"
            variant="light"
            className="text-center text-balance text-[#212922] rounded-lg py-8 px-6"
          >
            The guide specified is not valid. Please check the URL for accuracy.
          </Chip>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Image
          alt={guide.name}
          className="w-24 h-24 rounded-full object-cover"
          src={guide.avatar}
          width={200}
          height={200}
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
        <strong>Rating:</strong> {guide.rating} / 5 ({guide.reviewCount}{" "}
        reviews)
      </p>
    </div>
  );
}
