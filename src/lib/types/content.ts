export type ContentSectionKey =
  | "global"
  | "home"
  | "about"
  | "products"
  | "catalog"
  | "contact";

export type GlobalContent = {
  siteName: string;
  logoUrl: string;
  logoAlt: string;
  faviconUrl: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  footerDescription: string;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    mapEmbed: string;
  };
};

export type HeroContent = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  trustBadges: string[];
};

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  color: string;
};

export type HowItWorksItem = {
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
};

export type StatItem = {
  end: number;
  suffix: string;
  prefix: string;
  label: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
};

export type CtaContent = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
};

export type HomeContent = {
  hero: HeroContent;
  featuredProductSlug: string;
  features: FeatureItem[];
  howItWorks: HowItWorksItem[];
  stats: StatItem[];
  testimonials: TestimonialItem[];
  cta: CtaContent;
};

export type AboutValue = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export type AboutContent = {
  hero: { badge: string; title: string; subtitle: string };
  story: { paragraphs: string[]; image: string };
  mission: { title: string; text: string };
  vision: { title: string; text: string };
  values: AboutValue[];
  banner: { title: string; subtitle: string };
};

export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: string;
  featured: boolean;
  image: string;
  gallery: string[];
  highlights: string[];
  specifications: Record<string, string>;
  colors: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProductsContent = {
  pageHero: { badge: string; title: string; subtitle: string };
  products: ProductItem[];
  faq: FaqItem[];
};

export type CatalogSection = {
  title: string;
  pages: string;
  description: string;
};

export type CatalogContent = {
  pageHero: { badge: string; title: string; subtitle: string };
  catalog: {
    title: string;
    description: string;
    pdfUrl: string;
    lastUpdated: string;
    sections: CatalogSection[];
  };
  b2bCards: { title: string; description: string }[];
  b2bCta: { title: string; description: string };
};

export type ContactContent = {
  pageHero: { badge: string; title: string; subtitle: string };
  formTitle: string;
  hoursWeekday: string;
  hoursSaturday: string;
};

export type SiteContent = {
  global: GlobalContent;
  home: HomeContent;
  about: AboutContent;
  products: ProductsContent;
  catalog: CatalogContent;
  contact: ContactContent;
};
