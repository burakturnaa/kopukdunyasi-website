import { getContentSection } from "@/lib/content";
import { AboutEditor } from "@/components/admin/editors/AboutEditor";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const initial = await getContentSection("about");
  return <AboutEditor initial={initial} />;
}
