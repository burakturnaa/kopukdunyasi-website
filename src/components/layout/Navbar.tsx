"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { useCmsOptional } from "@/components/providers/CmsProvider";

export function Navbar() {
  const cms = useCmsOptional();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[var(--shadow-soft)] py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container-custom px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo logoUrl={cms?.global.logoUrl} />

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                pathname === link.href
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-text-secondary hover:text-brand-blue hover:bg-brand-blue/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button href="/katalog" variant="primary" size="sm">
            <Download className="w-4 h-4" />
            Katalog İndir
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-full hover:bg-brand-blue/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="container-custom px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                    pathname === link.href
                      ? "bg-brand-blue/10 text-brand-blue"
                      : "text-text-secondary hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/katalog" variant="primary" size="md" className="mt-4 w-full">
                <Download className="w-4 h-4" />
                Katalog İndir
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
