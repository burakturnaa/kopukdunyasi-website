"use client";

import type { CatalogContent } from "@/lib/types/content";
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

export function CatalogEditor({ initial }: { initial: CatalogContent }) {
  const { data, setData, save, saving, saved } = useContentEditor(initial, "catalog");

  return (
    <div className="pb-8">
      <EditorPageHeader description="Katalog sayfası ve B2B içerikleri" title="Katalog" />
      <AdminCardGrid>
        <AdminCard title="Sayfa Hero">
          <FieldGrid>
            <TextField label="Rozet" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, badge: v } })} value={data.pageHero.badge} />
            <TextField label="Başlık" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, title: v } })} value={data.pageHero.title} />
            <TextArea label="Alt Başlık" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, subtitle: v } })} value={data.pageHero.subtitle} />
          </FieldGrid>
        </AdminCard>

        <AdminCard title="Katalog Dosyası">
          <TextField label="Katalog Başlığı" onChange={(v) => setData({ ...data, catalog: { ...data.catalog, title: v } })} value={data.catalog.title} />
          <TextArea label="Açıklama" onChange={(v) => setData({ ...data, catalog: { ...data.catalog, description: v } })} value={data.catalog.description} />
          <TextField label="PDF URL" onChange={(v) => setData({ ...data, catalog: { ...data.catalog, pdfUrl: v } })} value={data.catalog.pdfUrl} />
          <TextField label="Son Güncelleme" onChange={(v) => setData({ ...data, catalog: { ...data.catalog, lastUpdated: v } })} value={data.catalog.lastUpdated} />
        </AdminCard>

        <AdminCard span="full" title="Katalog Bölümleri">
          <div className="space-y-4">
            {data.catalog.sections.map((section, i) => (
              <RepeaterCard key={i} onRemove={() => setData({ ...data, catalog: { ...data.catalog, sections: data.catalog.sections.filter((_, j) => j !== i) } })} title={section.title}>
                <FieldGrid>
                  <TextField label="Başlık" onChange={(v) => { const sections = [...data.catalog.sections]; sections[i] = { ...section, title: v }; setData({ ...data, catalog: { ...data.catalog, sections } }); }} value={section.title} />
                  <TextField label="Sayfalar" onChange={(v) => { const sections = [...data.catalog.sections]; sections[i] = { ...section, pages: v }; setData({ ...data, catalog: { ...data.catalog, sections } }); }} value={section.pages} />
                  <TextArea label="Açıklama" onChange={(v) => { const sections = [...data.catalog.sections]; sections[i] = { ...section, description: v }; setData({ ...data, catalog: { ...data.catalog, sections } }); }} value={section.description} />
                </FieldGrid>
              </RepeaterCard>
            ))}
            <AddButton label="Bölüm Ekle" onClick={() => setData({ ...data, catalog: { ...data.catalog, sections: [...data.catalog.sections, { title: "Yeni", pages: "", description: "" }] } })} />
          </div>
        </AdminCard>

        <AdminCard span="full" title="B2B Kartları">
          <div className="space-y-4">
            {data.b2bCards.map((card, i) => (
              <RepeaterCard key={i} onRemove={() => setData({ ...data, b2bCards: data.b2bCards.filter((_, j) => j !== i) })} title={card.title}>
                <TextField label="Başlık" onChange={(v) => { const b2bCards = [...data.b2bCards]; b2bCards[i] = { ...card, title: v }; setData({ ...data, b2bCards }); }} value={card.title} />
                <TextArea label="Açıklama" onChange={(v) => { const b2bCards = [...data.b2bCards]; b2bCards[i] = { ...card, description: v }; setData({ ...data, b2bCards }); }} value={card.description} />
              </RepeaterCard>
            ))}
            <AddButton label="Kart Ekle" onClick={() => setData({ ...data, b2bCards: [...data.b2bCards, { title: "Yeni", description: "" }] })} />
          </div>
        </AdminCard>

        <AdminCard title="B2B CTA">
          <TextField label="Başlık" onChange={(v) => setData({ ...data, b2bCta: { ...data.b2bCta, title: v } })} value={data.b2bCta.title} />
          <TextArea label="Açıklama" onChange={(v) => setData({ ...data, b2bCta: { ...data.b2bCta, description: v } })} value={data.b2bCta.description} />
        </AdminCard>

        <SaveBar onSave={save} saved={saved} saving={saving} />
      </AdminCardGrid>
    </div>
  );
}
