"use client";

import type { SiteContent } from "@/lib/types/content";
import { createContext, useContext } from "react";

const CmsContext = createContext<SiteContent | null>(null);

export function CmsProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return <CmsContext.Provider value={content}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error("useCms must be used within CmsProvider");
  }
  return ctx;
}

export function useCmsOptional() {
  return useContext(CmsContext);
}
