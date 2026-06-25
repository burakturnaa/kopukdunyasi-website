"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminNavItems } from "@/lib/admin-nav";
import type { AdminNavKey } from "@/lib/admin-nav";

const navIcons: Record<AdminNavKey, React.ReactNode> = {
  global: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  home: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  about: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  products: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  catalog: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  contact: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  mesajlar: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  sifre: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
};

const contentNavKeys: AdminNavKey[] = ["global", "home", "about", "products", "catalog", "contact"];
const systemNavKeys: AdminNavKey[] = ["mesajlar", "sifre"];
const SIDEBAR_COLLAPSED_KEY = "admin-sidebar-collapsed";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function NavSection({
  label,
  keys,
  pathname,
  collapsed,
  onNavigate,
}: {
  label: string;
  keys: AdminNavKey[];
  pathname: string;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const items = adminNavItems.filter((item) => keys.includes(item.key));
  return (
    <div>
      {!collapsed && (
        <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">{label}</p>
      )}
      {collapsed && <div className="h-2" aria-hidden />}
      <nav className="space-y-0.5 px-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.key}
              className={`flex items-center rounded-xl text-sm font-medium transition-all duration-200 ${
                collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
              } ${
                active
                  ? "bg-white text-primary shadow-lg shadow-black/10"
                  : "text-white/65 hover:text-white hover:bg-white/10"
              }`}
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
            >
              <span className={active ? "text-secondary" : "text-white/45"}>{navIcons[item.key]}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isDesktop = useIsDesktop();
  const sidebarCollapsed = collapsed && isDesktop;

  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (saved === "true") setCollapsed(true);
  }, []);

  const currentPage = adminNavItems.find((item) => item.href === pathname);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#eef1f6] flex">
      {mobileOpen && (
        <button
          className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          type="button"
          aria-label="Menüyü kapat"
        />
      )}

      <aside
        className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50 flex h-screen flex-col transform transition-all duration-300 ease-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } w-[280px] ${sidebarCollapsed ? "lg:w-[72px]" : "lg:w-[280px]"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a] via-[#0f2236] to-[#1a5bb8]" />
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_30%_20%,#2b7de9_0%,transparent_50%)]" />

        <div className={`relative shrink-0 border-b border-white/10 ${sidebarCollapsed ? "lg:p-3 lg:flex lg:justify-center" : "p-6"}`}>
          <Link className={`block group ${sidebarCollapsed ? "lg:flex lg:justify-center" : ""}`} href="/admin/home" title={sidebarCollapsed ? "Köpük Dünyası CMS" : undefined}>
            <div className={`flex items-center ${sidebarCollapsed ? "lg:justify-center" : "gap-3"}`}>
              <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0 overflow-hidden">
                <Image alt="Köpük Dünyası" className="object-contain p-1" height={32} src="/logo.png" width={32} />
              </div>
              <div className={sidebarCollapsed ? "lg:hidden" : ""}>
                <span className="font-bold text-white text-base tracking-tight block">Köpük Dünyası CMS</span>
                <p className="text-[11px] text-white/40 group-hover:text-white/55 transition-colors">İçerik Yönetimi</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-4 space-y-5">
          <NavSection collapsed={sidebarCollapsed} keys={contentNavKeys} label="Sayfalar" onNavigate={() => setMobileOpen(false)} pathname={pathname} />
          <NavSection collapsed={sidebarCollapsed} keys={systemNavKeys} label="Sistem" onNavigate={() => setMobileOpen(false)} pathname={pathname} />
        </div>

        <div className={`relative shrink-0 border-t border-white/10 space-y-1 ${sidebarCollapsed ? "lg:p-2 p-4" : "p-4"}`}>
          <Link
            className={`flex items-center text-sm text-white/55 hover:text-white rounded-xl hover:bg-white/10 transition-all ${
              sidebarCollapsed ? "lg:justify-center lg:p-2.5 gap-2.5 px-3 py-2.5" : "gap-2.5 px-3 py-2.5"
            }`}
            href="/"
            target="_blank"
            title={sidebarCollapsed ? "Siteyi Görüntüle" : undefined}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            </svg>
            <span className={sidebarCollapsed ? "lg:hidden" : ""}>Siteyi Görüntüle</span>
          </Link>
          <button
            className={`w-full flex items-center text-sm text-red-300/80 hover:text-red-200 rounded-xl hover:bg-red-500/10 transition-all ${
              sidebarCollapsed ? "lg:justify-center lg:p-2.5 gap-2.5 px-3 py-2.5" : "gap-2.5 px-3 py-2.5"
            }`}
            onClick={logout}
            type="button"
            title={sidebarCollapsed ? "Çıkış Yap" : undefined}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            </svg>
            <span className={sidebarCollapsed ? "lg:hidden" : ""}>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button className="lg:hidden p-2 -ml-1 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors" onClick={() => setMobileOpen(true)} type="button" aria-label="Menü">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeWidth={2} />
              </svg>
            </button>
            <button className="hidden lg:flex p-2 -ml-1 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors" onClick={toggleCollapsed} type="button" aria-label={sidebarCollapsed ? "Menüyü genişlet" : "Menüyü daralt"}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeWidth={2} />
              </svg>
            </button>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
                {currentPage ? currentPage.label : "Köpük Dünyası CMS"}
              </h2>
            </div>
          </div>
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary px-3 sm:px-4 py-2 rounded-xl border border-slate-200 hover:border-secondary/30 bg-white hover:bg-secondary/5 transition-all shrink-0" href="/" target="_blank">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            </svg>
            <span className="hidden sm:inline">Siteyi Gör</span>
          </Link>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
