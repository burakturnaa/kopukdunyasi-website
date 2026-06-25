import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import { getContentSection } from "@/lib/content";
import { defaultContent } from "@/lib/default-content";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fredoka",
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  let global = defaultContent.global;
  try {
    global = await getContentSection("global");
  } catch {
    // fallback
  }

  return {
    title: {
      default: global.seoTitle,
      template: `%s | ${global.siteName}`,
    },
    description: global.seoDescription,
    keywords: [
      "köpük dünyası",
      "baloncuk",
      "oyuncak",
      "çocuk oyuncağı",
      "köpük tüpü",
      "sabun köpüğü",
    ],
    authors: [{ name: global.siteName }],
    icons: {
      icon: [{ url: global.faviconUrl || "/logo.png", type: "image/png" }],
      apple: [{ url: global.faviconUrl || "/logo.png", type: "image/png" }],
      shortcut: global.faviconUrl || "/logo.png",
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      title: global.seoTitle,
      description: global.seoDescription,
      siteName: global.siteName,
      ...(global.ogImage ? { images: [{ url: global.ogImage }] } : {}),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>{children}</body>
    </html>
  );
}
