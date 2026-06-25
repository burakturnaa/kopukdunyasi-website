export function isManagedUploadUrl(url: string): boolean {
  return typeof url === "string" && url.startsWith("/uploads/") && !url.includes("..");
}

export function extractUploadUrls(value: unknown): Set<string> {
  const urls = new Set<string>();

  const walk = (node: unknown) => {
    if (typeof node === "string" && isManagedUploadUrl(node)) {
      urls.add(node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (node && typeof node === "object") {
      Object.values(node).forEach(walk);
    }
  };

  walk(value);
  return urls;
}
