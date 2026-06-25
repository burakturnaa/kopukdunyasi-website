"use client";

import { useCms } from "@/components/providers/CmsProvider";
import { PageHero } from "@/components/ui/PageHero";

export function CatalogPageHero() {
  const { catalog } = useCms();
  return <PageHero {...catalog.pageHero} />;
}
