import { getContentSection } from "@/lib/content";
import { CatalogEditor } from "@/components/admin/editors/CatalogEditor";

export const dynamic = "force-dynamic";

export default async function AdminCatalogPage() {
  const initial = await getContentSection("catalog");
  return <CatalogEditor initial={initial} />;
}
