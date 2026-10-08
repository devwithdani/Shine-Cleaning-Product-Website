import { AddOns } from "@/components/sections/AddOns";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { DetailingExplained } from "@/components/sections/DetailingExplained";
import { FinalCta } from "@/components/sections/FinalCta";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Quote } from "@/components/sections/Quote";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { Services } from "@/components/sections/Services";
import { TextileCleaning } from "@/components/sections/TextileCleaning";
import { WhyUs } from "@/components/sections/WhyUs";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* slides over the sticky hero. overflow-clip instead of hidden, otherwise sticky breaks */}
      <div className="relative z-10 -mt-[100svh] overflow-clip bg-background shadow-[0_-50px_120px_rgb(0_0_0/0.8)]">
        <DetailingExplained />

        <Services />
        <ServiceDetails />
        <AddOns />
        <TextileCleaning />

        <BeforeAfter />
        <Gallery />

        <Process />
        <WhyUs />
        <Reviews />

        <FinalCta />
        <Quote />
      </div>
    </>
  );
}
