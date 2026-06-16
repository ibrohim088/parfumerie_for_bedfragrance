import slugifyLib from 'slugify';

export function createSlug(text: string): Promise<string>;
export function createSlug(
  text: string,
  isUnique: (slug: string) => Promise<boolean>,
): Promise<string>;

export async function createSlug(
  text: string,
  isUnique?: (slug: string) => Promise<boolean>,
): Promise<string> {
  const base = slugifyLib(text, { lower: true, strict: true, locale: 'uz' });

  if (!isUnique) return base;

  let slug = base;
  let counter = 1;

  while (await isUnique(slug)) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}