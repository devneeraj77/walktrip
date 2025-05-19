"use client";

import { useEffect, useState } from "react";

import { Review } from "@/types";

export default function GuideReview({ guideId }: { guideId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`/api/guides/${guideId}/reviews`);
      const data = await res.json();

      setReviews(data);
    };

    fetchReviews();
  }, [guideId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="border rounded p-3">
              <div className="font-medium">{r.userName}</div>
              <div className="text-sm text-gray-600">Rating: {r.rating}/5</div>
              <p className="mt-1">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
