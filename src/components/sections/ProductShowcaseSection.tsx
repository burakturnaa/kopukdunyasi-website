"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Star } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/components/providers/CmsProvider";

const colorMap: Record<string, string> = {
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  yellow: "bg-brand-yellow",
  red: "bg-brand-red",
};

export function ProductShowcaseSection() {
  const { home, products: productsContent } = useCms();
  const featuredProduct =
    productsContent.products.find((p) => p.slug === home.featuredProductSlug) ||
    productsContent.products.find((p) => p.featured) ||
    productsContent.products[0];

  const [activeImage, setActiveImage] = useState(0);

  if (!featuredProduct) return null;

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="urunler">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
      <div className="container-custom relative">
        <FadeIn>
          <SectionHeading
            badge="İmza Ürünümüz"
            title={featuredProduct.name}
            subtitle={featuredProduct.shortDescription}
          />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative">
              <div className="relative aspect-square rounded-[var(--radius-bubble)] overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 shadow-[var(--shadow-card)]">
                <Image
                  src={featuredProduct.gallery[activeImage]}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-brand-yellow text-text-primary text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  En Çok Satan
                </div>
              </div>

              <div className="flex gap-3 mt-4 justify-center">
                {featuredProduct.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? "border-brand-blue scale-105 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Ürün görseli ${i + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                {featuredProduct.colors.map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full ${colorMap[color]} shadow-sm border-2 border-white`}
                  />
                ))}
              </div>

              <h3 className="font-display text-3xl font-bold text-text-primary mb-2">
                {featuredProduct.name}
              </h3>
              <p className="text-2xl font-bold text-brand-blue mb-4">{featuredProduct.price}</p>
              <p className="text-text-secondary leading-relaxed mb-6">
                {featuredProduct.description}
              </p>

              <ul className="space-y-3 mb-8">
                {featuredProduct.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3 text-text-primary">
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-brand-green" />
                    </div>
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/urunler" variant="primary" size="lg">
                  Detaylı İncele
                </Button>
                <Button href="/katalog" variant="outline" size="lg">
                  Katalog İndir
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
