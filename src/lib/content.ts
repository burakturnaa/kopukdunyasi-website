import { unstable_noStore as noStore } from "next/cache";
import { defaultContent } from "./default-content";
import { prisma } from "./prisma";
import type { ContentSectionKey, SiteContent } from "./types/content";
import { extractUploadUrls } from "./upload-utils";

export async function getContentSectionFromDb<K extends ContentSectionKey>(
  key: K
): Promise<SiteContent[K]> {
  noStore();
  try {
    const section = await prisma.contentSection.findUnique({ where: { key } });
    if (section?.data) {
      return section.data as SiteContent[K];
    }
  } catch {
    // DB kullanılamıyorsa varsayılanlara dön
  }
  return defaultContent[key];
}

export async function getContentSection<K extends ContentSectionKey>(
  key: K
): Promise<SiteContent[K]> {
  return getContentSectionFromDb(key);
}

export async function getAllContent(): Promise<SiteContent> {
  noStore();
  const result = { ...defaultContent };

  try {
    const sections = await prisma.contentSection.findMany();
    for (const section of sections) {
      const key = section.key as ContentSectionKey;
      if (key in defaultContent) {
        (result as Record<ContentSectionKey, SiteContent[ContentSectionKey]>)[key] =
          section.data as SiteContent[typeof key];
      }
    }
  } catch {
    // varsayılanları kullan
  }

  return result;
}

export async function updateContentSection<K extends ContentSectionKey>(
  key: K,
  data: SiteContent[K]
) {
  let oldData: SiteContent[K] | null = null;

  try {
    const section = await prisma.contentSection.findUnique({ where: { key } });
    if (section?.data) {
      oldData = section.data as SiteContent[K];
    }
  } catch {
    // DB kullanılamıyorsa devam et
  }

  const result = await prisma.contentSection.upsert({
    where: { key },
    create: { key, data: data as object },
    update: { data: data as object },
  });

  if (oldData) {
    const oldUrls = extractUploadUrls(oldData);
    const newUrls = extractUploadUrls(data);
    const removed = [...oldUrls].filter((url) => !newUrls.has(url));

    if (removed.length > 0) {
      const allContent = await getAllContent();
      const stillReferenced = extractUploadUrls(allContent);

      for (const url of removed) {
        if (!stillReferenced.has(url)) {
          const { deleteUploadedFile } = await import("./uploads");
          await deleteUploadedFile(url);
        }
      }
    }
  }

  return result;
}

export { adminNavItems, contentSectionLabels } from "./admin-nav";
