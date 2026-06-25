import { getAllContent } from "@/lib/content";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CmsProvider } from "@/components/providers/CmsProvider";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getAllContent();

  return (
    <CmsProvider content={content}>
      <SmoothScrollProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </CmsProvider>
  );
}
