import { revalidatePath } from "next/cache";
import type { ContentSectionKey, SiteContent } from "./types/content";

const PUBLIC_PATHS = ["/", "/hakkimizda", "/urunler", "/katalog", "/iletisim"];

export function revalidatePublicPages(
  key?: ContentSectionKey,
  data?: SiteContent[ContentSectionKey]
) {
  revalidatePath("/", "layout");

  for (const path of PUBLIC_PATHS) {
    revalidatePath(path, "layout");
    revalidatePath(path, "page");
  }

  revalidatePath("/urunler/[slug]", "page");
  revalidatePath("/urunler/[slug]", "layout");

  if (key === "products" && data) {
    const products = (data as SiteContent["products"]).products ?? [];
    for (const product of products) {
      revalidatePath(`/urunler/${product.slug}`, "page");
      revalidatePath(`/urunler/${product.slug}`, "layout");
    }
  }
}
