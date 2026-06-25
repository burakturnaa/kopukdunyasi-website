import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "E-posta ve şifre gerekli" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ error: "Geçersiz kimlik bilgileri" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Geçersiz kimlik bilgileri" }, { status: 401 });
    }

    await createSession(admin.id, admin.email);
    return NextResponse.json({ success: true, email: admin.email });
  } catch {
    return NextResponse.json({ error: "Giriş başarısız" }, { status: 500 });
  }
}
