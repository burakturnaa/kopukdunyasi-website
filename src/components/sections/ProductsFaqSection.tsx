"use client";

import { useCms } from "@/components/providers/CmsProvider";
import { FAQSection } from "./FAQSection";

export function ProductsFaqSection() {
  const { products } = useCms();
  return <FAQSection items={products.faq} />;
}
