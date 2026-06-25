import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { verifySessionFromRequest, unauthorizedResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await verifySessionFromRequest(request);
  if (!session) return unauthorizedResponse();

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Mevcut şifre ve yeni şifre gerekli" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Yeni şifre en az 8 karakter olmalıdır" },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: session.adminId },
    });

    if (!admin) return unauthorizedResponse();

    const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Mevcut şifre hatalı" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Şifre güncellenemedi" }, { status: 500 });
  }
}
