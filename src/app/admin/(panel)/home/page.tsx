import { getContentSection } from "@/lib/content";
import { HomeEditor } from "@/components/admin/editors/HomeEditor";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const initial = await getContentSection("home");
  return <HomeEditor initial={initial} />;
}
