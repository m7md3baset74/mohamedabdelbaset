import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "./fonts";

export const metadata: Metadata = {
  title: "404 — Mohamed Abdelbaset",
  description: "This page doesn't exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main className="wrap flex min-h-[100svh] flex-col justify-center py-16">
          <p className="label text-accent">Uncaught TypeError</p>
          <h1 className="mt-6 font-display text-[clamp(6rem,24vw,22rem)] leading-[0.8] font-bold tracking-[-0.06em]">404</h1>
          <div className="mt-10 max-w-xl rounded-xl border border-line bg-surface p-5 font-mono text-[13px] leading-relaxed">
            <p>
              <span className="text-[#ff7a7a]">✕</span>{" "}
              <span className="text-muted">document.querySelector(</span>
              <span className="text-[#a6d9a0]">&quot;this-page&quot;</span>
              <span className="text-muted">)</span>
            </p>
            <p className="mt-1 text-dim">→ null · page not found in the DOM</p>
          </div>
          <Link
            href="/"
            className="mt-10 inline-flex h-12 w-fit items-center rounded-full bg-fg px-6 text-[15px] font-medium text-bg transition-colors hover:bg-accent"
          >
            Back to the homepage
          </Link>
        </main>
      </body>
    </html>
  );
}
