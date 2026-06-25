export const siteConfig = {
  name: "Köpük Dünyası",
  description:
    "Köpüklerle dolu bir eğlence dünyası. Üfle, baloncukları oluştur ve eğlenceyi başlat.",
  url: "https://kopukdunyasi.com",
  ogImage: "/og-image.jpg",
  links: {
    instagram: "https://instagram.com/kopukdunyasi",
    facebook: "https://facebook.com/kopukdunyasi",
    youtube: "https://youtube.com/kopukdunyasi",
    tiktok: "https://tiktok.com/@kopukdunyasi",
  },
  contact: {
    email: "destek@kopukdunyasi.com",
    phone: "+90 (262) 606 10 51",
    whatsapp: "+90 (262) 606 10 51",
    address: "Beylikbağı, 343. Sk. No:4, 41420 Gebze/Kocaeli",
  },
};

export const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/katalog", label: "Katalog" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const features = [
  {
    icon: "shield",
    title: "Güvenli Malzeme",
    description:
      "CE sertifikalı, BPA içermeyen, çocuk sağlığına uygun premium malzemelerle üretilmiştir.",
    color: "blue" as const,
  },
  {
    icon: "sparkles",
    title: "Eğlenceli Deneyim",
    description:
      "Renkli köpük baloncukları ile saatlerce kesintisiz eğlence ve yaratıcı oyun deneyimi.",
    color: "green" as const,
  },
  {
    icon: "heart",
    title: "Çocuk Dostu Tasarım",
    description:
      "Ergonomik tutuş, yumuşak kenarlar ve canlı renklerle çocukların seveceği bir tasarım.",
    color: "yellow" as const,
  },
  {
    icon: "award",
    title: "Kaliteli Üretim",
    description:
      "ISO 9001 sertifikalı tesislerde, titiz kalite kontrol süreçleriyle üretilmektedir.",
    color: "red" as const,
  },
] as const;

export const howItWorksSteps = [
  {
    step: 1,
    title: "Aç",
    description: "Ürünü ambalajından çıkarın ve hazır hale getirin.",
    icon: "package-open",
    color: "blue" as const,
  },
  {
    step: 2,
    title: "Üfle",
    description: "Tüpün ucuna nazikçe üfleyin ve renkli baloncukları izleyin.",
    icon: "wind",
    color: "green" as const,
  },
  {
    step: 3,
    title: "Eğlen",
    description: "Arkadaşlarınızla birlikte sihirli köpük dünyasının keyfini çıkarın!",
    icon: "party-popper",
    color: "yellow" as const,
  },
] as const;

export const testimonials = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "Anne, 2 çocuk",
    content:
      "Çocuklarım bu ürünü çok sevdi! Güvenli malzemesi ve kolay kullanımı sayesinde gönül rahatlığıyla oynuyorlar. Kesinlikle tavsiye ederim.",
    rating: 5,
    avatar: "AY",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    role: "Baba, 1 çocuk",
    content:
      "Doğum günü partisinde tüm çocuklar büyük ilgi gösterdi. Kaliteli üretim ve dayanıklı yapısı ile uzun süre kullanılabiliyor.",
    rating: 5,
    avatar: "MK",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    role: "Anaokulu Öğretmeni",
    content:
      "Sınıfımızda en çok tercih ettiğimiz oyuncaklardan biri. Çocukların motor becerilerini geliştirirken eğlenmelerini sağlıyor.",
    rating: 5,
    avatar: "ZD",
  },
  {
    id: 4,
    name: "Can Öztürk",
    role: "Baba, 3 çocuk",
    content:
      "Üç çocuğum da farklı yaşlarda ama hepsi aynı anda oynayabiliyor. Fiyat-performans açısından mükemmel bir ürün.",
    rating: 5,
    avatar: "CÖ",
  },
] as const;

