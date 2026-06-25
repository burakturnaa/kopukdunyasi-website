import { getContentSection } from "@/lib/content";
import { ContactEditor } from "@/components/admin/editors/ContactEditor";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const initial = await getContentSection("contact");
  return <ContactEditor initial={initial} />;
}
