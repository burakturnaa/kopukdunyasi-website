import type { Metadata } from "next";
import { ProductsPageHero } from "@/components/sections/ProductsPageHero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ProductsFaqSection } from "@/components/sections/ProductsFaqSection";
import { CTASection } from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Köpük Dünyası ürün ailesi. Köpük Tüpü Klasik ve daha fazlası. Güvenli, eğlenceli çocuk oyuncakları.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsPageHero />
      <ProductGrid />
      <ProductsFaqSection />
      <CTASection />
    </>
  );
}
