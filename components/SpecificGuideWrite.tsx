"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SpecificGuideWrite({ guideId }: { guideId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ rating: 5, comment: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return alert("You must be logged in to write a review.");

    const review = {
      username: session.user?.name || "Anonymous",
      rating: form.rating,
      comment: form.comment,
    };

    const res = await fetch(`/api/guides/${guideId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (res.ok) {
      setForm({ rating: 5, comment: "" });
      router.refresh(); // re-fetch data on current route
    } else {
      alert("Failed to submit review");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
      {session ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium" htmlFor="rating">
              Rating
            </label>
            <input
              className="w-full border px-3 py-2 rounded"
              id="rating"
              max={5}
              min={1}
              type="number"
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="block font-medium" htmlFor="comment">
              Comment
            </label>
            <textarea
              required
              className="w-full border px-3 py-2 rounded"
              id="comment"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <p>You must be logged in to write a review.</p>
      )}
    </div>
  );
}
