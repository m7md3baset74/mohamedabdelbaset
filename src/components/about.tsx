"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { dict } from "@/content/dict";
import { profile, type Locale } from "@/content/site";
import { CountUp, DownloadIcon, Reveal, SectionLabel } from "./ui";

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={accent ? "accent-word" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Words light up one by one as the paragraph scrolls through the viewport. `*word*` = accent. */
function ScrollLitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={w.startsWith("*")}>
          {w.replace(/\*/g, "")}
        </Word>
      ))}
    </p>
  );
}

export function About({ lang }: { lang: Locale }) {
  const t = dict[lang].about;
  return (
    <section id="about" className="wrap pt-28 pb-16 md:pt-40 md:pb-20">
      <SectionLabel index="01">{t.label}</SectionLabel>

      <ScrollLitText
        text={t.statement}
        className="mt-10 font-display text-[clamp(1.85rem,3.9vw,3.9rem)] leading-[1.1] font-medium tracking-[-0.03em] md:mt-14"
      />

      <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="max-w-md text-[17px] leading-relaxed text-muted">{t.body}</p>
          <a
            href={profile.cv}
            download
            className="group mt-8 inline-flex items-center gap-3 border-b border-line-strong pb-1.5 text-[15px] transition-colors hover:border-accent hover:text-accent"
          >
            {t.cv}
            <DownloadIcon className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </Reveal>

        <dl className="grid grid-cols-2 border-s border-t border-line md:col-span-7">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col-reverse justify-between gap-6 border-e border-b border-line p-5 md:min-h-[210px] md:p-8">
              <dt className="max-w-[16ch] text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none font-semibold tracking-[-0.05em]">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
