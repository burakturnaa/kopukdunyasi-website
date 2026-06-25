"use client";

import type { ContactContent } from "@/lib/types/content";
import {
  AdminCard,
  AdminCardGrid,
  EditorPageHeader,
  FieldGrid,
  SaveBar,
  TextArea,
  TextField,
  useContentEditor,
} from "../ui";

export function ContactEditor({ initial }: { initial: ContactContent }) {
  const { data, setData, save, saving, saved } = useContentEditor(initial, "contact");

  return (
    <div className="pb-8">
      <EditorPageHeader description="İletişim sayfası metinleri" title="İletişim" />
      <AdminCardGrid>
        <AdminCard title="Sayfa Hero">
          <FieldGrid>
            <TextField label="Rozet" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, badge: v } })} value={data.pageHero.badge} />
            <TextField label="Başlık" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, title: v } })} value={data.pageHero.title} />
            <TextArea label="Alt Başlık" onChange={(v) => setData({ ...data, pageHero: { ...data.pageHero, subtitle: v } })} value={data.pageHero.subtitle} />
          </FieldGrid>
        </AdminCard>

        <AdminCard title="Form & Saatler">
          <TextField label="Form Başlığı" onChange={(v) => setData({ ...data, formTitle: v })} value={data.formTitle} />
          <TextField label="Hafta İçi Saatler" onChange={(v) => setData({ ...data, hoursWeekday: v })} value={data.hoursWeekday} />
          <TextField label="Cumartesi Saatler" onChange={(v) => setData({ ...data, hoursSaturday: v })} value={data.hoursSaturday} />
        </AdminCard>

        <SaveBar onSave={save} saved={saved} saving={saving} />
      </AdminCardGrid>
    </div>
  );
}
