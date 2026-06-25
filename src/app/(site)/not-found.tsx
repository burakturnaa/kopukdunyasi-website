import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🫧</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Button href="/" variant="primary" size="lg">
          Anasayfaya Dön
        </Button>
      </div>
    </section>
  );
}
