import { NextRequest, NextResponse } from "next/server";
import { getContentSectionFromDb } from "@/lib/content";
import type { ContentSectionKey } from "@/lib/types/content";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const content = await getContentSectionFromDb(key as ContentSectionKey);
  return NextResponse.json(content);
}
