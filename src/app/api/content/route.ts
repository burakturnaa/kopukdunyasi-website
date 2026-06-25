import { NextRequest, NextResponse } from "next/server";
import { verifySessionFromRequest, unauthorizedResponse } from "@/lib/auth";
import { getAllContent, updateContentSection } from "@/lib/content";
import { revalidatePublicPages } from "@/lib/revalidate-public";
import type { ContentSectionKey } from "@/lib/types/content";

export async function GET() {
  const content = await getAllContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const session = await verifySessionFromRequest(request);
  if (!session) return unauthorizedResponse();

  try {
    const { key, data } = await request.json();
    if (!key || !data) {
      return NextResponse.json({ error: "key ve data gerekli" }, { status: 400 });
    }

    await updateContentSection(key as ContentSectionKey, data);
    revalidatePublicPages(key as ContentSectionKey, data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Kayıt başarısız" }, { status: 500 });
  }
}
