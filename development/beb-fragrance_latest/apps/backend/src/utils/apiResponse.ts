import slugifyLib from 'slugify';

/**
 * Matn dan URL-safe slug yaratadi
 * Masalan: "Oud Royal" → "oud-royal"
 */
export function toSlug(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
    locale: 'uz',
  });
}

/**
 * Slug unique bo'lmasa oxiriga raqam qo'shib unique qiladi
 * Masalan: "oud-royal" band bo'lsa → "oud-royal-2"
 *
 * @param text    - Slug yasaladigan matn
 * @param exists  - Slug mavjudligini tekshiruvchi async funksiya
 */
export async function createSlug(
  text: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> {
  const base = toSlug(text);
  let slug = base;
  let counter = 2;

  while (await exists(slug)) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}
