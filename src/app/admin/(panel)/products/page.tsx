import { getContentSection } from "@/lib/content";
import { ProductsEditor } from "@/components/admin/editors/ProductsEditor";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const initial = await getContentSection("products");
  return <ProductsEditor initial={initial} />;
}
