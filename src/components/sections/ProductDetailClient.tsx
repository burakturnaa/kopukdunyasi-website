"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Star } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { products as fallbackProducts, faqItems as fallbackFaq } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCms } from "@/components/providers/CmsProvider";

const colorMap: Record<string, string> = {
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  yellow: "bg-brand-yellow",
  red: "bg-brand-red",
};

interface ProductDetailClientProps {
  slug: string;
}

export function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const { products: productsContent } = useCms();
  const products = productsContent.products;
  const faqItems = productsContent.faq.length ? productsContent.faq : fallbackFaq;
  const product = products.find((p) => p.slug === slug) ?? fallbackProducts.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="section-padding bg-white pt-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <FadeIn direction="left">
              <div>
                <div className="relative aspect-square rounded-[var(--radius-bubble)] overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 shadow-[var(--shadow-card)]">
                  <Image
                    src={product.gallery[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-brand-yellow text-text-primary text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Öne Çıkan
                    </div>
                  )}
                </div>
                {product.gallery.length > 1 && (
                  <div className="flex gap-3 mt-4">
                    {product.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={cn(
                          "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                          activeImage === i
                            ? "border-brand-blue scale-105"
                            : "border-transparent opacity-60 hover:opacity-100"
                        )}
                        aria-label={`Görsel ${i + 1}`}
                      >
                        <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div>
                <div className="flex gap-2 mb-4">
                  {product.colors.map((c) => (
                    <div
                      key={c}
                      className={cn("w-8 h-8 rounded-full border-2 border-white shadow-sm", colorMap[c])}
                    />
                  ))}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-brand-blue mb-6">{product.price}</p>
                <p className="text-text-secondary leading-relaxed mb-8">{product.description}</p>

                <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                  Öne Çıkan Özellikler
                </h3>
                <ul className="space-y-3 mb-8">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-brand-green" />
                      </div>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button href="/iletisim" variant="primary" size="lg">
                    Sipariş Ver
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

      <section className="section-padding bg-gradient-to-b from-white to-blue-50/30">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-text-primary text-center mb-8">
              Teknik Özellikler
            </h2>
            <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div
                  key={key}
                  className={cn(
                    "flex justify-between items-center px-6 py-4",
                    index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                  )}
                >
                  <span className="font-medium text-text-primary">{key}</span>
                  <span className="text-text-secondary">{value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <FAQSection items={faqItems} />
      <CTASection />
    </>
  );
}
