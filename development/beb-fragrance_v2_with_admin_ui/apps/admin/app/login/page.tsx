'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 'phone' | 'otp';

interface ApiError {
  message: string;
  code?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 60;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPhone(raw: string): string {
  // +998 90 123 45 67
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('998')) {
    const local = digits.slice(3);
    const parts = [local.slice(0, 2), local.slice(2, 5), local.slice(5, 7), local.slice(7, 9)].filter(Boolean);
    return '+998 ' + parts.join(' ');
  }
  return raw;
}

function sanitizePhone(value: string): string {
  // keep only + and digits, max 13 chars (+998XXXXXXXXX)
  const cleaned = value.replace(/[^\d+]/g, '').slice(0, 13);
  if (cleaned && !cleaned.startsWith('+')) return '+' + cleaned;
  return cleaned;
}

function isValidPhone(phone: string): boolean {
  return /^\+998[0-9]{9}$/.test(phone);
}

// ─── API calls ────────────────────────────────────────────────────────────────

async function apiSendOtp(phone: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? 'OTP yuborishda xato');
  }
}

async function apiVerifyOtp(phone: string, otp: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
  const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? 'OTP tekshirishda xato');
  return data.data;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    if (token) router.replace('/');
  }, [router]);

  // countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resendTimer]);

  // ── Step 1: send OTP ────────────────────────────────────────────────────────

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!isValidPhone(phone)) {
      setError("Telefon raqam noto'g'ri. Masalan: +998901234567");
      return;
    }

    setIsLoading(true);
    try {
      await apiSendOtp(phone);
      setStep('otp');
      setResendTimer(RESEND_TIMEOUT);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // ── Step 2: verify OTP ──────────────────────────────────────────────────────

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      setError("OTP kodni to'liq kiriting");
      return;
    }

    setIsLoading(true);
    try {
      const result = await apiVerifyOtp(phone, code);

      // Only allow admin
      if (result.user.role !== 'admin') {
        setError("Sizda admin huquqi yo'q. Iltimos, admin akkauntidan kiring.");
        setIsLoading(false);
        return;
      }

      localStorage.setItem('admin_access_token', result.accessToken);
      localStorage.setItem('admin_refresh_token', result.refreshToken);
      localStorage.setItem('admin_user', JSON.stringify(result.user));

      router.replace('/');
    } catch (err: any) {
      setError(err.message);
      // clear OTP on wrong code
      if (err.message.includes("noto'g'ri") || err.message.toLowerCase().includes('invalid')) {
        setOtp(Array(OTP_LENGTH).fill(''));
        setTimeout(() => otpRefs.current[0]?.focus(), 50);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // ── OTP input handlers ──────────────────────────────────────────────────────

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError('');

    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    // auto-submit when all filled
    if (digit && next.every(d => d !== '')) {
      // small delay so state updates
      setTimeout(() => {
        const form = document.getElementById('otp-form') as HTMLFormElement;
        form?.requestSubmit();
      }, 50);
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) otpRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((d, i) => { next[i] = d; });
    setOtp(next);
    const lastFilled = Math.min(pasted.length, OTP_LENGTH - 1);
    otpRefs.current[lastFilled]?.focus();
  }

  async function handleResend() {
    if (resendTimer > 0) return;
    setError('');
    setOtp(Array(OTP_LENGTH).fill(''));
    setIsLoading(true);
    try {
      await apiSendOtp(phone);
      setResendTimer(RESEND_TIMEOUT);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoBox}>
            <span style={styles.logoText}>BEB</span>
          </div>
          <p style={styles.logoSub}>Admin Panel</p>
        </div>

        {step === 'phone' ? (
          /* ── Phone step ── */
          <form onSubmit={handleSendOtp} style={styles.form} noValidate>
            <div style={styles.headingGroup}>
              <h1 style={styles.heading}>Kirish</h1>
              <p style={styles.subheading}>Telefon raqamingizni kiriting</p>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="phone">Telefon raqam</label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={e => {
                  setPhone(sanitizePhone(e.target.value));
                  setError('');
                }}
                style={{
                  ...styles.input,
                  borderColor: error ? '#ef4444' : 'var(--color-border, #2a2a2a)',
                }}
                disabled={isLoading}
                autoFocus
              />
              {error && <p style={styles.errorText}>{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || !phone}
              style={{
                ...styles.btn,
                opacity: isLoading || !phone ? 0.6 : 1,
                cursor: isLoading || !phone ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? (
                <span style={styles.spinner} />
              ) : (
                'OTP kod yuborish →'
              )}
            </button>

            <p style={styles.hint}>
              Faqat admin roli bo'lgan foydalanuvchilar kirishi mumkin
            </p>
          </form>
        ) : (
          /* ── OTP step ── */
          <form id="otp-form" onSubmit={handleVerifyOtp} style={styles.form} noValidate>
            <div style={styles.headingGroup}>
              <h1 style={styles.heading}>Kodni kiriting</h1>
              <p style={styles.subheading}>
                <strong style={{ color: 'var(--color-text, #fff)' }}>{formatPhone(phone)}</strong>
                {' '}raqamiga 6 xonali kod yuborildi
              </p>
            </div>

            {/* OTP boxes */}
            <div style={styles.otpRow} onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                  disabled={isLoading}
                  style={{
                    ...styles.otpBox,
                    borderColor: error
                      ? '#ef4444'
                      : digit
                      ? 'var(--color-primary, #d4af37)'
                      : 'var(--color-border, #2a2a2a)',
                    background: digit ? 'var(--color-primary-10, #d4af3715)' : 'var(--color-surface, #111)',
                    color: 'var(--color-text, #fff)',
                  }}
                />
              ))}
            </div>

            {error && <p style={{ ...styles.errorText, textAlign: 'center' }}>{error}</p>}

            <button
              type="submit"
              disabled={isLoading || otp.some(d => !d)}
              style={{
                ...styles.btn,
                opacity: isLoading || otp.some(d => !d) ? 0.6 : 1,
                cursor: isLoading || otp.some(d => !d) ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? <span style={styles.spinner} /> : 'Tasdiqlash'}
            </button>

            {/* Resend + back */}
            <div style={styles.otpFooter}>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0 || isLoading}
                style={{
                  ...styles.ghostBtn,
                  opacity: resendTimer > 0 ? 0.5 : 1,
                  cursor: resendTimer > 0 ? 'default' : 'pointer',
                }}
              >
                {resendTimer > 0 ? `Qayta yuborish (${resendTimer}s)` : 'Qayta yuborish'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp(Array(OTP_LENGTH).fill(''));
                  setError('');
                }}
                style={styles.ghostBtn}
              >
                ← Raqamni o'zgartirish
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Background decoration */}
      <div style={styles.bgDeco1} aria-hidden />
      <div style={styles.bgDeco2} aria-hidden />
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-bg, #0a0a0a)',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: 'var(--color-surface, #111)',
    border: '1px solid var(--color-border, #2a2a2a)',
    borderRadius: '16px',
    padding: '40px 36px',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
  },
  logoWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
    gap: '8px',
  },
  logoBox: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    background: 'var(--color-primary, #d4af37)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: 800,
    fontSize: '18px',
    color: '#000',
    letterSpacing: '0.05em',
  },
  logoSub: {
    fontSize: '13px',
    color: 'var(--color-text-secondary, #888)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  headingGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  heading: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--color-text, #fff)',
    margin: 0,
  },
  subheading: {
    fontSize: '14px',
    color: 'var(--color-text-secondary, #888)',
    margin: 0,
    lineHeight: 1.5,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-text-secondary, #888)',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid var(--color-border, #2a2a2a)',
    background: 'var(--color-bg, #0a0a0a)',
    color: 'var(--color-text, #fff)',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    letterSpacing: '0.02em',
  },
  errorText: {
    fontSize: '12px',
    color: '#ef4444',
    margin: 0,
  },
  btn: {
    width: '100%',
    padding: '13px',
    borderRadius: '8px',
    border: 'none',
    background: 'var(--color-primary, #d4af37)',
    color: '#000',
    fontWeight: 700,
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'opacity 0.2s, transform 0.1s',
    minHeight: '46px',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid rgba(0,0,0,0.3)',
    borderTop: '2px solid #000',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  },
  hint: {
    fontSize: '12px',
    color: 'var(--color-text-secondary, #555)',
    textAlign: 'center',
    margin: 0,
    lineHeight: 1.5,
  },
  otpRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  otpBox: {
    width: '48px',
    height: '56px',
    borderRadius: '10px',
    border: '1px solid',
    fontSize: '22px',
    fontWeight: 700,
    textAlign: 'center',
    outline: 'none',
    transition: 'border-color 0.15s, background 0.15s',
    caretColor: 'transparent',
  },
  otpFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  ghostBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-secondary, #888)',
    fontSize: '13px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'color 0.2s',
    textDecoration: 'underline',
    textDecorationColor: 'transparent',
  },
  bgDeco1: {
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDeco2: {
    position: 'absolute',
    bottom: '-80px',
    left: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
};
