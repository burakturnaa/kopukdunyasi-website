import type { ContentSectionKey } from "./types/content";

export type AdminNavKey = ContentSectionKey | "mesajlar" | "sifre";

export const contentSectionLabels: Record<ContentSectionKey, string> = {
  global: "Genel Ayarlar",
  home: "Anasayfa",
  about: "Hakkımızda",
  products: "Ürünler",
  catalog: "Katalog",
  contact: "İletişim",
};

export const adminNavItems: { key: AdminNavKey; href: string; label: string }[] = [
  { key: "global", href: "/admin/global", label: "Genel Ayarlar" },
  { key: "home", href: "/admin/home", label: "Anasayfa" },
  { key: "about", href: "/admin/about", label: "Hakkımızda" },
  { key: "products", href: "/admin/products", label: "Ürünler" },
  { key: "catalog", href: "/admin/catalog", label: "Katalog" },
  { key: "contact", href: "/admin/contact", label: "İletişim" },
  { key: "mesajlar", href: "/admin/mesajlar", label: "Mesajlar" },
  { key: "sifre", href: "/admin/sifre", label: "Şifre Değiştir" },
];
