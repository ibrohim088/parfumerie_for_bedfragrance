import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sahifa topilmadi — 404",
};

export default function NotFound() {
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
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <h1 style={{ fontSize: "5rem", fontWeight: 700, margin: 0 }}>404</h1>
        <h2 style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>
          Sahifa topilmadi
        </h2>
        <p
          style={{
            marginTop: "0.75rem",
            color: "var(--color-text-muted)",
            fontSize: "0.95rem",
          }}
        >
          Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: 8,
            backgroundColor: "var(--color-primary)",
            color: "var(--color-on-primary)",
            fontWeight: 500,
          }}
        >
          Dashboardga qaytish
        </Link>
      </div>
    </main>
  );
}
