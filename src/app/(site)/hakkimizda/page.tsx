import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/AboutPageContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Köpük Dünyası'nın hikayesi, misyonu ve vizyonu. Çocukların hayal gücünü harekete geçiren güvenli oyuncaklar üretiyoruz.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
