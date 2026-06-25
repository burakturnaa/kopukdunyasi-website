"use client";

import Image from "next/image";
import { Target, Eye, Heart, ShieldCheck, Lightbulb, Gem, Smile } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useCms } from "@/components/providers/CmsProvider";
import { cn } from "@/lib/utils";

const valueIconMap: Record<string, typeof ShieldCheck> = {
  "shield-check": ShieldCheck,
  lightbulb: Lightbulb,
  gem: Gem,
  smile: Smile,
};

const valueColorStyles: Record<string, string> = {
  blue: "from-brand-blue/20 to-brand-blue/5 text-brand-blue",
  yellow: "from-brand-yellow/20 to-brand-yellow/5 text-brand-yellow-dark",
  green: "from-brand-green/20 to-brand-green/5 text-brand-green",
  red: "from-brand-red/20 to-brand-red/5 text-brand-red",
};

export function AboutPageContent() {
  const { about } = useCms();

  return (
    <>
      <PageHero badge={about.hero.badge} title={about.hero.title} subtitle={about.hero.subtitle} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] rounded-[var(--radius-bubble)] overflow-hidden shadow-[var(--shadow-card)]">
                <Image src={about.story.image} alt="Hakkımızda" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <SectionHeading badge="Marka Hikayemiz" title="Hayallerden Gerçeğe" align="left" />
              <div className="space-y-4 text-text-secondary leading-relaxed">
                {about.story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <Card className="h-full">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="font-display text-2xl font-bold text-text-primary mb-4">{about.mission.title}</h3>
                <p className="text-text-secondary leading-relaxed">{about.mission.text}</p>
              </Card>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card className="h-full">
                <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-brand-green" />
                </div>
                <h3 className="font-display text-2xl font-bold text-text-primary mb-4">{about.vision.title}</h3>
                <p className="text-text-secondary leading-relaxed">{about.vision.text}</p>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeIn>
            <SectionHeading badge="Değerlerimiz" title="Bizi Biz Yapan Değerler" subtitle="Her kararımızda bu değerleri rehber alıyoruz" />
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((value, index) => {
              const Icon = valueIconMap[value.icon] ?? ShieldCheck;
              return (
                <FadeIn key={value.title} delay={index * 0.1}>
                  <Card className="text-center h-full">
                    <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-5", valueColorStyles[value.color] ?? valueColorStyles.blue)}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-3">{value.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow text-white">
        <div className="container-custom text-center">
          <FadeIn>
            <Heart className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{about.banner.title}</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">{about.banner.subtitle}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
