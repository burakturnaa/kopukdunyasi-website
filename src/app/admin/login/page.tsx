import { getContentSection } from "@/lib/content";
import { AdminLoginPage } from "@/components/admin/AdminLoginPage";

export const dynamic = "force-dynamic";

export default async function AdminLogin() {
  const global = await getContentSection("global");
  return <AdminLoginPage logoAlt={global.logoAlt} logoUrl={global.logoUrl || "/logo.png"} />;
}
