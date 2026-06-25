import type { Metadata } from "next";
import { CatalogPageHero } from "@/components/sections/CatalogPageHero";
import { CatalogContent } from "@/components/sections/CatalogContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Katalog",
  description:
    "Köpük Dünyası ürün kataloğunu indirin. Tüm ürünler, teknik özellikler ve distribütör bilgileri.",
};

export default function CatalogPage() {
  return (
    <>
      <CatalogPageHero />
      <CatalogContent />
    </>
  );
}
