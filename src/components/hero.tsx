"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { dict } from "@/content/dict";
import { profile, type Locale } from "@/content/site";
import { InspectDemo, useInspect } from "./inspect";
import { DownloadIcon, LocalTime, Magnetic, PillLink } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Masked rise-in. Latin splits per letter; Arabic per word so letters stay joined. */
function RiseText({ text, lang, delay = 0 }: { text: string; lang: Locale; delay?: number }) {
  const parts = lang === "ar" ? text.split(" ") : Array.from(text);
  return (
    <span aria-hidden className="inline-block whitespace-nowrap">
      {parts.map((part, i) => (
        <span key={i} className="-mt-[0.1em] -mb-[0.16em] inline-block overflow-hidden pt-[0.1em] pb-[0.16em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ delay: delay + i * (lang === "ar" ? 0.12 : 0.045), duration: 1.1, ease: EASE }}
          >
            {part}
            {lang === "ar" && i < parts.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function FadeIn({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Hero({ lang }: { lang: Locale }) {
  const t = dict[lang].hero;
  const ref = useRef<HTMLElement>(null);
  const { supported } = useInspect();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const otherName = lang === "en" ? profile.name.ar : profile.name.en;

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 pb-8 md:pt-28">
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -top-[20%] end-[-10%] -z-10 size-[70vmax] rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 60%)" }}
      />

      <motion.div style={{ y, opacity: fade }} className="wrap relative flex flex-1 flex-col">
        <FadeIn delay={0.1} className="flex flex-wrap items-center justify-between gap-3">
          <span data-demo data-name="status" className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 ps-2.5 pe-3.5 text-[13px] backdrop-blur">
            <span className="relative flex size-2">
              <span className="ping-soft absolute inset-0 rounded-full bg-ok" />
              <span className="relative size-2 rounded-full bg-ok" />
            </span>
            {t.available}
          </span>
          <span className="label text-muted">
            {t.based} <span className="text-dim">—</span> <LocalTime />
          </span>
        </FadeIn>

        <h1
          aria-label={`${profile.name[lang]}${lang === "ar" ? "،" : ","} ${profile.role[lang]}`}
          className="mt-auto pt-16 font-display font-bold leading-[0.86] tracking-[-0.055em] [font-stretch:92%]"
        >
          <span data-demo data-name="first-name" className="block w-fit text-[19vw] md:text-[clamp(3.4rem,14.5vw,15.5rem)]">
            <RiseText text={profile.first[lang]} lang={lang} delay={0.25} />
          </span>
          <span className="flex items-end justify-between gap-6">
            <FadeIn delay={1.1} className="mb-[1.4vw] hidden max-w-[15rem] shrink-0 lg:block">
              <span className="label block text-muted">{profile.role[lang]}</span>
              <span className="mt-2 block text-[15px] font-normal leading-snug tracking-normal text-dim">
                React · Next.js · TypeScript
              </span>
              <span lang={lang === "en" ? "ar" : "en"} className="mt-3 block font-display text-2xl font-semibold tracking-normal text-accent">
                {otherName}
              </span>
            </FadeIn>
            <span data-demo data-name="last-name" className="ms-auto block w-fit text-[19vw] md:text-[clamp(3.4rem,14.5vw,15.5rem)]">
              <RiseText text={profile.last[lang]} lang={lang} delay={0.5} />
            </span>
          </span>
        </h1>

        <FadeIn delay={1.25} className="mt-8 grid grid-cols-1 gap-8 border-t border-line pt-6 md:mt-10 md:grid-cols-12 md:items-end">
          <p data-demo data-name="tagline" className="max-w-md text-[17px] leading-relaxed text-muted md:col-span-6 lg:col-span-5">
            {t.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7">
            <Magnetic>
              <PillLink href="#work" data-demo data-name="cta">
                {t.ctaWork}
              </PillLink>
            </Magnetic>
            <Magnetic>
              <PillLink href={profile.cv} download variant="ghost" icon={<DownloadIcon />}>
                {t.ctaCv}
              </PillLink>
            </Magnetic>
          </div>
        </FadeIn>

        <FadeIn delay={1.5} className="mt-8 flex items-center justify-between">
          <span className="label flex items-center gap-3 text-dim">
            <span className="relative h-8 w-px overflow-hidden bg-line-strong">
              <motion.span
                className="absolute inset-x-0 top-0 h-3 bg-fg"
                animate={{ y: ["-100%", "280%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            {t.scroll}
          </span>
          {supported && (
            <span className="label hidden items-center gap-2 text-dim lg:flex">
              <kbd className="rounded border border-line-strong px-1.5 py-0.5 font-mono text-[10px] text-muted">I</kbd>
              {t.tip}
            </span>
          )}
        </FadeIn>
      </motion.div>

      <InspectDemo containerRef={ref} labels={dict[lang].inspect} startDelay={2400} />
    </section>
  );
}
