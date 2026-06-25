"use client";

import { Shield, Sparkles, Heart, Award, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Counter } from "@/components/animations/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useCms } from "@/components/providers/CmsProvider";
import { features as fallbackFeatures } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  sparkles: Sparkles,
  heart: Heart,
  award: Award,
};

const colorStyles = {
  blue: "from-brand-blue/20 to-brand-blue/5 text-brand-blue",
  green: "from-brand-green/20 to-brand-green/5 text-brand-green",
  yellow: "from-brand-yellow/20 to-brand-yellow/5 text-brand-yellow-dark",
  red: "from-brand-red/20 to-brand-red/5 text-brand-red",
};

export function WhyUsSection() {
  const { home } = useCms();
  const features = home.features.length ? home.features : fallbackFeatures;
  const stats = home.stats;
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
      <div className="container-custom relative">
        <FadeIn>
          <SectionHeading
            badge="Neden Köpük Dünyası?"
            title="Güvenle Tercih Edin"
            subtitle="Çocuklarınız için en iyisini sunuyoruz"
          />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? Shield;
            return (
              <FadeIn key={feature.title} delay={index * 0.1}>
                <Card className="h-full text-center group">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                      colorStyles[feature.color as keyof typeof colorStyles] ?? colorStyles.blue
                    )}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 rounded-[var(--radius-bubble)] bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow text-white text-center">
            {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">
                <Counter end={stat.end} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </div>
          ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
