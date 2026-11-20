import { PricingSection } from "./site/Pricing";
import { FaqSection } from "./site/Faq";
import { LuxeClosing } from "./site/PremiumBlocks";
import {
  BeautyHero,
  BeautyMarquee,
  BeautyDifferences,
  BeautyActivities,
  BeautySteps,
  BeautyProof,
} from "./site/BeautyHome";

export function Homepage() {
  return (
    <main className="overflow-x-clip">
      <BeautyHero />
      <BeautyMarquee />
      <BeautyDifferences />
      <BeautyActivities />
      <BeautySteps />
      <BeautyProof />
      <PricingSection />
      <FaqSection />
      <LuxeClosing />
    </main>
  );
}
