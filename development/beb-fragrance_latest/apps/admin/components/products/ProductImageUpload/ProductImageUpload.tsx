'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './ProductImageUpload.module.scss';
import { Camera } from 'lucide-react'

export type UploadImage = {
  url: string;
  alt?: string;
  isPrimary: boolean;
};

interface ProductImageUploadProps {
  images: UploadImage[];
  onChange: (images: UploadImage[]) => void;
  maxImages?: number;
  uploadUrl?: string;
}

export function ProductImageUpload({
  images,
  onChange,
  maxImages = 8,
  uploadUrl = '/api/admin/uploads',
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    const remaining = maxImages - images.length;
    const accepted = Array.from(files).slice(0, remaining);

    if (accepted.length === 0) {
      setError(`Maksimum ${maxImages} ta rasm yuklash mumkin`);
      return;
    }

    setUploading(true);
    try {
      const uploaded: UploadImage[] = [];

      for (const file of accepted) {
        if (!file.type.startsWith('image/')) continue;

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`Yuklashda xatolik: ${res.status}`);
        }

        const data = (await res.json()) as { url: string };
        uploaded.push({
          url: data.url,
          alt: file.name,
          isPrimary: false,
        });
      }

      const next = [...images, ...uploaded];
      // ensure at least one primary
      if (!next.some((i) => i.isPrimary) && next.length > 0) {
        next[0]!.isPrimary = true;
      }
      onChange(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yuklashda xatolik');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    if (!next.some((i) => i.isPrimary) && next.length > 0) {
      next[0]!.isPrimary = true;
    }
    onChange(next);
  };

  const setPrimary = (index: number) => {
    onChange(images.map((img, i) => ({ ...img, isPrimary: i === index })));
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.dropzone} ${dragOver ? styles.active : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className={styles.dropContent}>
          <div className={styles.icon}><Camera size={24} /></div>
          <p className={styles.text}>
            {uploading
              ? 'Yuklanmoqda...'
              : 'Rasmlarni shu yerga tashlang yoki tanlash uchun bosing'}
          </p>
          <p className={styles.hint}>
            PNG, JPG, WEBP — maks. {maxImages} ta ({images.length}/{maxImages})
          </p>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {images.length > 0 && (
        <div className={styles.grid}>
          {images.map((img, i) => (
            <div
              key={`${img.url}-${i}`}
              className={`${styles.tile} ${img.isPrimary ? styles.primary : ''}`}
            >
              <div className={styles.thumb}>
                <Image
                  src={img.url}
                  alt={img.alt ?? `Rasm ${i + 1}`}
                  fill
                  sizes="120px"
                  unoptimized
                />
              </div>

              {img.isPrimary && <span className={styles.badge}>Asosiy</span>}

              <div className={styles.overlay}>
                {!img.isPrimary && (
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => setPrimary(i)}
                  >
                    Asosiy qilish
                  </button>
                )}
                <button
                  type="button"
                  className={`${styles.actionBtn} ${styles.removeBtn}`}
                  onClick={() => removeImage(i)}
                >
                  O'chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
