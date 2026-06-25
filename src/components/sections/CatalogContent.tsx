"use client";

import { useState } from "react";
import { Download, FileText, Building2, Truck, Phone, Mail } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/components/providers/CmsProvider";

const b2bIcons = [Building2, Truck, Phone];

export function CatalogContent() {
  const { catalog, global } = useCms();
  const { catalog: catalogData, b2bCards, b2bCta } = catalog;
  const contact = global.contact;
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (catalogData.pdfUrl) {
      window.open(catalogData.pdfUrl, "_blank");
      return;
    }
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="aspect-[3/4] rounded-[var(--radius-bubble)] bg-gradient-to-br from-brand-blue/10 via-brand-green/10 to-brand-yellow/10 border border-gray-100 shadow-[var(--shadow-card)] flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <FileText className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                      {catalogData.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-1">PDF Format</p>
                    <p className="text-text-muted text-xs">Son güncelleme: {catalogData.lastUpdated}</p>

                    <div className="mt-8 space-y-2">
                      {catalogData.sections.map((section, i) => (
                        <div
                          key={section.title}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/60 text-left text-sm"
                        >
                          <span className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-medium text-text-primary">{section.title}</p>
                            <p className="text-text-muted text-xs">Sayfa {section.pages}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-yellow/20 rounded-full blur-2xl" />
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <SectionHeading
                badge="Katalog"
                title="Ürün Kataloğumuz"
                subtitle={catalogData.description}
                align="left"
              />

              <div className="space-y-4 mb-8">
                {catalogData.sections.map((section) => (
                  <div key={section.title} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <FileText className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary">{section.title}</p>
                      <p className="text-sm text-text-secondary">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleDownload}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Download className="w-5 h-5" />
                {downloading ? "İndiriliyor..." : "Katalogu İndir (PDF)"}
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container-custom">
          <FadeIn>
            <SectionHeading
              badge="B2B"
              title="Distribütör Bilgileri"
              subtitle="Perakendeciler ve distribütörler için özel fırsatlar"
            />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {b2bCards.map((card, index) => {
              const Icon = b2bIcons[index] ?? Building2;
              return (
              <FadeIn key={card.title} delay={(index + 1) * 0.1}>
                <Card className="text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-brand-blue" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3">{card.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{card.description}</p>
                </Card>
              </FadeIn>
            );})}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-12 p-8 md:p-12 rounded-[var(--radius-bubble)] bg-text-primary text-white text-center">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">{b2bCta.title}</h3>
              <p className="text-white/70 mb-6 max-w-xl mx-auto">{b2bCta.description}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/iletisim" variant="white" size="lg">
                  <Mail className="w-5 h-5" />
                  İletişime Geç
                </Button>
                <Button
                  href={`tel:${contact.phone}`}
                  variant="ghost"
                  size="lg"
                  className="text-white border-2 border-white/30 hover:bg-white/10"
                >
                  <Phone className="w-5 h-5" />
                  {contact.phone}
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
