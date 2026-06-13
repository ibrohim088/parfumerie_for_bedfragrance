/**
 * 🌐 API xizmati — backend bilan ishlash uchun markazlashtirilgan klient
 *
 * Botning barcha handler/scene'lari backendga (`API_BASE_URL`) so'rov
 * yuborishda shu modulni ishlatishi tavsiya etiladi. Bu quyidagilarni
 * bir joyga jamlaydi:
 *
 *  - `axios` instance (base URL, timeout, default header'lar)
 *  - Avtorizatsiya header'ini sessiyadan olish (`ctx.session.token`)
 *  - Backend javob formatini bir xil ko'rinishga keltirish
 *    (`{ success, data, message }` → faqat `data`)
 *  - Xatoliklarni foydalanuvchiga ko'rsatish uchun tilga mos
 *    (uz/ru) matnga aylantirish
 *
 * Backend javob formati (`apiResponse` / controller'lar):
 *  - Muvaffaqiyatli: `{ success: true, data: T, message?: string }`
 *  - Ro'yxatlar uchun: `{ success: true, data: { data: T[], pagination: {...} } }`
 *  - Xatolik: `{ success: false, message: string, code?: string, errors?: [...] }`
 */

import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from 'axios';
import { BotContext } from '../types/context';
import { API_BASE_URL } from '../config/bot';

// ──────────────────────────────────────────────────────────────────────
// Tiplar
// ──────────────────────────────────────────────────────────────────────

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  errors?: { field: string; message: string }[];
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/** Paginatsiyalangan ro'yxat javobi: `{ data: { data: T[], pagination } }` */
export interface PaginatedResult<T> {
  data: T[];
  pagination: Pagination;
}

// ──────────────────────────────────────────────────────────────────────
// Axios instance
// ──────────────────────────────────────────────────────────────────────

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ──────────────────────────────────────────────────────────────────────
// Avtorizatsiya header'i
// ──────────────────────────────────────────────────────────────────────

/**
 * `ctx.session.token` mavjud bo'lsa, `Authorization: Bearer <token>`
 * header'ini qaytaradi. Token yo'q bo'lsa — bo'sh obyekt
 * (so'rov anonim yuboriladi).
 */
export function getAuthHeaders(ctx: BotContext): Record<string, string> {
  const token = ctx.session?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ──────────────────────────────────────────────────────────────────────
// Generik so'rov yordamchilari
// ──────────────────────────────────────────────────────────────────────

/**
 * `GET <path>` so'rovini yuboradi va `data.data` qismini qaytaradi.
 *
 * @param path   API yo'li, masalan `/products` yoki `/users/me`
 * @param ctx    Bot konteksti — token mavjud bo'lsa avtomatik qo'shiladi
 * @param config Qo'shimcha axios konfiguratsiyasi (masalan, `params`)
 */
export async function apiGet<T>(
  path: string,
  ctx?: BotContext,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.get<ApiSuccessResponse<T>>(path, {
    ...config,
    headers: { ...(ctx ? getAuthHeaders(ctx) : {}), ...config?.headers },
  });
  return response.data.data;
}

/**
 * Paginatsiyalangan ro'yxat qaytaradigan endpoint'lar uchun
 * (`{ data: { data: T[], pagination } }`).
 */
export async function apiGetPaginated<T>(
  path: string,
  ctx?: BotContext,
  config?: AxiosRequestConfig
): Promise<PaginatedResult<T>> {
  return apiGet<PaginatedResult<T>>(path, ctx, config);
}

/** `POST <path>` so'rovini yuboradi va `data.data` qismini qaytaradi. */
export async function apiPost<T>(
  path: string,
  body?: unknown,
  ctx?: BotContext,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.post<ApiSuccessResponse<T>>(path, body, {
    ...config,
    headers: { ...(ctx ? getAuthHeaders(ctx) : {}), ...config?.headers },
  });
  return response.data.data;
}

/** `PUT <path>` so'rovini yuboradi va `data.data` qismini qaytaradi. */
export async function apiPut<T>(
  path: string,
  body?: unknown,
  ctx?: BotContext,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.put<ApiSuccessResponse<T>>(path, body, {
    ...config,
    headers: { ...(ctx ? getAuthHeaders(ctx) : {}), ...config?.headers },
  });
  return response.data.data;
}

/** `PATCH <path>` so'rovini yuboradi va `data.data` qismini qaytaradi. */
export async function apiPatch<T>(
  path: string,
  body?: unknown,
  ctx?: BotContext,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.patch<ApiSuccessResponse<T>>(path, body, {
    ...config,
    headers: { ...(ctx ? getAuthHeaders(ctx) : {}), ...config?.headers },
  });
  return response.data.data;
}

/** `DELETE <path>` so'rovini yuboradi va `data.data` qismini qaytaradi. */
export async function apiDelete<T = void>(
  path: string,
  ctx?: BotContext,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.delete<ApiSuccessResponse<T>>(path, {
    ...config,
    headers: { ...(ctx ? getAuthHeaders(ctx) : {}), ...config?.headers },
  });
  return response.data.data;
}

// ──────────────────────────────────────────────────────────────────────
// Xatoliklarni aniqlash va tarjima qilish
// ──────────────────────────────────────────────────────────────────────

/** Berilgan xatolik HTTP 401 (avtorizatsiya talab qilinadi) ekanini tekshiradi. */
export function isUnauthorizedError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401;
}

/** Berilgan xatolik HTTP 429 (juda ko'p so'rov) ekanini tekshiradi. */
export function isRateLimitError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 429;
}

/**
 * Axios xatosidan backend qaytargan xabarni (`message`) oladi, agar
 * mavjud bo'lmasa — tilga mos umumiy xatolik matnini qaytaradi.
 *
 * Handler/scene'larda `catch` bloklarida ishlatish uchun:
 *
 * ```ts
 * catch (error) {
 *   await ctx.reply(getErrorMessage(error, lang));
 * }
 * ```
 */
export function getErrorMessage(error: unknown, lang: 'uz' | 'ru' = 'uz'): string {
  const fallback =
    lang === 'uz'
      ? "❌ Xatolik yuz berdi. Keyinroq urinib ko'ring."
      : '❌ Произошла ошибка. Попробуйте позже.';

  if (!axios.isAxiosError(error)) return fallback;

  const axiosError = error as AxiosError<ApiErrorResponse>;
  const backendMessage = axiosError.response?.data?.message;

  return backendMessage || fallback;
}
