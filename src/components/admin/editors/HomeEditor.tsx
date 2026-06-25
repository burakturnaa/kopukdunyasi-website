"use client";

import type { HomeContent, StatItem, TestimonialItem } from "@/lib/types/content";
import {
  AddButton,
  AdminCard,
  AdminCardGrid,
  EditorPageHeader,
  FieldGrid,
  RepeaterCard,
  SaveBar,
  TextArea,
  TextField,
  useContentEditor,
} from "../ui";

export function HomeEditor({ initial }: { initial: HomeContent }) {
  const { data, setData, save, saving, saved } = useContentEditor(initial, "home");

  const updateHero = (field: keyof HomeContent["hero"], value: string | string[]) =>
    setData({ ...data, hero: { ...data.hero, [field]: value } });

  return (
    <div className="pb-8">
      <EditorPageHeader description="Anasayfa hero, özellikler, istatistikler ve yorumlar" title="Anasayfa" />
      <AdminCardGrid>
        <AdminCard description="Üst bölüm başlık ve CTA" span="full" title="Hero">
          <FieldGrid>
            <TextField label="Rozet" onChange={(v) => updateHero("badge", v)} value={data.hero.badge} />
            <TextField label="Başlık Satır 1" onChange={(v) => updateHero("titleLine1", v)} value={data.hero.titleLine1} />
            <TextField label="Başlık Satır 2" onChange={(v) => updateHero("titleLine2", v)} value={data.hero.titleLine2} />
            <TextArea label="Alt Başlık" onChange={(v) => updateHero("subtitle", v)} value={data.hero.subtitle} />
            <TextField label="Birincil CTA Metni" onChange={(v) => updateHero("primaryCtaLabel", v)} value={data.hero.primaryCtaLabel} />
            <TextField label="Birincil CTA Link" onChange={(v) => updateHero("primaryCtaHref", v)} value={data.hero.primaryCtaHref} />
            <TextField label="İkincil CTA Metni" onChange={(v) => updateHero("secondaryCtaLabel", v)} value={data.hero.secondaryCtaLabel} />
            <TextField label="İkincil CTA Link" onChange={(v) => updateHero("secondaryCtaHref", v)} value={data.hero.secondaryCtaHref} />
          </FieldGrid>
        </AdminCard>

        <AdminCard description="Anasayfada öne çıkan ürün" title="Öne Çıkan Ürün">
          <TextField
            label="Ürün Slug"
            onChange={(v) => setData({ ...data, featuredProductSlug: v })}
            value={data.featuredProductSlug}
          />
        </AdminCard>

        <AdminCard description="Neden Köpük Dünyası kartları" span="full" title="Özellikler">
          <div className="space-y-4">
            {data.features.map((f, i) => (
              <RepeaterCard
                key={i}
                onRemove={() => setData({ ...data, features: data.features.filter((_, j) => j !== i) })}
                title={f.title || `Özellik ${i + 1}`}
              >
                <FieldGrid>
                  <TextField label="Başlık" onChange={(v) => { const features = [...data.features]; features[i] = { ...f, title: v }; setData({ ...data, features }); }} value={f.title} />
                  <TextField label="İkon" onChange={(v) => { const features = [...data.features]; features[i] = { ...f, icon: v }; setData({ ...data, features }); }} value={f.icon} />
                  <TextField label="Renk" onChange={(v) => { const features = [...data.features]; features[i] = { ...f, color: v }; setData({ ...data, features }); }} value={f.color} />
                  <TextArea label="Açıklama" onChange={(v) => { const features = [...data.features]; features[i] = { ...f, description: v }; setData({ ...data, features }); }} value={f.description} />
                </FieldGrid>
              </RepeaterCard>
            ))}
            <AddButton label="Özellik Ekle" onClick={() => setData({ ...data, features: [...data.features, { icon: "sparkles", title: "Yeni Özellik", description: "", color: "blue" }] })} />
          </div>
        </AdminCard>

        <AdminCard description="Sayaç istatistikleri" span="full" title="İstatistikler">
          <div className="grid sm:grid-cols-2 gap-4">
            {data.stats.map((stat, i) => (
              <RepeaterCard key={i} onRemove={() => setData({ ...data, stats: data.stats.filter((_, j) => j !== i) })} title={stat.label}>
                <FieldGrid>
                  <TextField label="Değer" type="number" onChange={(v) => { const stats = [...data.stats]; stats[i] = { ...stat, end: Number(v) }; setData({ ...data, stats }); }} value={String(stat.end)} />
                  <TextField label="Önek" onChange={(v) => { const stats = [...data.stats]; stats[i] = { ...stat, prefix: v }; setData({ ...data, stats }); }} value={stat.prefix} />
                  <TextField label="Sonek" onChange={(v) => { const stats = [...data.stats]; stats[i] = { ...stat, suffix: v }; setData({ ...data, stats }); }} value={stat.suffix} />
                  <TextField label="Etiket" onChange={(v) => { const stats = [...data.stats]; stats[i] = { ...stat, label: v }; setData({ ...data, stats }); }} value={stat.label} />
                </FieldGrid>
              </RepeaterCard>
            ))}
            <div className="sm:col-span-2">
              <AddButton label="İstatistik Ekle" onClick={() => setData({ ...data, stats: [...data.stats, { end: 0, prefix: "", suffix: "", label: "Yeni" } as StatItem] })} />
            </div>
          </div>
        </AdminCard>

        <AdminCard description="Müşteri yorumları" span="full" title="Yorumlar">
          <div className="space-y-4">
            {data.testimonials.map((t) => (
              <RepeaterCard key={t.id} onRemove={() => setData({ ...data, testimonials: data.testimonials.filter((x) => x.id !== t.id) })} title={t.name}>
                <FieldGrid>
                  <TextField label="İsim" onChange={(v) => setData({ ...data, testimonials: data.testimonials.map((x) => x.id === t.id ? { ...x, name: v } : x) })} value={t.name} />
                  <TextField label="Rol" onChange={(v) => setData({ ...data, testimonials: data.testimonials.map((x) => x.id === t.id ? { ...x, role: v } : x) })} value={t.role} />
                  <TextField label="Avatar" onChange={(v) => setData({ ...data, testimonials: data.testimonials.map((x) => x.id === t.id ? { ...x, avatar: v } : x) })} value={t.avatar} />
                  <TextArea label="Yorum" onChange={(v) => setData({ ...data, testimonials: data.testimonials.map((x) => x.id === t.id ? { ...x, content: v } : x) })} value={t.content} />
                </FieldGrid>
              </RepeaterCard>
            ))}
            <AddButton
              label="Yorum Ekle"
              onClick={() =>
                setData({
                  ...data,
                  testimonials: [
                    ...data.testimonials,
                    { id: crypto.randomUUID(), name: "Yeni", role: "", content: "", rating: 5, avatar: "YY" } as TestimonialItem,
                  ],
                })
              }
            />
          </div>
        </AdminCard>

        <AdminCard description="Alt CTA bölümü" title="Katalog CTA">
          <TextField label="Başlık" onChange={(v) => setData({ ...data, cta: { ...data.cta, title: v } })} value={data.cta.title} />
          <TextArea label="Açıklama" onChange={(v) => setData({ ...data, cta: { ...data.cta, description: v } })} value={data.cta.description} />
          <FieldGrid>
            <TextField label="Birincil Buton" onChange={(v) => setData({ ...data, cta: { ...data.cta, primaryLabel: v } })} value={data.cta.primaryLabel} />
            <TextField label="İkincil Buton" onChange={(v) => setData({ ...data, cta: { ...data.cta, secondaryLabel: v } })} value={data.cta.secondaryLabel} />
          </FieldGrid>
        </AdminCard>

        <SaveBar onSave={save} saved={saved} saving={saving} />
      </AdminCardGrid>
    </div>
  );
}
