import type { Review } from "@/data/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col p-7 sm:p-9">
      <p className="text-xs text-muted" aria-label={`${review.rating} van 5 sterren`}>
        <span aria-hidden="true" className="tracking-[0.2em] text-foreground">
          {"★".repeat(review.rating)}
        </span>
      </p>

      <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-foreground/90">
        <p>&ldquo;{review.text}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-8 text-sm">
        <span className="font-medium">{review.name}</span>
        <span className="text-muted">
          {" "}
          — {review.vehicle}, {review.service}
        </span>
      </figcaption>
    </figure>
  );
}
