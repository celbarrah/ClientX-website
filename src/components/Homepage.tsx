import { HeroSection } from "./site/Hero";
import { BrandsSection } from "./site/Brands";
import { ConsolidationSection } from "./site/Consolidation";
import { FeaturesSection } from "./site/Features";
import { StepsSection } from "./site/Steps";
import { VideoSection } from "./site/Video";
import { SectorsSection } from "./site/Sectors";
import { PricingSection } from "./site/Pricing";
import { BookingSection } from "./site/Booking";
import { FaqSection } from "./site/Faq";
import { FooterCTA } from "./site/primitives";

export function Homepage() {
  return (
    <main className="overflow-x-clip">
      <HeroSection />
      <BrandsSection />
      <ConsolidationSection />
      <FeaturesSection />
      <StepsSection />
      <VideoSection />
      <SectorsSection />
      <PricingSection />
      <BookingSection />
      <FaqSection />
      <FooterCTA />
    </main>
  );
}
