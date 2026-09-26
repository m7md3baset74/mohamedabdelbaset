"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { dict, projectCount } from "@/content/dict";
import { projectsUsing, skills, type Locale, type Skill } from "@/content/site";
import { Reveal, SectionLabel, cn } from "./ui";

const P = ({ children }: { children: ReactNode }) => <span className="text-dim">{children}</span>;
const K = ({ children }: { children: ReactNode }) => <span className="text-[#f0c38a]">&quot;{children}&quot;</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-[#a6d9a0]">&quot;{children}&quot;</span>;
const B = ({ children }: { children: ReactNode }) => <span className="text-[#ff8a5c]">{children}</span>;

type Line = { content: ReactNode; skill?: Skill; indent: number };

function buildLines(): Line[] {
  const deps = skills.filter((s) => s.group === "dependencies");
  const dev = skills.filter((s) => s.group === "devDependencies");
  const entry = (s: Skill, last: boolean): Line => ({
    indent: 2,
    skill: s,
    content: (
      <>
        <K>{s.key}</K>
        <P>: </P>
        <S>{s.version}</S>
        {!last && <P>,</P>}
      </>
    ),
  });
  return [
    { indent: 0, content: <P>{"{"}</P> },
    { indent: 1, content: <><K>name</K><P>: </P><S>mohamed-abdelbaset</S><P>,</P></> },
    { indent: 1, content: <><K>version</K><P>: </P><S>2.0.0</S><P>,</P></> },
    { indent: 1, content: <><K>description</K><P>: </P><S>Frontend developer · Cairo, EG</S><P>,</P></> },
    { indent: 1, content: <><K>openToWork</K><P>: </P><B>true</B><P>,</P></> },
    { indent: 1, content: <><K>dependencies</K><P>: {"{"}</P></> },
    ...deps.map((s, i) => entry(s, i === deps.length - 1)),
    { indent: 1, content: <P>{"},"}</P> },
    { indent: 1, content: <><K>devDependencies</K><P>: {"{"}</P></> },
    ...dev.map((s, i) => entry(s, i === dev.length - 1)),
    { indent: 1, content: <P>{"}"}</P> },
    { indent: 0, content: <P>{"}"}</P> },
  ];
}

const LINES = buildLines();

export function Stack({ lang }: { lang: Locale }) {
  const t = dict[lang].stack;
  const [selected, setSelected] = useState<Skill>(skills[0]);
  const used = projectsUsing(selected);
  const lineNo = LINES.findIndex((l) => l.skill?.key === selected.key) + 1;

  return (
    <section id="stack" className="wrap py-20 md:py-28">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <SectionLabel index="04">{t.label}</SectionLabel>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[0.92] font-bold tracking-[-0.05em]">
              {t.title}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-5">
          <p className="max-w-sm text-[17px] leading-relaxed text-muted md:ms-auto">{t.intro}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div dir="ltr" className="overflow-hidden rounded-[22px] border border-line bg-surface">
            <div className="flex items-center gap-4 border-b border-line bg-raised/60 ps-4">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-line-strong" />
                <span className="size-2.5 rounded-full bg-line-strong" />
                <span className="size-2.5 rounded-full bg-line-strong" />
              </span>
              <div className="flex font-mono text-[12px]">
                <span className="flex items-center gap-2 border-x border-line bg-surface px-4 py-3 text-fg">
                  <span className="text-[#f0c38a]">{"{}"}</span> package.json
                </span>
                <span className="hidden items-center gap-2 px-4 py-3 text-dim sm:flex">README.md</span>
              </div>
            </div>

            <div role="group" className="overflow-x-auto py-4 font-mono text-[12px] leading-[1.9] sm:text-[13px]" aria-label="package.json">
              {LINES.map((line, i) => {
                const s = line.skill;
                const isSel = s?.key === selected.key;
                const count = s ? projectsUsing(s).length : 0;
                const hint = s ? (count ? projectCount(count, "en") : s.hint?.en) : null;
                const row = (
                  <>
                    <span className="inline-block w-10 shrink-0 pe-4 text-end text-dim/60 select-none sm:w-12">{i + 1}</span>
                    <span style={{ paddingInlineStart: `${line.indent * 2}ch` }} className="whitespace-pre">
                      {line.content}
                    </span>
                    {isSel && <span className="caret ms-px inline-block h-[1.15em] w-[2px] translate-y-[3px] bg-accent" />}
                    {hint && (
                      <span className={cn("ms-4 italic transition-colors", isSel ? "text-accent" : "text-dim/70")}>
                        {"// "}
                        {hint}
                      </span>
                    )}
                  </>
                );
                return s ? (
                  <button
                    key={i}
                    type="button"
                    onPointerEnter={(e) => e.pointerType === "mouse" && setSelected(s)}
                    onFocus={() => setSelected(s)}
                    onClick={() => setSelected(s)}
                    aria-pressed={isSel}
                    className={cn(
                      "flex w-full items-center border-s-2 text-start transition-colors",
                      isSel ? "border-accent bg-accent-soft" : "border-transparent hover:bg-raised",
                    )}
                  >
                    {row}
                  </button>
                ) : (
                  <div key={i} className="flex items-center border-s-2 border-transparent">
                    {row}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-line bg-raised/60 px-4 py-2 font-mono text-[11px] text-dim">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-ok" /> main
              </span>
              <span className="flex gap-4">
                <span>
                  Ln {lineNo}, Col {selected.key.length + 3}
                </span>
                <span className="hidden sm:inline">UTF-8</span>
                <span>JSON</span>
              </span>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-5">
          <div className="rounded-[22px] border border-line bg-surface p-6 md:p-8 lg:sticky lg:top-28">
            <p className="label text-muted">{t.usedIn}</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mt-4 flex items-end justify-between gap-4">
                  <span dir="ltr" className="min-w-0 truncate font-mono text-xl text-[#f0c38a] md:text-2xl">
                    &quot;{selected.key}&quot;
                  </span>
                  <span className="font-display text-7xl leading-[0.8] font-semibold tracking-[-0.05em] md:text-8xl">
                    {used.length || "∞"}
                  </span>
                </div>
                <p className="mt-3 text-muted">{used.length ? projectCount(used.length, lang) : t.none}</p>

                {used.length > 0 && (
                  <ul className="mt-6 grid grid-cols-2 gap-2">
                    {used.map((p) => (
                      <li key={p.slug}>
                        <a
                          href={p.live ?? p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex min-h-11 items-center gap-2.5 rounded-xl border border-line bg-bg/40 p-1.5 ps-3 pe-3 text-[13px] leading-tight transition-colors hover:border-line-strong sm:ps-1.5"
                        >
                          <span className="relative hidden aspect-[16/10] w-12 shrink-0 overflow-hidden rounded-md sm:block">
                            <Image src={p.image} alt="" fill sizes="48px" className="object-cover object-top" />
                          </span>
                          <span className="line-clamp-2">{p.title[lang]}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
            <p className="label mt-8 text-dim">{t.hint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
