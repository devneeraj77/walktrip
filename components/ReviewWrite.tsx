"use client";

import { useState } from "react";

interface ReviewWriteProps {
  guideId: string;
  userId: string | null; // If null, user is not logged in
}

export default function ReviewWrite({ guideId, userId }: ReviewWriteProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!userId) {
      setError("You must be logged in to submit a review.");

      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment.");

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/guides/${guideId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      setSubmitted(true);
      setComment("");
      setRating(5);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while submitting the review.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-4 text-green-600 font-semibold">
        ✅ Thank you for your review!
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 border rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Write a Review</h3>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="mb-2">
        <label className="block text-sm font-medium" htmlFor="rating">
          Rating
        </label>
        <select
          className="mt-1 p-2 border rounded w-full"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r !== 1 && "s"}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium" htmlFor="comment">
          Comment
        </label>
        <textarea
          className="mt-1 p-2 border rounded w-full"
          id="comment"
          placeholder="Write your experience with this guide..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
