import { dict } from "@/content/dict";
import type { Locale } from "@/content/site";
import { Reveal, SectionLabel } from "./ui";

export function Services({ lang }: { lang: Locale }) {
  const t = dict[lang].services;
  return (
    <section id="services" className="wrap py-20 md:py-28">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
        <SectionLabel index="03" className="md:col-span-4 md:mb-3">
          {t.label}
        </SectionLabel>
        <Reveal className="md:col-span-8">
          <h2 className="font-display text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[0.92] font-bold tracking-[-0.05em]">{t.title}</h2>
        </Reveal>
      </div>

      <ol className="mt-14 border-t border-line md:mt-20">
        {t.items.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.05} className="group relative grid grid-cols-1 gap-x-6 gap-y-4 border-b border-line py-8 md:grid-cols-12 md:py-11">
            <span className="label pt-2 text-dim transition-colors group-hover:text-accent md:col-span-1">0{i + 1}</span>
            <h3 className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[0.98] font-semibold tracking-[-0.035em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:col-span-5 rtl:group-hover:-translate-x-3">
              {s.title}
            </h3>
            <p className="max-w-md leading-relaxed text-muted md:col-span-4">{s.body}</p>
            <ul className="flex flex-wrap content-start gap-2 md:col-span-2 md:justify-end">
              {s.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted" dir="ltr">
                  {tag}
                </li>
              ))}
            </ul>
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 rtl:origin-right"
            />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
