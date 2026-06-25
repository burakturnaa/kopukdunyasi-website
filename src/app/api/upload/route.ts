import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { verifySessionFromRequest, unauthorizedResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteUploadedFile, isManagedUploadUrl } from "@/lib/uploads";

export async function POST(request: NextRequest) {
  const session = await verifySessionFromRequest(request);
  if (!session) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const replaceUrl = formData.get("replaceUrl") as string | null;

    if (!file) {
      return NextResponse.json({ error: "Dosya gerekli" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const url = `/uploads/${filename}`;

    try {
      await prisma.media.create({
        data: {
          filename: file.name,
          url,
          mimeType: file.type,
          size: buffer.length,
        },
      });
    } catch {
      // DB yoksa dosya yine kaydedilir
    }

    if (replaceUrl && isManagedUploadUrl(replaceUrl)) {
      await deleteUploadedFile(replaceUrl);
    }

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Yükleme başarısız" }, { status: 500 });
  }
}
