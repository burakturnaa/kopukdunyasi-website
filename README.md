# Köpük Dünyası

Premium multi-page website for Köpük Dünyası — a Turkish toy brand featuring colorful soap bubble toys.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Three.js** + React Three Fiber (floating bubble hero)
- **GSAP** + ScrollTrigger (scroll animations)
- **Lenis** (smooth scrolling)
- **Framer Motion** (UI transitions)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, product showcase, how it works, testimonials |
| `/hakkimizda` | Brand story, mission, vision, values |
| `/urunler` | Product grid with featured product |
| `/urunler/[slug]` | Product detail pages |
| `/katalog` | Catalog download & B2B distributor info |
| `/iletisim` | Contact form, WhatsApp CTA, map |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── animations/   # GSAP FadeIn, Counter, Parallax
│   ├── layout/       # Navbar, Footer
│   ├── providers/    # Lenis smooth scroll
│   ├── sections/     # Page sections
│   ├── three/        # Three.js bubble scene
│   └── ui/           # Reusable UI components
└── lib/              # Constants, utilities
```

## CMS Admin Panel

Admin panel: **http://localhost:3000/admin/login**

Default credentials (after seed):
- Email: `admin@kopukdunyasi.com`
- Password: `admin12345`

### Database setup

```bash
cp .env.example .env
npm run db:up          # PostgreSQL via Docker (port 5435)
npm run db:setup       # prisma db push + seed
```

### Admin routes

| URL | Sayfa |
|-----|-------|
| `/admin/login` | Giriş |
| `/admin/global` | Genel Ayarlar |
| `/admin/home` | Anasayfa |
| `/admin/about` | Hakkımızda |
| `/admin/products` | Ürünler |
| `/admin/catalog` | Katalog |
| `/admin/contact` | İletişim |
| `/admin/mesajlar` | Mesajlar |
| `/admin/sifre` | Şifre Değiştir |

