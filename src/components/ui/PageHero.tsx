"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl" />

      <div className="container-custom relative px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-3xl">
            {badge && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-semibold mb-4"
              >
                {badge}
              </motion.span>
            )}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">{subtitle}</p>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
