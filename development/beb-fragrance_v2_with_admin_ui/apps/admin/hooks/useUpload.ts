// apps/admin/components/hooks/useUpload.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import api from '@/lib/api';

interface UploadResponse {
  url: string;
  key: string;
  filename: string;
}

interface UseUploadOptions {
  maxSize?: number; // bytes
  acceptedTypes?: string[];
  onSuccess?: (urls: string[]) => void;
  onError?: (error: string) => void;
}

export function useUpload(options: UseUploadOptions = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    onSuccess,
    onError,
  } = options;

  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async (files: File | File[]) => {
      const fileArray = Array.isArray(files) ? files : [files];
      const uploadedUrls: string[] = [];

      setIsUploading(true);
      setProgress(0);

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];

        // Validation
        if (!acceptedTypes.includes(file.type)) {
          throw new Error(`Noto'g'ri fayl turi: ${file.type}. Faqat rasmlar qabul qilinadi.`);
        }
        if (file.size > maxSize) {
          throw new Error(`Fayl hajmi juda katta. Maksimal: ${Math.round(maxSize / 1024 / 1024)}MB`);
        }

        const formData = new FormData();
        formData.append('file', file);

        // Progress simulation + real upload
        const { data } = await api.post<UploadResponse>('/admin/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(Math.round(((i + 1) / fileArray.length) * percent * 0.95));
          },
        });

        uploadedUrls.push(data.url);
        setProgress(Math.round(((i + 1) / fileArray.length) * 100));
      }

      return uploadedUrls;
    },
    onSuccess: (urls) => {
      onSuccess?.(urls);
      setProgress(100);
      setTimeout(() => setProgress(0), 800);
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || err?.message || 'Yuklashda xatolik yuz berdi';
      onError?.(message);
      setProgress(0);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const uploadFiles = async (files: File | File[]) => {
    return uploadMutation.mutateAsync(files);
  };

  const uploadSingle = async (file: File) => {
    return uploadFiles(file).then(urls => urls[0]);
  };

  return {
    uploadFiles,
    uploadSingle,
    isUploading: isUploading || uploadMutation.isPending,
    progress,
    error: uploadMutation.error?.message,
    reset: () => {
      setProgress(0);
      uploadMutation.reset();
    },
  };
}