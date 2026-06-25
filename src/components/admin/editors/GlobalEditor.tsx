"use client";

import type { GlobalContent } from "@/lib/types/content";
import {
  AdminCard,
  AdminCardGrid,
  EditorPageHeader,
  FieldFull,
  FieldGrid,
  ImageField,
  SaveBar,
  TextArea,
  TextField,
  useContentEditor,
} from "../ui";

export function GlobalEditor({ initial }: { initial: GlobalContent }) {
  const { data, setData, save, saving, saved } = useContentEditor(initial, "global");

  const updateContact = (field: keyof GlobalContent["contact"], value: string) =>
    setData({ ...data, contact: { ...data.contact, [field]: value } });

  const updateSocial = (field: keyof GlobalContent["social"], value: string) =>
    setData({ ...data, social: { ...data.social, [field]: value } });

  return (
    <div className="pb-8">
      <EditorPageHeader
        description="Logo, SEO, iletişim ve sosyal medya ayarları"
        title="Genel Ayarlar"
      />
      <AdminCardGrid>
        <AdminCard description="Site kimliği ve görünüm" title="Marka & Logo">
          <FieldFull>
            <ImageField
              label="Logo"
              onChange={(v) => setData({ ...data, logoUrl: v })}
              previewFit="contain"
              value={data.logoUrl}
            />
          </FieldFull>
          <FieldGrid>
            <TextField label="Logo Alt Metni" onChange={(v) => setData({ ...data, logoAlt: v })} value={data.logoAlt} />
            <TextField label="Site Adı" onChange={(v) => setData({ ...data, siteName: v })} value={data.siteName} />
            <ImageField label="Favicon" onChange={(v) => setData({ ...data, faviconUrl: v })} previewFit="contain" value={data.faviconUrl} />
          </FieldGrid>
        </AdminCard>

        <AdminCard description="Arama motorları ve paylaşım" title="SEO">
          <TextField label="SEO Başlığı" onChange={(v) => setData({ ...data, seoTitle: v })} value={data.seoTitle} />
          <TextArea label="SEO Açıklaması" onChange={(v) => setData({ ...data, seoDescription: v })} value={data.seoDescription} />
          <ImageField label="OG Görseli" onChange={(v) => setData({ ...data, ogImage: v })} value={data.ogImage} />
        </AdminCard>

        <AdminCard description="Alt bilgi metinleri" title="Footer">
          <TextArea label="Açıklama" onChange={(v) => setData({ ...data, footerDescription: v })} value={data.footerDescription} />
        </AdminCard>

        <AdminCard description="Sosyal medya profil linkleri" title="Sosyal Medya">
          <FieldGrid>
            <TextField label="Instagram" onChange={(v) => updateSocial("instagram", v)} value={data.social.instagram} />
            <TextField label="Facebook" onChange={(v) => updateSocial("facebook", v)} value={data.social.facebook} />
            <TextField label="YouTube" onChange={(v) => updateSocial("youtube", v)} value={data.social.youtube} />
            <TextField label="TikTok" onChange={(v) => updateSocial("tiktok", v)} value={data.social.tiktok} />
          </FieldGrid>
        </AdminCard>

        <AdminCard description="Adres, telefon ve harita" span="full" title="İletişim Bilgileri">
          <FieldFull>
            <TextArea label="Adres" onChange={(v) => updateContact("address", v)} value={data.contact.address} />
          </FieldFull>
          <FieldGrid>
            <TextField label="Telefon" onChange={(v) => updateContact("phone", v)} value={data.contact.phone} />
            <TextField label="WhatsApp" onChange={(v) => updateContact("whatsapp", v)} value={data.contact.whatsapp} />
            <TextField label="E-posta" onChange={(v) => updateContact("email", v)} value={data.contact.email} />
          </FieldGrid>
          <FieldFull>
            <TextArea label="Google Maps Embed URL" onChange={(v) => updateContact("mapEmbed", v)} rows={2} value={data.contact.mapEmbed} />
          </FieldFull>
        </AdminCard>

        <SaveBar onSave={save} saved={saved} saving={saving} />
      </AdminCardGrid>
    </div>
  );
}
