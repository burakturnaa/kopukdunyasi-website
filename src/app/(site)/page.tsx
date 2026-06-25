import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { getContentSection } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const global = await getContentSection("global");
  return {
    title: global.seoTitle,
    description: global.seoDescription,
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcaseSection />
      <HowItWorksSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
