import { PricingSection } from "./site/Pricing";
import { FaqSection } from "./site/Faq";
import { FooterCTA } from "./site/primitives";
import {
  BeautyHero,
  BeautyDifferences,
  BeautyActivities,
  BeautySteps,
  BeautyProof,
} from "./site/BeautyHome";

export function Homepage() {
  return (
    <main className="overflow-x-clip">
      <BeautyHero />
      <BeautyDifferences />
      <BeautyActivities />
      <BeautySteps />
      <BeautyProof />
      <PricingSection />
      <FaqSection />
      <FooterCTA />
    </main>
  );
}
