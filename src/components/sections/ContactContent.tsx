"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/components/providers/CmsProvider";

export function ContactContent() {
  const { global, contact: contactPage } = useCms();
  const contact = global.contact;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          subject: formState.subject,
          message: formState.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch {
      // silently fail for now
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <FadeIn direction="left" className="lg:col-span-3">
              <Card glass className="!p-8 md:!p-10">
                <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                  {contactPage.formTitle}
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                      Mesajınız Gönderildi!
                    </h3>
                    <p className="text-text-secondary">
                      En kısa sürede size dönüş yapacağız.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm"
                          placeholder="Adınız Soyadınız"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm"
                          placeholder="ornek@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1.5">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm"
                          placeholder="05XX XXX XX XX"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-1.5">
                          Konu *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm bg-white"
                        >
                          <option value="">Konu seçin</option>
                          <option value="genel">Genel Bilgi</option>
                          <option value="siparis">Sipariş</option>
                          <option value="bayilik">Bayilik / Distribütörlük</option>
                          <option value="destek">Müşteri Desteği</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
                        Mesajınız *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                      <Send className="w-5 h-5" />
                      Mesaj Gönder
                    </Button>
                  </form>
                )}
              </Card>
            </FadeIn>

            <FadeIn direction="right" delay={0.2} className="lg:col-span-2 space-y-6">
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="!p-6 bg-gradient-to-r from-green-500 to-green-600 !text-white border-0 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">WhatsApp ile Yazın</p>
                      <p className="text-white/80 text-sm">Hızlı yanıt alın</p>
                    </div>
                  </div>
                </Card>
              </a>

              <Card className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">E-posta</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-brand-blue hover:underline text-sm"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Telefon</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-brand-blue hover:underline text-sm"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-yellow-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Adres</p>
                    <p className="text-text-secondary text-sm">{contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Çalışma Saatleri</p>
                    <p className="text-text-secondary text-sm">{contactPage.hoursWeekday}</p>
                    <p className="text-text-secondary text-sm">{contactPage.hoursSaturday}</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-white to-blue-50/30 pt-0">
        <div className="container-custom">
          <FadeIn>
            <div className="rounded-[var(--radius-bubble)] overflow-hidden shadow-[var(--shadow-card)] h-[400px] md:h-[500px]">
              <iframe
                title="Köpük Dünyası Konum"
                src={contact.mapEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
