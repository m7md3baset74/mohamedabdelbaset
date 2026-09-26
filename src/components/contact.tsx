"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { dict } from "@/content/dict";
import { emailjs, profile, type Locale } from "@/content/site";
import { ArrowUpRight, LocalTime, Reveal, SectionLabel, cn } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

function Field({
  name,
  label,
  type = "text",
  textarea,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const shared =
    "peer w-full resize-none border-0 border-b border-line-strong bg-transparent px-0 pt-7 pb-3 text-[17px] text-fg outline-none transition-colors placeholder:text-transparent focus:border-accent";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} required rows={4} placeholder={label} className={shared} />
      ) : (
        <input name={name} type={type} required autoComplete={autoComplete} placeholder={label} className={shared} />
      )}
      <span className="pointer-events-none absolute start-0 top-1 text-[12px] text-muted transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-[17px] peer-placeholder-shown:text-dim peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-accent">
        {label}
      </span>
    </label>
  );
}

export function Contact({ lang }: { lang: Locale }) {
  const t = dict[lang].contact;
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: real people never fill the hidden field.
    if (data.get("company")) {
      setStatus("sent");
      form.reset();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: emailjs.serviceId,
          template_id: emailjs.templateId,
          user_id: emailjs.publicKey,
          template_params: {
            name: data.get("name"),
            email: data.get("email"),
            message: data.get("message"),
          },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const details = [
    { label: t.email, value: profile.email, href: `mailto:${profile.email}`, ltr: true },
    { label: t.phone, value: profile.phone, href: profile.phoneHref, ltr: true },
    { label: t.location, value: profile.location[lang] },
  ];

  return (
    <section id="contact" className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-28">
      <div
        aria-hidden
        className="absolute bottom-[-30%] start-1/2 -z-10 size-[80vmax] -translate-x-1/2 rounded-full opacity-[0.12] blur-[140px] rtl:translate-x-1/2"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 60%)" }}
      />
      <div className="wrap">
        <SectionLabel index="05">{t.label}</SectionLabel>
        <Reveal>
          <h2 className="mt-8 font-display text-[clamp(3rem,9.5vw,10rem)] leading-[0.88] font-bold tracking-[-0.055em]">
            <span className="block">{t.title1}</span>
            <span className="block">
              {t.title2} <span className="accent-word">{t.title3}</span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-3 md:mt-16">
          <a
            href={`mailto:${profile.email}`}
            dir="ltr"
            className="group inline-flex min-w-0 items-center gap-3 border-b-2 border-line-strong pb-2 font-display text-[clamp(1.05rem,3.3vw,2.9rem)] font-medium tracking-[-0.03em] break-all transition-colors hover:border-accent hover:text-accent"
          >
            {profile.email}
            <ArrowUpRight className="size-[0.8em] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <button
            type="button"
            onClick={copy}
            className="relative h-10 overflow-hidden rounded-full border border-line-strong px-4 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "y" : "n"}
                className={cn("block", copied && "text-ok")}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {copied ? t.copied : t.copy}
              </motion.span>
            </AnimatePresence>
          </button>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[17px] leading-relaxed text-muted">{t.intro}</p>
            <dl className="mt-10 border-t border-line">
              {details.map((d) => (
                <div key={d.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="label text-dim">{d.label}</dt>
                  <dd className="min-w-0 text-end">
                    {d.href ? (
                      <a href={d.href} dir={d.ltr ? "ltr" : undefined} className="break-all transition-colors hover:text-accent">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="label text-dim">{t.localTime}</dt>
                <dd>
                  <LocalTime />
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <p className="label text-dim">{t.social}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm transition-colors hover:border-fg"
                    >
                      {s.label}
                      <ArrowUpRight className="size-3.5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={submit} className="rounded-[28px] border border-line bg-surface/80 p-6 backdrop-blur md:p-10">
              <p className="label text-muted">{t.form.title}</p>
              <div className="mt-4 grid grid-cols-1 gap-x-8 md:grid-cols-2">
                <Field name="name" label={t.form.name} autoComplete="name" />
                <Field name="email" type="email" label={t.form.email} autoComplete="email" />
              </div>
              <div className="mt-2">
                <Field name="message" label={t.form.message} textarea />
              </div>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p aria-live="polite" className={cn("max-w-sm text-sm", status === "error" ? "text-[#ff7a7a]" : "text-ok")}>
                  {status === "sent" && t.form.success}
                  {status === "error" && (
                    <>
                      {t.form.error}{" "}
                      <a href={`mailto:${profile.email}`} className="underline">
                        {profile.email}
                      </a>
                    </>
                  )}
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-accent ps-6 pe-2 text-[15px] font-medium text-bg transition-colors hover:bg-fg disabled:opacity-60"
                >
                  {status === "sending" ? t.form.sending : t.form.send}
                  <span className="grid size-8 place-items-center rounded-full bg-bg text-fg transition-transform duration-500 ease-out-expo group-hover:-rotate-45 rtl:group-hover:rotate-45">
                    <ArrowUpRight className="rotate-45 rtl:-rotate-45" />
                  </span>
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
