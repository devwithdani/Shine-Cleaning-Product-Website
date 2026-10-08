import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";

// Only real reviews are shown, so this section stays hidden until there are some.
export function Reviews() {
  const realReviews = reviews.filter((review) => !review.isPlaceholder);
  if (realReviews.length === 0) return null;

  return (
    <section aria-labelledby="reviews-title" className="relative border-t border-line py-28 lg:py-40">
      <div className="container-page">
        <SectionHeading id="reviews-title" eyebrow="Reviews" title="Wat klanten zeggen." />

        <ul className="mt-16 grid border-t border-line md:grid-cols-3">
          {realReviews.map((review, index) => (
            <li key={review.id} className="border-b border-line md:border-r md:last:border-r-0">
              <ScrollReveal delay={index * 0.08} className="h-full">
                <ReviewCard review={review} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
