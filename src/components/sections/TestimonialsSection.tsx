"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCms } from "@/components/providers/CmsProvider";

export function TestimonialsSection() {
  const { home } = useCms();
  const testimonials = home.testimonials;
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-gradient-to-b from-blue-50/50 to-white relative overflow-hidden">
      <div className="container-custom">
        <FadeIn>
          <SectionHeading
            badge="Yorumlar"
            title="Aileler Ne Diyor?"
            subtitle="Binlerce mutlu aile Köpük Dünyası'nı tercih ediyor"
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -top-6 left-8 text-brand-blue/10">
              <Quote className="w-24 h-24" />
            </div>

            <div className="glass rounded-[var(--radius-bubble)] p-8 md:p-12 shadow-[var(--shadow-card)] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-text-primary leading-relaxed mb-8 italic">
                    &ldquo;{testimonials[current].content}&rdquo;
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center text-white font-bold text-sm">
                      {testimonials[current].avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-text-primary">
                        {testimonials[current].name}
                      </p>
                      <p className="text-sm text-text-muted">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-brand-blue/20 flex items-center justify-center hover:bg-brand-blue/10 transition-colors"
                  aria-label="Önceki yorum"
                >
                  <ChevronLeft className="w-5 h-5 text-brand-blue" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === current ? "bg-brand-blue w-8" : "bg-brand-blue/20"
                      }`}
                      aria-label={`Yorum ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-brand-blue/20 flex items-center justify-center hover:bg-brand-blue/10 transition-colors"
                  aria-label="Sonraki yorum"
                >
                  <ChevronRight className="w-5 h-5 text-brand-blue" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
