"use client";

import { useEffect, useRef } from "react";
import { dict } from "@/content/dict";
import { profile, type Locale } from "@/content/site";
import { scrollToTarget } from "./providers";
import { ArrowUpRight, LocalTime, cn } from "./ui";
import { Logo } from "./nav";

/** Giant name that always spans the full content width, whatever the font or language. */
function Wordmark({ text, lang }: { text: string; lang: Locale }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fit = () => {
      const b = box.current;
      const el = inner.current;
      if (!b || !el) return;
      const style = getComputedStyle(b);
      const available = b.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const current = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${(current * available) / el.offsetWidth}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (box.current) ro.observe(box.current);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text]);

  const letters = lang === "ar" ? [text] : Array.from(text);
  return (
    <div ref={box} className="wrap overflow-hidden" aria-hidden>
      <span
        ref={inner}
        className={cn(
          "block w-max font-display text-[16vw] font-bold tracking-[-0.035em] whitespace-nowrap select-none",
          // Arabic glyphs have deep descenders; give them room instead of clipping.
          lang === "ar" ? "pt-[0.1em] pb-[0.3em] leading-[1]" : "pt-[0.06em] leading-[0.8]",
        )}
      >
        {letters.map((l, i) => (
          <span
            key={i}
            className="inline-block text-fg transition-[color,transform] duration-500 ease-out-expo hover:-translate-y-[0.05em] hover:text-accent"
          >
            {l}
          </span>
        ))}
      </span>
    </div>
  );
}

export function Footer({ lang }: { lang: Locale }) {
  const t = dict[lang];
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#stack", label: t.nav.stack },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line pt-14">
      <div className="wrap grid grid-cols-1 gap-10 pb-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="leading-tight">
              <p className="font-medium">{profile.name[lang]}</p>
              <p className="label text-[10.5px] text-muted">{profile.role[lang]}</p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">{t.hero.tagline}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <ul className="space-y-2">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Wordmark text={profile.last[lang]} lang={lang} />

      <div className="wrap label flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-dim">
        <span>
          © {new Date().getFullYear()} {profile.name[lang]}. {t.footer.rights}
        </span>
        <span className="hidden md:inline">
          {t.footer.built} · <LocalTime seconds={false} />
        </span>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="group inline-flex items-center gap-2 transition-colors hover:text-fg"
        >
          {t.footer.top}
          <ArrowUpRight className="size-3.5 -rotate-45 transition-transform group-hover:-translate-y-0.5 rtl:rotate-45" />
        </button>
      </div>
    </footer>
  );
}
