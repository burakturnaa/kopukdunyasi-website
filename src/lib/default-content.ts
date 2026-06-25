import type { SiteContent } from "./types/content";

export const defaultContent: SiteContent = {
  global: {
    siteName: "Köpük Dünyası",
    logoUrl: "/logo.png",
    logoAlt: "Köpük Dünyası",
    faviconUrl: "/logo.png",
    seoTitle: "Köpük Dünyası | Köpüklerle Dolu Bir Eğlence Dünyası",
    seoDescription:
      "Üfle, baloncukları oluştur ve eğlenceyi başlat. Köpük Dünyası ile renkli sabun köpüğü baloncukları oluşturan eğlenceli oyuncaklar.",
    ogImage: "/logo.png",
    footerDescription:
      "Köpüklerle dolu bir eğlence dünyası. Çocukların hayal gücünü harekete geçiren, güvenli ve kaliteli oyuncaklar.",
    social: {
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
      mapEmbed:
        "https://maps.google.com/maps?q=Beylikbağı+343.+Sk.+No:4+Gebze+Kocaeli&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
  },
  home: {
    hero: {
      badge: "Yeni Nesil Oyuncak Deneyimi",
      titleLine1: "Köpüklerle Dolu",
      titleLine2: "Bir Eğlence Dünyası",
      subtitle: "Üfle, baloncukları oluştur ve eğlenceyi başlat.",
      primaryCtaLabel: "Ürünleri İncele",
      primaryCtaHref: "/urunler",
      secondaryCtaLabel: "Katalog İndir",
      secondaryCtaHref: "/katalog",
      trustBadges: ["CE Sertifikalı", "3+ Yaş", "Türk Malı"],
    },
    featuredProductSlug: "kopuk-tupu-klasik",
    features: [
      {
        icon: "shield",
        title: "Güvenli Malzeme",
        description:
          "CE sertifikalı, BPA içermeyen, çocuk sağlığına uygun premium malzemelerle üretilmiştir.",
        color: "blue",
      },
      {
        icon: "sparkles",
        title: "Eğlenceli Deneyim",
        description:
          "Renkli köpük baloncukları ile saatlerce kesintisiz eğlence ve yaratıcı oyun deneyimi.",
        color: "green",
      },
      {
        icon: "heart",
        title: "Çocuk Dostu Tasarım",
        description:
          "Ergonomik tutuş, yumuşak kenarlar ve canlı renklerle çocukların seveceği bir tasarım.",
        color: "yellow",
      },
      {
        icon: "award",
        title: "Kaliteli Üretim",
        description:
          "ISO 9001 sertifikalı tesislerde, titiz kalite kontrol süreçleriyle üretilmektedir.",
        color: "red",
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Aç",
        description: "Ürünü ambalajından çıkarın ve hazır hale getirin.",
        icon: "package-open",
        color: "blue",
      },
      {
        step: 2,
        title: "Üfle",
        description: "Tüpün ucuna nazikçe üfleyin ve renkli baloncukları izleyin.",
        icon: "wind",
        color: "green",
      },
      {
        step: 3,
        title: "Eğlen",
        description: "Arkadaşlarınızla birlikte sihirli köpük dünyasının keyfini çıkarın!",
        icon: "party-popper",
        color: "yellow",
      },
    ],
    stats: [
      { end: 50, suffix: "K+", prefix: "", label: "Mutlu Çocuk" },
      { end: 500, suffix: "+", prefix: "", label: "Satış Noktası" },
      { end: 15, suffix: "+", prefix: "", label: "Yıllık Deneyim" },
      { end: 99, suffix: "%", prefix: "", label: "Memnuniyet" },
    ],
    testimonials: [
      {
        id: "1",
        name: "Ayşe Yılmaz",
        role: "Anne, 2 çocuk",
        content:
          "Çocuklarım bu ürünü çok sevdi! Güvenli malzemesi ve kolay kullanımı sayesinde gönül rahatlığıyla oynuyorlar.",
        rating: 5,
        avatar: "AY",
      },
      {
        id: "2",
        name: "Mehmet Kaya",
        role: "Baba, 1 çocuk",
        content:
          "Doğum günü partisinde tüm çocuklar büyük ilgi gösterdi. Kaliteli üretim ve dayanıklı yapısı ile uzun süre kullanılabiliyor.",
        rating: 5,
        avatar: "MK",
      },
      {
        id: "3",
        name: "Zeynep Demir",
        role: "Anaokulu Öğretmeni",
        content:
          "Sınıfımızda en çok tercih ettiğimiz oyuncaklardan biri. Çocukların motor becerilerini geliştirirken eğlenmelerini sağlıyor.",
        rating: 5,
        avatar: "ZD",
      },
      {
        id: "4",
        name: "Can Öztürk",
        role: "Baba, 3 çocuk",
        content:
          "Üç çocuğum da farklı yaşlarda ama hepsi aynı anda oynayabiliyor. Fiyat-performans açısından mükemmel bir ürün.",
        rating: 5,
        avatar: "CÖ",
      },
    ],
    cta: {
      title: "Katalogumuzu İndirin",
      description:
        "Tüm ürünlerimizi, teknik özellikleri ve distribütör bilgilerini içeren kapsamlı kataloğumuzu hemen indirin.",
      primaryLabel: "Katalog İndir",
      secondaryLabel: "İletişime Geç",
    },
  },
  about: {
    hero: {
      badge: "Hakkımızda",
      title: "Köpük Dünyası'nın Hikayesi",
      subtitle: "2010'dan bu yana çocukların gülümsemesi için çalışıyoruz",
    },
    story: {
      paragraphs: [
        "Köpük Dünyası, 2010 yılında İstanbul'da kurulmuş, çocukların hayal gücünü harekete geçiren yenilikçi oyuncaklar üreten bir Türk markasıdır.",
        "Kurucularımız, kendi çocuklarının oyun saatlerinde yaşadığı saf mutluluktan ilham alarak, güvenli, kaliteli ve eğlenceli ürünler geliştirmeye karar verdiler.",
        "Bugün 500'den fazla satış noktasında, 50.000'den fazla mutlu çocuğa ulaşmış durumdayız.",
      ],
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    },
    mission: {
      title: "Misyonumuz",
      text: "Çocukların güvenle oynayabileceği, hayal güçlerini geliştiren ve onlara saf mutluluk yaşatan yenilikçi oyuncaklar üretmek.",
    },
    vision: {
      title: "Vizyonumuz",
      text: "Türkiye'nin ve bölgenin en güvenilir çocuk oyuncağı markası olmak.",
    },
    values: [
      {
        title: "Güvenlik",
        description: "Çocukların sağlığı ve güvenliği her şeyin önünde gelir.",
        icon: "shield-check",
        color: "blue",
      },
      {
        title: "Yaratıcılık",
        description: "Hayal gücünü harekete geçiren, ilham veren ürünler tasarlarız.",
        icon: "lightbulb",
        color: "yellow",
      },
      {
        title: "Kalite",
        description: "Her üründe en yüksek kalite standartlarını hedefleriz.",
        icon: "gem",
        color: "green",
      },
      {
        title: "Mutluluk",
        description: "Çocukların gülümsemesi bizim en büyük motivasyonumuzdur.",
        icon: "smile",
        color: "red",
      },
    ],
    banner: {
      title: "Çocukların Gülümsemesi Bizim Motivasyonumuz",
      subtitle: "Her gün daha fazla çocuğa ulaşmak için çalışıyoruz.",
    },
  },
  products: {
    pageHero: {
      badge: "Ürünler",
      title: "Ürün Ailemiz",
      subtitle: "Her biri özenle tasarlanmış, güvenli ve eğlenceli oyuncaklar",
    },
    products: [
      {
        id: "kopuk-tupu-klasik",
        slug: "kopuk-tupu-klasik",
        name: "Köpük Tüpü Klasik",
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
          Malzeme: "BPA içermeyen plastik",
          Boyut: "15 x 4 cm",
          Ağırlık: "85g",
          "Renk Seçenekleri": "Mavi, Yeşil, Sarı, Kırmızı",
          Sertifikalar: "CE, ISO 9001",
          Menşei: "Türkiye",
        },
        colors: ["blue", "green", "yellow", "red"],
      },
      {
        id: "kopuk-tupu-mega",
        slug: "kopuk-tupu-mega",
        name: "Köpük Tüpü Mega",
        description: "Daha büyük baloncuklar için mega boy köpük tüpü. Partiler için ideal!",
        shortDescription: "Mega boy baloncuklar için ideal",
        price: "₺199,90",
        featured: false,
        image: "/products/product1-2.jpg",
        gallery: ["/products/product1-2.jpg"],
        highlights: ["Mega boy baloncuklar", "Parti seti uyumlu"],
        specifications: { "Yaş Grubu": "4+", Boyut: "20 x 5 cm" },
        colors: ["blue", "green"],
      },
      {
        id: "kopuk-parti-seti",
        slug: "kopuk-parti-seti",
        name: "Köpük Parti Seti",
        description: "6 adet köpük tüpü ve parti aksesuarları içeren komple set.",
        shortDescription: "6'lı parti seti",
        price: "₺599,90",
        featured: false,
        image: "/products/product1-3.jpg",
        gallery: ["/products/product1-3.jpg"],
        highlights: ["6 adet tüp", "Parti dekorasyonu dahil"],
        specifications: { İçerik: "6 tüp + aksesuarlar" },
        colors: ["blue", "green", "yellow", "red"],
      },
    ],
    faq: [
      {
        question: "Ürün hangi yaş grubu için uygundur?",
        answer:
          "Köpük Tüpü Klasik, 3 yaş ve üzeri çocuklar için tasarlanmıştır.",
      },
      {
        question: "Malzemeler güvenli mi?",
        answer: "Evet, tüm ürünlerimiz CE sertifikalıdır ve BPA içermez.",
      },
      {
        question: "Nasıl temizlenir?",
        answer: "Ürün ılık su ve hafif sabunla kolayca temizlenebilir.",
      },
      {
        question: "Toplu sipariş verebilir miyim?",
        answer: "Evet, distribütörler için özel fiyatlandırma sunuyoruz.",
      },
      {
        question: "Kargo süresi ne kadar?",
        answer: "Türkiye genelinde 2-4 iş günü içinde teslimat yapılmaktadır.",
      },
    ],
  },
  catalog: {
    pageHero: {
      badge: "Katalog",
      title: "Ürün Kataloğu",
      subtitle: "Tüm ürünlerimizi ve distribütör bilgilerini içeren kapsamlı kataloğumuz",
    },
    catalog: {
      title: "2024 Ürün Kataloğu",
      description: "Tüm ürünlerimizi, teknik özellikleri ve distribütör bilgilerini içeren kapsamlı kataloğumuz",
      pdfUrl: "",
      lastUpdated: "Haziran 2024",
      sections: [
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
      ],
    },
    b2bCards: [
      {
        title: "Bayilik Fırsatları",
        description:
          "Türkiye genelinde bayilik ve distribütörlük fırsatları sunuyoruz.",
      },
      {
        title: "Lojistik & Teslimat",
        description: "Türkiye genelinde 2-4 iş günü teslimat.",
      },
      {
        title: "Satış Desteği",
        description: "Vitrin malzemeleri, tanıtım desteği ve satış eğitimi.",
      },
    ],
    b2bCta: {
      title: "İş Ortağımız Olun",
      description: "Distribütör veya perakendeci olarak Köpük Dünyası ailesine katılın.",
    },
  },
  contact: {
    pageHero: {
      badge: "İletişim",
      title: "Bizimle İletişime Geçin",
      subtitle: "Sorularınız, siparişleriniz veya iş birliği teklifleriniz için buradayız",
    },
    formTitle: "Bize Ulaşın",
    hoursWeekday: "Pzt - Cum: 09:00 - 18:00",
    hoursSaturday: "Cmt: 10:00 - 14:00",
  },
};
