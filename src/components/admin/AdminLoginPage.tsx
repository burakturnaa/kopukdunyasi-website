"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminLoginPageProps = {
  logoUrl: string;
  logoAlt: string;
};

function BrandLogo({ logoUrl, logoAlt }: { logoUrl: string; logoAlt: string }) {
  return (
    <Image
      alt={logoAlt}
      className="h-12 w-auto object-contain"
      height={48}
      priority
      src={logoUrl}
      width={140}
    />
  );
}

export function AdminLoginPage({ logoUrl, logoAlt }: AdminLoginPageProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Giriş başarısız");
        return;
      }
      router.push("/admin/home");
      router.refresh();
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden">
        <Image
          alt=""
          className="object-cover opacity-25"
          fill
          src="https://images.unsplash.com/photo-1530549387789-4d101d2665eb?w=1200&q=80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#0d1b2a]/95 to-[#2b7de9]/40" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              İçerik Yönetim
              <br />
              <span className="text-[#5fd99a]">Paneli</span>
            </h2>
            <p className="text-white/60 text-lg max-w-md leading-relaxed">
              Köpük Dünyası web sitenizin tüm içeriklerini tek bir yerden yönetin. Ürünler, görseller ve iletişim bilgileri anında güncellensin.
            </p>
          </div>
          <div className="space-y-4">
            {[
              "Tüm sayfa içeriklerini düzenleyin",
              "Ürün kataloğunu yönetin",
              "Değişiklikler anında yayına girsin",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/70 text-sm">
                <div className="w-5 h-5 rounded-full bg-secondary/30 border border-secondary/50 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-[#5fd99a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
                  </svg>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-3 shadow-sm border border-slate-200 mb-5">
              <BrandLogo logoAlt={logoAlt} logoUrl={logoUrl} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Hoş Geldiniz</h1>
            <p className="text-slate-500 text-sm mt-1">Yönetim paneline erişmek için giriş yapın</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                  E-posta Adresi
                </label>
                <input
                  autoComplete="email"
                  className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:bg-white transition-all"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kopukdunyasi.com"
                  required
                  type="email"
                  value={email}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    autoComplete="current-password"
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary focus:bg-white transition-all"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors text-sm"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  >
                    {showPassword ? "Gizle" : "Göster"}
                  </button>
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}
              <button
                className="w-full py-3.5 bg-secondary hover:bg-primary text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-secondary/20"
                disabled={loading}
                type="submit"
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </form>
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">
            <Link className="hover:text-secondary transition-colors" href="/">
              ← Ana siteye dön
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
