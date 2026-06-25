"use client";

import type { AboutContent } from "@/lib/types/content";
import {
  AddButton,
  AdminCard,
  AdminCardGrid,
  EditorPageHeader,
  FieldGrid,
  ImageField,
  RepeaterCard,
  SaveBar,
  TextArea,
  TextField,
  useContentEditor,
} from "../ui";

export function AboutEditor({ initial }: { initial: AboutContent }) {
  const { data, setData, save, saving, saved } = useContentEditor(initial, "about");

  return (
    <div className="pb-8">
      <EditorPageHeader description="Hakkımızda sayfası içerikleri" title="Hakkımızda" />
      <AdminCardGrid>
        <AdminCard title="Sayfa Hero">
          <FieldGrid>
            <TextField label="Rozet" onChange={(v) => setData({ ...data, hero: { ...data.hero, badge: v } })} value={data.hero.badge} />
            <TextField label="Başlık" onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })} value={data.hero.title} />
            <TextArea label="Alt Başlık" onChange={(v) => setData({ ...data, hero: { ...data.hero, subtitle: v } })} value={data.hero.subtitle} />
          </FieldGrid>
        </AdminCard>

        <AdminCard span="full" title="Marka Hikayesi">
          <ImageField label="Görsel" onChange={(v) => setData({ ...data, story: { ...data.story, image: v } })} value={data.story.image} />
          {data.story.paragraphs.map((p, i) => (
            <TextArea
              key={i}
              label={`Paragraf ${i + 1}`}
              onChange={(v) => {
                const paragraphs = [...data.story.paragraphs];
                paragraphs[i] = v;
                setData({ ...data, story: { ...data.story, paragraphs } });
              }}
              value={p}
            />
          ))}
          <AddButton label="Paragraf Ekle" onClick={() => setData({ ...data, story: { ...data.story, paragraphs: [...data.story.paragraphs, ""] } })} />
        </AdminCard>

        <AdminCard title="Misyon">
          <TextField label="Başlık" onChange={(v) => setData({ ...data, mission: { ...data.mission, title: v } })} value={data.mission.title} />
          <TextArea label="Metin" onChange={(v) => setData({ ...data, mission: { ...data.mission, text: v } })} value={data.mission.text} />
        </AdminCard>

        <AdminCard title="Vizyon">
          <TextField label="Başlık" onChange={(v) => setData({ ...data, vision: { ...data.vision, title: v } })} value={data.vision.title} />
          <TextArea label="Metin" onChange={(v) => setData({ ...data, vision: { ...data.vision, text: v } })} value={data.vision.text} />
        </AdminCard>

        <AdminCard span="full" title="Değerler">
          <div className="space-y-4">
            {data.values.map((val, i) => (
              <RepeaterCard key={i} onRemove={() => setData({ ...data, values: data.values.filter((_, j) => j !== i) })} title={val.title}>
                <FieldGrid>
                  <TextField label="Başlık" onChange={(v) => { const values = [...data.values]; values[i] = { ...val, title: v }; setData({ ...data, values }); }} value={val.title} />
                  <TextField label="İkon" onChange={(v) => { const values = [...data.values]; values[i] = { ...val, icon: v }; setData({ ...data, values }); }} value={val.icon} />
                  <TextField label="Renk" onChange={(v) => { const values = [...data.values]; values[i] = { ...val, color: v }; setData({ ...data, values }); }} value={val.color} />
                  <TextArea label="Açıklama" onChange={(v) => { const values = [...data.values]; values[i] = { ...val, description: v }; setData({ ...data, values }); }} value={val.description} />
                </FieldGrid>
              </RepeaterCard>
            ))}
            <AddButton label="Değer Ekle" onClick={() => setData({ ...data, values: [...data.values, { title: "Yeni", description: "", icon: "star", color: "blue" }] })} />
          </div>
        </AdminCard>

        <AdminCard title="Alt Banner">
          <TextField label="Başlık" onChange={(v) => setData({ ...data, banner: { ...data.banner, title: v } })} value={data.banner.title} />
          <TextArea label="Alt Başlık" onChange={(v) => setData({ ...data, banner: { ...data.banner, subtitle: v } })} value={data.banner.subtitle} />
        </AdminCard>

        <SaveBar onSave={save} saved={saved} saving={saving} />
      </AdminCardGrid>
    </div>
  );
}
