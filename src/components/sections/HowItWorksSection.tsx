"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PackageOpen, Wind, PartyPopper } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCms } from "@/components/providers/CmsProvider";
import { howItWorksSteps as fallbackSteps } from "@/lib/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, typeof PackageOpen> = {
  "package-open": PackageOpen,
  wind: Wind,
  "party-popper": PartyPopper,
};

const colorStyles = {
  blue: {
    bg: "bg-brand-blue/10",
    text: "text-brand-blue",
    border: "border-brand-blue",
    gradient: "from-brand-blue to-brand-blue-light",
  },
  green: {
    bg: "bg-brand-green/10",
    text: "text-brand-green",
    border: "border-brand-green",
    gradient: "from-brand-green to-brand-green-light",
  },
  yellow: {
    bg: "bg-brand-yellow/10",
    text: "text-brand-yellow-dark",
    border: "border-brand-yellow",
    gradient: "from-brand-yellow to-brand-yellow-light",
  },
};

export function HowItWorksSection() {
  const { home } = useCms();
  const howItWorksSteps = home.howItWorks.length ? home.howItWorks : fallbackSteps;
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
      <div className="container-custom">
        <FadeIn>
          <SectionHeading
            badge="Nasıl Çalışır?"
            title="3 Adımda Eğlence"
            subtitle="Kullanımı çok kolay! Sadece aç, üfle ve eğlen."
          />
        </FadeIn>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <div
            ref={lineRef}
            className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-1 bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow origin-left rounded-full"
          />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {howItWorksSteps.map((step, index) => {
              const Icon = iconMap[step.icon] ?? PackageOpen;
              const colors = colorStyles[step.color as keyof typeof colorStyles] ?? colorStyles.blue;

              return (
                <FadeIn key={step.step} delay={index * 0.2}>
                  <motion.div className="text-center group">
                    <div className="relative inline-flex mb-6">
                      <div
                        className={cn(
                          "w-32 h-32 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
                          colors.bg
                        )}
                      >
                        <div
                          className={cn(
                            "w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg",
                            colors.gradient
                          )}
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <span
                        className={cn(
                          "absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg text-white bg-gradient-to-br shadow-md",
                          colors.gradient
                        )}
                      >
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{step.description}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
