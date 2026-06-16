import axios from 'axios';
import { env } from './env';

const ESKIZ_BASE_URL = 'https://notify.eskiz.uz/api';

// ── Token cache ────────────────────────────────────────────────

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

async function getEskizToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await axios.post(`${ESKIZ_BASE_URL}/auth/login`, {
    email: env.SMS_EMAIL,
    password: env.SMS_SECRET,
  });

  const token: string = response.data?.data?.token;
  if (!token) {
    throw new Error('Eskiz token olishda xato');
  }

  cachedToken = token;
  // 29 kun (Eskiz token 30 kun ishlaydi)
  tokenExpiresAt = now + 29 * 24 * 60 * 60 * 1000;

  return token;
}

// ── SMS yuborish ───────────────────────────────────────────────

export interface SmsSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendSms(
  phone: string,
  message: string,
): Promise<SmsSendResult> {
  try {
    const token = await getEskizToken();

    // Eskiz "+998XXXXXXXXX" formatini kutadi
    const normalizedPhone = phone.startsWith('+') ? phone.slice(1) : phone;

    const response = await axios.post(
      `${ESKIZ_BASE_URL}/message/sms/send`,
      {
        mobile_phone: normalizedPhone,
        message,
        from: '4546',
        callback_url: '',
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return {
      success: true,
      messageId: response.data?.id,
    };
  } catch (error: any) {
    console.error('SMS yuborishda xato:', error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data?.message || 'SMS yuborishda xato',
    };
  }
}

// ── OTP SMS shabloni ───────────────────────────────────────────

export async function sendOtpSms(
  phone: string,
  otp: string,
): Promise<SmsSendResult> {
  const message = `BEB Fragrance: tasdiqlash kodi ${otp}. Hech kimga bermang!`;
  return sendSms(phone, message);
}