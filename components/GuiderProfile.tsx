import { Guide } from "@/types";
import ReviewWrite from "./ReviewWrite";
import { user } from "@heroui/theme";

type GuiderProfileProps = {
  guide: Guide;
};

export default function GuiderProfile({ guide }: GuiderProfileProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow">
      <img
        alt={guide.name}
        className="w-32 h-32 rounded-full object-cover border shadow"
        src={guide.avatar}
      />
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold">{guide.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">{guide.title}</p>
        <p className="text-sm mt-1">
          <strong>Location:</strong> {guide.location}
        </p>
        <p className="text-sm">
          <strong>Specialty:</strong> {guide.specialty}
        </p>
        <p className="text-sm">
          <strong>Experience:</strong> {guide.experience}
        </p>
        <p className="text-sm">
          <strong>Languages:</strong> {guide.languages.join(", ")}
        </p>
        <p className="text-sm">
          <strong>Hourly Rate:</strong> ${guide.hourlyRate}
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{guide.bio}</p>
        <p className="text-sm mt-2">
          ⭐ {guide.rating.toFixed(1)} ({guide.reviewCount} reviews)
        </p>
      </div>
      <ReviewWrite guideId={guide.id} userId={userId} />
    </div>
  );
}
