"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { dict } from "@/content/dict";
import { homePath, profile, type Locale } from "@/content/site";
import { useInspect } from "./inspect";
import { setScrollLocked } from "./providers";
import { ArrowUpRight, LocalTime, cn } from "./ui";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-10 place-items-center rounded-[12px] bg-accent font-display text-[15px] font-extrabold tracking-[-0.06em] text-bg",
        className,
      )}
    >
      MA
      <span className="absolute -bottom-1 -end-1 size-3 rounded-full border-[3px] border-bg bg-ok" />
    </span>
  );
}

function InspectIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[18px]" aria-hidden>
      <path d="M8.5 16.5H4.5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2.2 2.2" />
      <path d="m10 10 7.5 2.6-3.2 1.2-1.2 3.2L10 10Z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Nav({ lang }: { lang: Locale }) {
  const t = dict[lang].nav;
  const other: Locale = lang === "en" ? "ar" : "en";
  const { on, supported, toggle } = useInspect();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  const links = [
    { id: "about", label: t.about },
    { id: "work", label: t.work },
    { id: "stack", label: t.stack },
    { id: "contact", label: t.contact },
  ];

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 480);
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", "about", "work", "services", "stack", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-full bg-fg px-4 py-2 text-sm text-bg focus:translate-y-0"
      >
        {t.skip}
      </a>

      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent rtl:origin-right"
        style={{ scaleX: progress }}
      />

      <motion.header
        data-inspect-ignore={open || undefined}
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "absolute inset-0 -z-10 border-b transition-all duration-500",
            scrolled && !open ? "border-line bg-bg/70 backdrop-blur-xl" : "border-transparent",
          )}
        />
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[76px]">
          <a href="#top" className="flex items-center gap-3" aria-label={profile.name[lang]}>
            <Logo />
            <span className="hidden leading-tight sm:block">
              <span className="block text-[15px] font-medium">{profile.name[lang]}</span>
              <span className="label block text-[10.5px] text-muted">{profile.role[lang]}</span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-xl">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm transition-colors",
                      active === l.id ? "text-bg" : "text-muted hover:text-fg",
                    )}
                  >
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-fg"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {supported && (
              <button
                type="button"
                onClick={toggle}
                aria-pressed={on}
                title={t.inspectHint}
                className={cn(
                  "hidden h-10 items-center gap-2 rounded-full border px-3 text-sm transition-colors lg:inline-flex",
                  on
                    ? "border-[#6fa8dc]/60 bg-[#6fa8dc]/15 text-[#9cc5ea]"
                    : "border-line text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                <InspectIcon />
                <span>{t.inspect}</span>
                <kbd className="rounded border border-current/30 px-1 font-mono text-[10px] leading-4 opacity-70">I</kbd>
              </button>
            )}
            <Link
              href={homePath(other)}
              hrefLang={other}
              lang={other}
              aria-label={t.switchLabel}
              title={t.switchLabel}
              className="grid size-10 place-items-center rounded-full border border-line text-[15px] font-medium transition-colors hover:border-fg"
            >
              {t.switchTo}
            </Link>
            <a
              href="#contact"
              className="hidden h-10 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-accent md:inline-flex"
            >
              {t.talk}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-line md:hidden"
            >
              <span className="sr-only">{open ? t.close : t.menu}</span>
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-[1.5px] rounded bg-fg transition-transform duration-300",
                    open && "translate-y-[5.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-[1.5px] rounded bg-fg transition-transform duration-300",
                    open && "-translate-y-[5.25px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-inspect-ignore
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-24 pb-8 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="wrap flex-1">
              <ul className="border-t border-line">
                {links.map((l, i) => (
                  <motion.li
                    key={l.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 font-display text-5xl font-semibold tracking-[-0.03em]"
                    >
                      {l.label}
                      <span className="label text-dim">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="wrap mt-8 space-y-4 text-sm">
              <a href={`mailto:${profile.email}`} className="block break-all text-lg" dir="ltr">
                {profile.email}
              </a>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-muted">
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                    {s.label}
                    <ArrowUpRight className="size-3" />
                  </a>
                ))}
              </div>
              <p className="label text-dim">
                Cairo · <LocalTime seconds={false} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
