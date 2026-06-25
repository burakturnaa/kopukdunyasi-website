import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "./prisma";
import { isManagedUploadUrl } from "./upload-utils";

export { extractUploadUrls, isManagedUploadUrl } from "./upload-utils";

function uploadUrlToPath(url: string): string {
  const filename = path.basename(url);
  return path.join(process.cwd(), "public", "uploads", filename);
}

export async function deleteUploadedFile(url: string): Promise<void> {
  if (!isManagedUploadUrl(url)) return;

  try {
    await unlink(uploadUrlToPath(url));
  } catch {
    // Dosya zaten silinmiş olabilir
  }

  try {
    await prisma.media.deleteMany({ where: { url } });
  } catch {
    // Veritabanı kullanılamıyorsa devam et
  }
}
