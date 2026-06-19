import nodemailer from 'nodemailer';
import { env } from './env';

// ── Transporter ────────────────────────────────────────────────
// .env da SMTP sozlamalari bo'lsa — ularni ishlatamiz.
// Aks holda development uchun Ethereal (fake SMTP) avtomatik yaratiladi.

let transporter: nodemailer.Transporter | null = null;

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporter) return transporter;

  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    // Real SMTP (Gmail, Yandex, boshqa provider)
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 587,
      secure: (env.SMTP_PORT ?? 587) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  } else {
    // Development: Ethereal test akkaunt (haqiqiy email yuborilmaydi,
    // lekin https://ethereal.email da ko'rish mumkin)
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('📧 Ethereal test akkaunt yaratildi:');
    console.log(`   User: ${testAccount.user}`);
    console.log(`   Pass: ${testAccount.pass}`);
    console.log('   https://ethereal.email da emaillarni ko\'rish mumkin');
  }

  return transporter;
}

// ── OTP Email yuborish ─────────────────────────────────────────

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  previewUrl?: string; // Ethereal preview (faqat development)
  error?: string;
}

export async function sendOtpEmail(
  email: string,
  otp: string,
  phone: string,
): Promise<EmailSendResult> {
  try {
    const t = await getTransporter();

    const info = await t.sendMail({
      from: env.SMTP_FROM ?? '"BEB Fragrance" <noreply@bebfragrance.uz>',
      to: email,
      subject: 'BEB Fragrance — Tasdiqlash kodi',
      text: `Sizning tasdiqlash kodingiz: ${otp}\nTelefon: ${phone}\nKod 5 daqiqa davomida amal qiladi.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f9f6f2;border-radius:12px;">
          <h2 style="color:#1a1a1a;margin-bottom:8px;">BEB Fragrance</h2>
          <p style="color:#555;margin-bottom:24px;">Ro'yxatdan o'tishni tasdiqlash</p>
          <div style="background:#fff;border-radius:8px;padding:24px;text-align:center;border:1px solid #e8e0d8;">
            <p style="color:#888;font-size:14px;margin-bottom:8px;">Tasdiqlash kodi</p>
            <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#1a1a1a;">${otp}</div>
            <p style="color:#aaa;font-size:12px;margin-top:12px;">5 daqiqa davomida amal qiladi</p>
          </div>
          <p style="color:#888;font-size:12px;margin-top:20px;text-align:center;">
            Ushbu kodni hech kimga bermang. BEB Fragrance xodimlari uni so'ramaydi.
          </p>
        </div>
      `,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;

    if (previewUrl) {
      console.log(`📧 OTP email (Ethereal preview): ${previewUrl}`);
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl || undefined,
    };
  } catch (error: any) {
    console.error('Email yuborishda xato:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
