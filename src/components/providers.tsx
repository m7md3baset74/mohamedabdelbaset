"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { MotionConfig } from "motion/react";
import { InspectProvider } from "./inspect";
import { dict } from "@/content/dict";
import type { Locale } from "@/content/site";

let lenis: Lenis | null = null;

/** Smooth-scroll to an element or offset; falls back to native scrolling. */
export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -72 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

/** Freeze page scrolling (e.g. while the mobile menu is open). */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -72 } });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

export function Providers({ children, lang }: { children: ReactNode; lang: Locale }) {
  return (
    <MotionConfig reducedMotion="user">
      <InspectProvider labels={dict[lang].inspect}>
        <SmoothScroll />
        {children}
      </InspectProvider>
    </MotionConfig>
  );
}
