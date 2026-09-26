"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { dict } from "@/content/dict";
import {
  archiveProjects,
  displayUrl,
  featuredProjects,
  profile,
  projects,
  type Locale,
  type Project,
} from "@/content/site";
import { ArrowUpRight, PillLink, Reveal, SectionLabel, cn, useMediaQuery } from "./ui";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-4", className)} fill="currentColor" aria-hidden>
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

export function BrowserFrame({ project, lang, className }: { project: Project; lang: Locale; className?: string }) {
  return (
    <div
      dir="ltr"
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-[#0a0a0a] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-raised px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-bg/70 px-3 py-1 font-mono text-[11px] text-muted">
          <svg viewBox="0 0 16 16" className="size-3 shrink-0" fill="none" aria-hidden>
            <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <span className="truncate">{displayUrl(project)}</span>
        </span>
        <span className="w-[46px]" aria-hidden />
      </div>
      <div className="relative aspect-[16/10] flex-1 overflow-hidden md:aspect-auto">
        <Image
          src={project.image}
          alt={`${project.title[lang]} — screenshot`}
          fill
          sizes="(min-width: 1440px) 820px, (min-width: 768px) 58vw, 100vw"
          className={cn(
            "transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.035]",
            project.fit === "contain" ? "object-contain" : "object-cover object-top",
          )}
          style={project.position ? { objectPosition: project.position } : undefined}
        />
      </div>
    </div>
  );
}

function FeaturedCard({
  project: p,
  index,
  total,
  progress,
  stacked,
  lang,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
  lang: Locale;
}) {
  const t = dict[lang].work;
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.05]);
  const shade = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.55]);
  const glowX = lang === "ar" ? "15%" : "85%";

  return (
    <div className="mb-6 md:sticky md:top-0 md:mb-0 md:flex md:h-screen md:items-center">
      <motion.article
        style={stacked ? { scale, top: `calc(-4vh + ${index * 26}px)` } : undefined}
        className="group relative w-full origin-top overflow-hidden rounded-[28px] border border-line bg-surface md:h-[min(78vh,760px)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(55% 75% at ${glowX} 15%, ${p.tint}2e, transparent 70%)` }}
        />
        <div className="relative grid h-full grid-cols-1 gap-8 p-5 md:grid-cols-12 md:gap-10 md:p-10">
          <div className="flex flex-col md:col-span-5">
            <div className="label flex items-center justify-between gap-4 text-muted">
              <span>
                <span className="text-fg">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full" style={{ background: p.tint }} />
                {p.kind[lang]}
              </span>
            </div>
            <h3 className="mt-8 font-display text-[clamp(2.2rem,4.4vw,4.2rem)] leading-[0.95] font-semibold tracking-[-0.045em] md:mt-10">
              {p.title[lang]}
            </h3>
            <div className="mt-5 md:mt-auto">
              <p className="max-w-md leading-relaxed text-muted">{p.summary[lang]}</p>
              <ul className="mt-6 flex flex-wrap gap-2" dir="ltr" aria-label="Stack">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-bg/40 px-3 py-1 font-mono text-[11px] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {p.live && (
                  <PillLink href={p.live} target="_blank" rel="noreferrer" icon={<ArrowUpRight />}>
                    {t.visit}
                  </PillLink>
                )}
                {p.repo && (
                  <PillLink href={p.repo} target="_blank" rel="noreferrer" variant="ghost" icon={<GitHubIcon />}>
                    {t.code}
                  </PillLink>
                )}
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <BrowserFrame project={p} lang={lang} className="h-full" />
          </div>
        </div>
        {stacked && <motion.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-bg" />}
      </motion.article>
    </div>
  );
}

