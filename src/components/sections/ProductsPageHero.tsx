"use client";

import { useCms } from "@/components/providers/CmsProvider";
import { PageHero } from "@/components/ui/PageHero";

export function ProductsPageHero() {
  const { products } = useCms();
  return <PageHero {...products.pageHero} />;
}
