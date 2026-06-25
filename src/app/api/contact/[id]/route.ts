import { NextRequest, NextResponse } from "next/server";
import { verifySessionFromRequest, unauthorizedResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySessionFromRequest(request);
  if (!session) return unauthorizedResponse();

  try {
    const { id } = await params;
    const { read } = await request.json();

    if (typeof read !== "boolean") {
      return NextResponse.json({ error: "read alanı gerekli" }, { status: 400 });
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: "Güncelleme başarısız" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySessionFromRequest(_request);
  if (!session) return unauthorizedResponse();

  try {
    const { id } = await params;
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Silme başarısız" }, { status: 500 });
  }
}