function FeaturedStack({ lang }: { lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stacked = useMediaQuery("(min-width: 768px)");
  return (
    <div ref={ref} className="wrap mt-14 md:mt-10">
      {featuredProjects.map((p, i) => (
        <FeaturedCard
          key={p.slug}
          project={p}
          index={i}
          total={featuredProjects.length}
          progress={scrollYProgress}
          stacked={stacked}
          lang={lang}
        />
      ))}
    </div>
  );
}

function HoverPreview({ active, x, y }: { active: Project | null; x: MotionValue<number>; y: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden
      data-inspect-ignore
      className="pointer-events-none fixed top-0 left-0 z-30 aspect-[16/10] w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line-strong bg-raised shadow-[0_30px_80px_-10px_rgb(0_0_0/0.8)]"
      style={{ x, y }}
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.5, rotate: active ? -3 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {archiveProjects.map((p) => (
        <Image
          key={p.slug}
          src={p.image}
          alt=""
          fill
          sizes="360px"
          className={cn(
            "object-cover object-top transition-opacity duration-300",
            active?.slug === p.slug ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </motion.div>
  );
}

function Archive({ lang }: { lang: Locale }) {
  const t = dict[lang].work;
  const [active, setActive] = useState<Project | null>(null);
  const hoverable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 });

  return (
    <div className="wrap mt-24 md:mt-40">
      <div className="flex flex-wrap items-end justify-between gap-6 pb-6">
        <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em]">
          {t.archive}
          <sup className="ms-2 font-mono text-sm font-normal tracking-normal text-accent md:text-base">({archiveProjects.length})</sup>
        </h3>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <GitHubIcon />
          {t.github}
          <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <ul
        className="border-t border-line"
        onPointerMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onPointerLeave={() => setActive(null)}
      >
        {archiveProjects.map((p) => {
          const href = p.live ?? p.repo;
          return (
            <li
              key={p.slug}
              className="group relative border-b border-line"
              onPointerEnter={(e) => {
                // Also fires when the list scrolls under a still cursor (no pointermove),
                // so take the position from here; jump instead of flying in from the corner.
                if (active) {
                  x.set(e.clientX);
                  y.set(e.clientY);
                } else {
                  x.jump(e.clientX);
                  y.jump(e.clientY);
                }
                setActive(p);
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
              />
              <div className="relative grid grid-cols-12 items-center gap-x-4 gap-y-3 py-6 md:py-8">
                <span className="label col-span-2 text-dim md:col-span-1 md:ps-2">
                  {String(projects.indexOf(p) + 1).padStart(2, "0")}
                </span>
                <h4 className="col-span-10 font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-none font-semibold tracking-[-0.035em] transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:col-span-5 rtl:group-hover:-translate-x-3">
                  <a href={href} target="_blank" rel="noreferrer" className="outline-none after:absolute after:inset-0 focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-accent">
                    {p.title[lang]}
                  </a>
                </h4>
                <p className="col-span-10 col-start-3 text-sm text-muted md:col-span-2 md:col-start-auto">
                  {p.kind[lang]}
                  <span className="mt-1 block font-mono text-[11px] text-dim md:hidden" dir="ltr">
                    {p.stack.slice(0, 3).join(" · ")}
                  </span>
                </p>
                <div className="hidden items-center justify-end gap-3 md:col-span-4 md:flex md:pe-2">
                  <span className="truncate font-mono text-[11px] text-dim" dir="ltr">
                    {p.stack.slice(0, 3).join(" · ")}
                  </span>
                  {p.repo && p.live && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title[lang]} — ${t.code}`}
                      className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg"
                    >
                      <GitHubIcon />
                    </a>
                  )}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                    <ArrowUpRight />
                  </span>
                </div>
                {!hoverable && (
                  <div className="relative col-span-10 col-start-3 aspect-[16/8] overflow-hidden rounded-xl border border-line md:hidden">
                    <Image src={p.image} alt="" fill sizes="80vw" className="object-cover object-top" />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {hoverable && <HoverPreview active={active} x={x} y={y} />}
    </div>
  );
}

export function Work({ lang }: { lang: Locale }) {
  const t = dict[lang].work;
  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="wrap grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <SectionLabel index="02">{t.label}</SectionLabel>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.88] font-bold tracking-[-0.055em]">
              {t.title}
              <sup className="ms-3 align-super font-mono text-base font-normal tracking-normal text-accent md:text-2xl">
                ({projects.length})
              </sup>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-4">
          <p className="max-w-sm text-[17px] leading-relaxed text-muted md:ms-auto">{t.intro}</p>
        </Reveal>
      </div>
      <FeaturedStack lang={lang} />
      <Archive lang={lang} />
    </section>
  );
}
