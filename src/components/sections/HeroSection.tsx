"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/components/providers/CmsProvider";

const BubbleScene = dynamic(
  () => import("@/components/three/BubbleScene").then((m) => m.BubbleScene),
  { ssr: false }
);

export function HeroSection() {
  const { home } = useCms();
  const { hero } = home;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-blue)_0%,_transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-brand-green)_0%,_transparent_50%)] opacity-10" />

      <BubbleScene />

      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-brand-yellow/20 blur-2xl animate-float" />
      <div
        className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-brand-red/15 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-brand-green/20 blur-2xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-blue/20 text-brand-blue text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              {hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            <span className="text-gradient">{hero.titleLine1}</span>
            <br />
            <span className="text-text-primary">{hero.titleLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href={hero.primaryCtaHref} variant="primary" size="lg">
              {hero.primaryCtaLabel}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href={hero.secondaryCtaHref} variant="outline" size="lg">
              <Download className="w-5 h-5" />
              {hero.secondaryCtaLabel}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-text-muted"
          >
            {hero.trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-green" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-brand-blue/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-brand-blue"
          />
        </div>
      </motion.div>
    </section>
  );
}
