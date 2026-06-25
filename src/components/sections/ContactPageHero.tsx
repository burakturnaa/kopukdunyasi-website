"use client";

import { useCms } from "@/components/providers/CmsProvider";
import { PageHero } from "@/components/ui/PageHero";

export function ContactPageHero() {
  const { contact } = useCms();
  return <PageHero {...contact.pageHero} />;
}
