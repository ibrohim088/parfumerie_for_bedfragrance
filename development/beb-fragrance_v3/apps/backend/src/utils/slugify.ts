import slugifyLib from 'slugify';

export function createSlug(text: string): string {
  return slugifyLib(text, { lower: true, strict: true, locale: 'uz' });
}