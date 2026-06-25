"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

import { useCms } from "@/components/providers/CmsProvider";

export function CTASection() {
  const { home } = useCms();
  const cta = home.cta;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.fromTo(
      content,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div
          ref={contentRef}
          className="relative rounded-[var(--radius-bubble)] overflow-hidden p-12 md:p-16 lg:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-green to-brand-yellow" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl animate-float" />
          <div
            className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl animate-float"
            style={{ animationDelay: "2s" }}
          />

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {cta.title}
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/katalog" variant="white" size="lg">
                <Download className="w-5 h-5" />
                {cta.primaryLabel}
              </Button>
              <Button
                href="/iletisim"
                variant="ghost"
                size="lg"
                className="text-white border-2 border-white/30 hover:bg-white/10"
              >
                {cta.secondaryLabel}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