export const products = [
  {
    id: "kopuk-tupu-klasik",
    name: "Köpük Tüpü Klasik",
    slug: "kopuk-tupu-klasik",
    description:
      "Köpük Dünyası'nın imza ürünü. Üflediğinizde renkli sabun köpüğü baloncukları oluşturan eğlenceli tüp.",
    shortDescription: "Renkli köpük baloncukları oluşturan eğlenceli tüp",
    price: "₺149,90",
    featured: true,
    image: "/products/product1-1.jpg",
    gallery: [
      "/products/product1-1.jpg",
      "/products/product1-2.jpg",
      "/products/product1-3.jpg",
      "/products/product1-4.jpg",
    ],
    highlights: [
      "CE sertifikalı güvenli malzeme",
      "3+ yaş için uygun",
      "Ergonomik tutuş tasarımı",
      "Yıkanabilir ve tekrar kullanılabilir",
      "Canlı renk seçenekleri",
    ],
    specifications: {
      "Yaş Grubu": "3+",
      "Malzeme": "BPA içermeyen plastik",
      "Boyut": "15 x 4 cm",
      "Ağırlık": "85g",
      "Renk Seçenekleri": "Mavi, Yeşil, Sarı, Kırmızı",
      "Sertifikalar": "CE, ISO 9001",
      "Menşei": "Türkiye",
    },
    colors: ["blue", "green", "yellow", "red"],
  },
  {
    id: "kopuk-tupu-mega",
    name: "Köpük Tüpü Mega",
    slug: "kopuk-tupu-mega",
    description: "Daha büyük baloncuklar için mega boy köpük tüpü. Partiler için ideal!",
    shortDescription: "Mega boy baloncuklar için ideal",
    price: "₺199,90",
    featured: false,
    image: "/products/product1-2.jpg",
    gallery: [
      "/products/product1-2.jpg",
    ],
    highlights: ["Mega boy baloncuklar", "Parti seti uyumlu"],
    specifications: {
      "Yaş Grubu": "4+",
      "Boyut": "20 x 5 cm",
    },
    colors: ["blue", "green"],
  },
  {
    id: "kopuk-parti-seti",
    name: "Köpük Parti Seti",
    slug: "kopuk-parti-seti",
    description: "6 adet köpük tüpü ve parti aksesuarları içeren komple set.",
    shortDescription: "6'lı parti seti",
    price: "₺599,90",
    featured: false,
    image: "/products/product1-3.jpg",
    gallery: [
      "/products/product1-3.jpg",
    ],
    highlights: ["6 adet tüp", "Parti dekorasyonu dahil"],
    specifications: {
      "İçerik": "6 tüp + aksesuarlar",
    },
    colors: ["blue", "green", "yellow", "red"],
  },
] as const;

export const faqItems = [
  {
    question: "Ürün hangi yaş grubu için uygundur?",
    answer:
      "Köpük Tüpü Klasik, 3 yaş ve üzeri çocuklar için tasarlanmıştır. Küçük parçalar içermediği için güvenle kullanılabilir.",
  },
  {
    question: "Malzemeler güvenli mi?",
    answer:
      "Evet, tüm ürünlerimiz CE sertifikalıdır ve BPA içermeyen, çocuk sağlığına uygun malzemelerle üretilmektedir.",
  },
  {
    question: "Nasıl temizlenir?",
    answer:
      "Ürün ılık su ve hafif sabunla kolayca temizlenebilir. Kuruduktan sonra tekrar kullanıma hazırdır.",
  },
  {
    question: "Toplu sipariş verebilir miyim?",
    answer:
      "Evet, distribütörler ve perakendeciler için özel fiyatlandırma sunuyoruz. Katalog sayfamızdan veya iletişim formundan bize ulaşabilirsiniz.",
  },
  {
    question: "Kargo süresi ne kadar?",
    answer:
      "Türkiye genelinde 2-4 iş günü içinde teslimat yapılmaktadır. 500₺ üzeri siparişlerde kargo ücretsizdir.",
  },
] as const;

export const aboutValues = [
  {
    title: "Güvenlik",
    description: "Çocukların sağlığı ve güvenliği her şeyin önünde gelir.",
    icon: "shield-check",
    color: "blue" as const,
  },
  {
    title: "Yaratıcılık",
    description: "Hayal gücünü harekete geçiren, ilham veren ürünler tasarlarız.",
    icon: "lightbulb",
    color: "yellow" as const,
  },
  {
    title: "Kalite",
    description: "Her üründe en yüksek kalite standartlarını hedefleriz.",
    icon: "gem",
    color: "green" as const,
  },
  {
    title: "Mutluluk",
    description: "Çocukların gülümsemesi bizim en büyük motivasyonumuzdur.",
    icon: "smile",
    color: "red" as const,
  },
] as const;

export const catalogSections = [
  {
    title: "Köpük Tüpü Klasik",
    pages: "4-8",
    description: "Ana ürün tanıtımı, özellikler ve teknik bilgiler",
  },
  {
    title: "Ürün Ailesi",
    pages: "9-14",
    description: "Tüm ürün gamı ve varyantlar",
  },
  {
    title: "Güvenlik & Sertifikalar",
    pages: "15-18",
    description: "CE, ISO sertifikaları ve test raporları",
  },
  {
    title: "Distribütör Bilgileri",
    pages: "19-22",
    description: "Fiyatlandırma, minimum sipariş ve lojistik",
  },
] as const;
