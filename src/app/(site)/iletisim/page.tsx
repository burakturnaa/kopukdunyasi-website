import type { Metadata } from "next";
import { ContactPageHero } from "@/components/sections/ContactPageHero";
import { ContactContent } from "@/components/sections/ContactContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Köpük Dünyası ile iletişime geçin. Sipariş, bayilik ve genel bilgi için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <>
      <ContactPageHero />
      <ContactContent />
    </>
  );
}
