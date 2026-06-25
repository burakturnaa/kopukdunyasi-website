import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { defaultContent } from "../src/lib/default-content";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@kopukdunyasi.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin12345";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    create: { email, passwordHash, name: "Admin" },
    update: { passwordHash },
  });

  for (const [key, data] of Object.entries(defaultContent)) {
    await prisma.contentSection.upsert({
      where: { key },
      create: { key, data: data as object },
      update: {},
    });
  }

  console.log(`Seed complete. Admin: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
