"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/components/providers/CmsProvider";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  yellow: "bg-brand-yellow",
  red: "bg-brand-red",
};

export function ProductGrid() {
  const { products: productsContent } = useCms();
  const products = productsContent.products;
  const featured = products.find((p) => p.featured);
  const others = products.filter((p) => !p.featured);

  return (
    <>
      {featured && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <FadeIn>
              <SectionHeading
                badge="Öne Çıkan Ürün"
                title={featured.name}
                subtitle={featured.shortDescription}
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid lg:grid-cols-2 gap-12 items-center rounded-[var(--radius-bubble)] bg-gradient-to-br from-blue-50 to-green-50 p-8 md:p-12">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-brand-yellow text-text-primary text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Öne Çıkan
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 mb-4">
                    {featured.colors.map((c) => (
                      <div
                        key={c}
                        className={cn("w-6 h-6 rounded-full border-2 border-white shadow-sm", colorMap[c])}
                      />
                    ))}
                  </div>
                  <h3 className="font-display text-3xl font-bold text-text-primary mb-2">
                    {featured.name}
                  </h3>
                  <p className="text-2xl font-bold text-brand-blue mb-4">{featured.price}</p>
                  <p className="text-text-secondary leading-relaxed mb-6">{featured.description}</p>
                  <ul className="space-y-2 mb-8">
                    {featured.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-text-primary">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Button href={`/urunler/${featured.slug}`} variant="primary" size="lg">
                    Detaylı İncele
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="section-padding bg-gradient-to-b from-white to-blue-50/30">
        <div className="container-custom">
          <FadeIn>
            <SectionHeading
              badge="Tüm Ürünler"
              title="Ürün Ailemiz"
              subtitle="Gelecekte daha fazla ürünle büyümeye devam ediyoruz"
            />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.1}>
                <Link href={`/urunler/${product.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden !p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-brand-blue transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-text-secondary text-sm mb-3">{product.shortDescription}</p>
                      <p className="text-lg font-bold text-brand-blue">{product.price}</p>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
