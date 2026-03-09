/**
 * Extracts the file name from a URL string.
 * Example: https://res.cloudinary.com/.../1773040186475-17c62850.pdf → 1773040186475-17c62850.pdf
 */
export function getFileNameFromUrl(url: string): string {
  if (!url || typeof url !== "string") return "file";
  try {
    const path = new URL(url).pathname;
    const name = path.split("/").pop();
    return name || "file";
  } catch {
    // Fallback: take last segment after final /
    const lastSlash = url.lastIndexOf("/");
    if (lastSlash >= 0 && lastSlash < url.length - 1) {
      return url.slice(lastSlash + 1).split("?")[0] || "file";
    }
    return "file";
  }
}
