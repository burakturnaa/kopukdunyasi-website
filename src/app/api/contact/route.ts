import { NextRequest, NextResponse } from "next/server";
import { verifySessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await verifySessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Mesajlar yüklenemedi" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, company, phone, subject, message, email } = await request.json();

    if (!name?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Ad, konu ve mesaj alanları zorunludur" },
        { status: 400 }
      );
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        company: company?.trim() || email?.trim() || null,
        phone: phone?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json({ success: true, id: contactMessage.id });
  } catch {
    return NextResponse.json({ error: "Mesaj gönderilemedi" }, { status: 500 });
  }
}
