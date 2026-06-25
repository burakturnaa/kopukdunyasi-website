"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { useCms } from "@/components/providers/CmsProvider";

export function Footer() {
  const { global } = useCms();

  return (
    <footer className="bg-text-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-brand-blue blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-brand-green blur-3xl" />
      </div>

      <div className="container-custom section-padding relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Logo logoUrl={global.logoUrl} size="lg" />
            <p className="mt-4 text-white/60 text-sm leading-relaxed">{global.footerDescription}</p>
            <div className="flex gap-3 mt-6">
              {global.social.instagram && (
                <a href={global.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-blue transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {global.social.facebook && (
                <a href={global.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-blue transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {global.social.youtube && (
                <a href={global.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-brand-yellow transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${global.contact.email}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
                  <Mail className="w-4 h-4 shrink-0" />
                  {global.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${global.contact.phone}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
                  <Phone className="w-4 h-4 shrink-0" />
                  {global.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                {global.contact.address}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Bülten</h3>
            <p className="text-white/60 text-sm mb-4">Yeni ürünler ve kampanyalardan haberdar olun.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {global.siteName}. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
