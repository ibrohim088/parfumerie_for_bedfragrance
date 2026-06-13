'use client';

import { useState } from 'react';
import styles from './ProductForm.module.scss';
import { ProductImageUpload } from '@/components/products/ProductImageUpload/ProductImageUpload';
import { AdminButton } from '@/components/ui/AdminButton/AdminButton';
import { AdminSelect } from '@/components/ui/AdminSelect/AdminSelect';

export type ProductVariantData = {
  id?: string;
  volume: number;
  price: number;
  stock: number;
};

export type ProductImageData = {
  url: string;
  alt?: string;
  isPrimary: boolean;
};

export type ProductFormData = {
  name: string;
  brand: string;
  description: string;
  concentration: string;
  status: string;
  isFeatured: boolean;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  images: ProductImageData[];
  variants: ProductVariantData[];
};

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

const CONCENTRATION_OPTIONS = [
  { value: 'parfum', label: 'Parfum' },
  { value: 'edp', label: 'EDP (Eau de Parfum)' },
  { value: 'edt', label: 'EDT (Eau de Toilette)' },
  { value: 'edc', label: 'EDC (Eau de Cologne)' },
  { value: 'body_mist', label: 'Body Mist' },
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
  { value: 'out_of_stock', label: "Stokda yo'q" },
];

function notesToString(notes?: string[]): string {
  return notes?.join(', ') ?? '';
}

function stringToNotes(value: string): string[] {
  return value
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean);
}

export function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = 'Saqlash',
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [brand, setBrand] = useState(initialData?.brand ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [concentration, setConcentration] = useState(
    initialData?.concentration ?? 'edp',
  );
  const [status, setStatus] = useState(initialData?.status ?? 'active');
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [topNotes, setTopNotes] = useState(notesToString(initialData?.topNotes));
  const [middleNotes, setMiddleNotes] = useState(notesToString(initialData?.middleNotes));
  const [baseNotes, setBaseNotes] = useState(notesToString(initialData?.baseNotes));
  const [images, setImages] = useState<ProductImageData[]>(
    initialData?.images ?? [],
  );
  const [variants, setVariants] = useState<ProductVariantData[]>(
    initialData?.variants?.length
      ? initialData.variants
      : [{ volume: 50, price: 0, stock: 0 }],
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addVariant = () => {
    setVariants((v) => [...v, { volume: 50, price: 0, stock: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants((v) => v.filter((_, i) => i !== index));
  };

  const updateVariant = (
    index: number,
    field: keyof ProductVariantData,
    value: number,
  ) => {
    setVariants((v) =>
      v.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Nom kiritilishi shart';
    if (!brand.trim()) next.brand = 'Brend kiritilishi shart';
    if (!description.trim()) next.description = 'Tavsif kiritilishi shart';
    if (images.length === 0) next.images = 'Kamida 1 ta rasm yuklang';
    if (variants.length === 0) next.variants = 'Kamida 1 ta variant qo\'shing';
    variants.forEach((v, i) => {
      if (v.volume <= 0) next[`variant_${i}_volume`] = 'Hajm > 0 bo\'lishi kerak';
      if (v.price <= 0) next[`variant_${i}_price`] = 'Narx > 0 bo\'lishi kerak';
      if (v.stock < 0) next[`variant_${i}_stock`] = 'Stok manfiy bo\'lmasligi kerak';
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data: ProductFormData = {
      name: name.trim(),
      brand: brand.trim(),
      description: description.trim(),
      concentration,
      status,
      isFeatured,
      topNotes: stringToNotes(topNotes),
      middleNotes: stringToNotes(middleNotes),
      baseNotes: stringToNotes(baseNotes),
      images,
      variants,
    };

    await onSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        {/* Main info */}
        <section className={styles.card}>
          <h3 className={styles.title}>Asosiy ma'lumotlar</h3>

          <div className={styles.field}>
            <label className={styles.label}>
              Nom <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masalan: Sauvage"
              disabled={isLoading}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Brend <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Masalan: Dior"
              disabled={isLoading}
            />
            {errors.brand && <p className={styles.error}>{errors.brand}</p>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Kontsentratsiya</label>
              <AdminSelect
                value={concentration}
                onChange={setConcentration}
                options={CONCENTRATION_OPTIONS}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <AdminSelect
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Tavsif <span className={styles.required}>*</span>
            </label>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Mahsulot haqida batafsil ma'lumot..."
              disabled={isLoading}
            />
            {errors.description && <p className={styles.error}>{errors.description}</p>}
          </div>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              disabled={isLoading}
            />
            <span>Bosh sahifada ko'rsatish (Featured)</span>
          </label>
        </section>

        {/* Notes */}
        <section className={styles.card}>
          <h3 className={styles.title}>Hidlar (notes)</h3>
          <p className={styles.hint}>Vergul bilan ajrating: bergamot, limon, sandal</p>

          <div className={styles.field}>
            <label className={styles.label}>Top notes</label>
            <input
              className={styles.input}
              value={topNotes}
              onChange={(e) => setTopNotes(e.target.value)}
              placeholder="bergamot, limon..."
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Middle notes</label>
            <input
              className={styles.input}
              value={middleNotes}
              onChange={(e) => setMiddleNotes(e.target.value)}
              placeholder="atirgul, yasmin..."
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Base notes</label>
            <input
              className={styles.input}
              value={baseNotes}
              onChange={(e) => setBaseNotes(e.target.value)}
              placeholder="sandal, vanil..."
              disabled={isLoading}
            />
          </div>
        </section>
      </div>

      {/* Images */}
      <section className={styles.card}>
        <h3 className={styles.title}>Rasmlar</h3>
        <ProductImageUpload images={images} onChange={setImages} />
        {errors.images && <p className={styles.error}>{errors.images}</p>}
      </section>

      {/* Variants */}
      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.title}>Variantlar (hajm / narx / stok)</h3>
          <AdminButton type="button" variant="ghost" size="sm" onClick={addVariant}>
            + Variant qo'shish
          </AdminButton>
        </div>

        <div className={styles.variantList}>
          {variants.map((v, i) => (
            <div key={i} className={styles.variantRow}>
              <div className={styles.field}>
                <label className={styles.label}>Hajm (ml)</label>
                <input
                  type="number"
                  min={1}
                  className={styles.input}
                  value={v.volume}
                  onChange={(e) => updateVariant(i, 'volume', Number(e.target.value))}
                  disabled={isLoading}
                />
                {errors[`variant_${i}_volume`] && (
                  <p className={styles.error}>{errors[`variant_${i}_volume`]}</p>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Narx (UZS)</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={v.price}
                  onChange={(e) => updateVariant(i, 'price', Number(e.target.value))}
                  disabled={isLoading}
                />
                {errors[`variant_${i}_price`] && (
                  <p className={styles.error}>{errors[`variant_${i}_price`]}</p>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Stok</label>
                <input
                  type="number"
                  min={0}
                  className={styles.input}
                  value={v.stock}
                  onChange={(e) => updateVariant(i, 'stock', Number(e.target.value))}
                  disabled={isLoading}
                />
                {errors[`variant_${i}_stock`] && (
                  <p className={styles.error}>{errors[`variant_${i}_stock`]}</p>
                )}
              </div>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeVariant(i)}
                disabled={isLoading || variants.length === 1}
                aria-label="Variantni o'chirish"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {errors.variants && <p className={styles.error}>{errors.variants}</p>}
      </section>

      <div className={styles.footer}>
        <AdminButton type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Saqlanmoqda...' : submitLabel}
        </AdminButton>
      </div>
    </form>
  );
}
