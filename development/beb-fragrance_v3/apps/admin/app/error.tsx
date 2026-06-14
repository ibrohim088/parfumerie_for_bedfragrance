"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Error]", error);
    // TODO: Sentry/logger ga yuborish
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
          Nimadir noto'g'ri ketdi
        </h1>
        <p
          style={{
            marginTop: "0.75rem",
            color: "var(--color-text-muted)",
            fontSize: "0.95rem",
          }}
        >
          Sahifani yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
        </p>

        {error.digest && (
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              fontFamily: "monospace",
            }}
          >
            Xato ID: {error.digest}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            marginTop: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: 8,
              border: "none",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              fontWeight: 500,
            }}
          >
            Qayta urinish
          </button>
          <a
            href="/"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              backgroundColor: "transparent",
              color: "var(--color-text)",
              fontWeight: 500,
            }}
          >
            Bosh sahifaga
          </a>
        </div>
      </div>
    </main>
  );
}
