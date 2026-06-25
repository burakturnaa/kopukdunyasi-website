import type { Metadata } from "next";
import { getContentSection } from "@/lib/content";
import { ProductDetailClient } from "@/components/sections/ProductDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getContentSection("products");
  const product = products.products.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Ürün Bulunamadı" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
