"use client";

import type { ProductItem, ProductsContent } from "@/lib/types/content";
import {
  AddButton,
  AdminCard,
  AdminCardGrid,
  EditorPageHeader,
  FieldFull,
  FieldGrid,
  ImageField,
  RepeaterCard,
  SaveBar,
  TextArea,
  TextField,
  useContentEditor,
} from "../ui";

export function ProductsEditor({ initial }: { initial: ProductsContent }) {
  const { data, setData, save, saving, saved } = useContentEditor(initial, "products");

  const updateProduct = (id: string, patch: Partial<ProductItem>) =>
    setData({ ...data, products: data.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) });

  return (
    <div className="pb-8">
      <EditorPageHeader description="Ürün listesi ve SSS" title="Ürünler" />
      <AdminCardGrid>
        <AdminCard title="Sayfa Hero">
          <FieldGrid>
            <TextField label="Rozet" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, badge: v } })} value={data.pageHero.badge} />
            <TextField label="Başlık" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, title: v } })} value={data.pageHero.title} />
            <TextArea label="Alt Başlık" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, subtitle: v } })} value={data.pageHero.subtitle} />
          </FieldGrid>
        </AdminCard>

        <AdminCard description="Tüm ürünler" span="full" title="Ürün Listesi">
          <div className="space-y-4">
            {data.products.map((product) => (
              <RepeaterCard
                key={product.id}
                onRemove={() => setData({ ...data, products: data.products.filter((p) => p.id !== product.id) })}
                title={product.name || product.slug}
              >
                <FieldGrid>
                  <TextField label="Slug" onChange={(v) => updateProduct(product.id, { slug: v })} value={product.slug} />
                  <TextField label="Ad" onChange={(v) => updateProduct(product.id, { name: v })} value={product.name} />
                  <TextField label="Fiyat" onChange={(v) => updateProduct(product.id, { price: v })} value={product.price} />
                  <TextField label="Kısa Açıklama" onChange={(v) => updateProduct(product.id, { shortDescription: v })} value={product.shortDescription} />
                  <label className="flex items-center gap-2 text-sm">
                    <input checked={product.featured} onChange={(e) => updateProduct(product.id, { featured: e.target.checked })} type="checkbox" />
                    Öne çıkan ürün
                  </label>
                </FieldGrid>
                <TextArea label="Açıklama" onChange={(v) => updateProduct(product.id, { description: v })} value={product.description} />
                <ImageField label="Kapak Görseli" onChange={(v) => updateProduct(product.id, { image: v })} value={product.image} />
                <FieldFull>
                  <TextField
                    label="Galeri (virgülle ayırın)"
                    onChange={(v) => updateProduct(product.id, { gallery: v.split(",").map((s) => s.trim()).filter(Boolean) })}
                    value={product.gallery.join(", ")}
                  />
                </FieldFull>
                <TextField
                  label="Öne Çıkanlar (virgülle ayırın)"
                  onChange={(v) => updateProduct(product.id, { highlights: v.split(",").map((s) => s.trim()).filter(Boolean) })}
                  value={product.highlights.join(", ")}
                />
                <TextField
                  label="Renkler (virgülle: blue,green,yellow,red)"
                  onChange={(v) => updateProduct(product.id, { colors: v.split(",").map((s) => s.trim()).filter(Boolean) })}
                  value={product.colors.join(", ")}
                />
              </RepeaterCard>
            ))}
            <AddButton
              label="Ürün Ekle"
              onClick={() =>
                setData({
                  ...data,
                  products: [
                    ...data.products,
                    {
                      id: crypto.randomUUID(),
                      slug: "yeni-urun",
                      name: "Yeni Ürün",
                      description: "",
                      shortDescription: "",
                      price: "₺0",
                      featured: false,
                      image: "",
                      gallery: [],
                      highlights: [],
                      specifications: {},
                      colors: ["blue"],
                    },
                  ],
                })
              }
            />
          </div>
        </AdminCard>

        <AdminCard span="full" title="SSS">
          <div className="space-y-4">
            {data.faq.map((item, i) => (
              <RepeaterCard key={i} onRemove={() => setData({ ...data, faq: data.faq.filter((_, j) => j !== i) })} title={item.question}>
                <TextField label="Soru" onChange={(v) => { const faq = [...data.faq]; faq[i] = { ...item, question: v }; setData({ ...data, faq }); }} value={item.question} />
                <TextArea label="Cevap" onChange={(v) => { const faq = [...data.faq]; faq[i] = { ...item, answer: v }; setData({ ...data, faq }); }} value={item.answer} />
              </RepeaterCard>
            ))}
            <AddButton label="SSS Ekle" onClick={() => setData({ ...data, faq: [...data.faq, { question: "Yeni soru", answer: "" }] })} />
          </div>
        </AdminCard>

        <SaveBar onSave={save} saved={saved} saving={saving} />
      </AdminCardGrid>
    </div>
  );
}
