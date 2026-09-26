"use client";

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "motion/react";
import { profile } from "@/content/site";

import { cn } from "@/lib/cn";

export { cn };

/** "(01) — About" style eyebrow used at the top of every section. */
export function SectionLabel({ index, children, className }: { index: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("label flex items-center gap-3 text-muted", className)}>
      <span className="text-accent">({index})</span>
      <span className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}

/** Fades and lifts its children in when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Pulls its child gently toward the pointer. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

type ButtonProps = ComponentProps<"a"> & { variant?: "solid" | "ghost"; icon?: ReactNode };

export function PillLink({ variant = "solid", icon, className, children, ...rest }: ButtonProps) {
  return (
    <a
      {...rest}
      className={cn(
        "group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full ps-6 pe-2 text-[15px] font-medium transition-colors duration-300",
        variant === "solid"
          ? "bg-fg text-bg hover:bg-accent hover:text-bg"
          : "border border-line-strong text-fg hover:border-fg",
        className,
      )}
    >
      <span className="relative">{children}</span>
      <span
        className={cn(
          "grid size-8 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:-rotate-45 rtl:group-hover:rotate-45",
          variant === "solid" ? "bg-bg text-fg" : "bg-raised text-fg",
        )}
      >
        {icon ?? <ArrowIcon />}
      </span>
    </a>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn("size-4 rtl:-scale-x-100", className)} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn("size-4 rtl:-scale-x-100", className)} aria-hidden>
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn("size-4", className)} aria-hidden>
      <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Live clock in Cairo, rendered client-side only to avoid hydration mismatches. */
export function LocalTime({ showZone = true, seconds = true }: { showZone?: boolean; seconds?: boolean }) {
  const [now, setNow] = useState<{ time: string; zone: string } | null>(null);

  useEffect(() => {
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: seconds ? "2-digit" : undefined,
      hour12: false,
    });
    const zone = new Intl.DateTimeFormat("en-US", { timeZone: profile.timeZone, timeZoneName: "shortOffset" });
    const tick = () => {
      const d = new Date();
      setNow({
        time: time.format(d),
        zone: zone.formatToParts(d).find((p) => p.type === "timeZoneName")?.value ?? "",
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return (
    <span dir="ltr" className="tabular-nums">
      {now ? now.time : seconds ? "--:--:--" : "--:--"}
      {showZone && now?.zone ? ` ${now.zone}` : ""}
    </span>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/** Tiny hook for media queries (false during SSR). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return matches;
}
