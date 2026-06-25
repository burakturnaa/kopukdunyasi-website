import { getContentSection } from "@/lib/content";
import { GlobalEditor } from "@/components/admin/editors/GlobalEditor";

export const dynamic = "force-dynamic";

export default async function AdminGlobalPage() {
  const initial = await getContentSection("global");
  return <GlobalEditor initial={initial} />;
}
