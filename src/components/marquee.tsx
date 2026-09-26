import { cn } from "@/lib/cn";

const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Vue 3",
  "Framer Motion",
  "Prisma",
  "PostgreSQL",
  "Upstash Redis",
  "Zustand",
  "Pinia",
  "Laravel",
  "REST APIs",
  "Vercel",
];

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-accent md:size-8" aria-hidden>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

export function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y border-line py-6 md:py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-8 pe-8 md:gap-12 md:pe-12">
            {ITEMS.map((item, i) => (
              <li key={item} className="flex items-center gap-8 md:gap-12">
                <span
                  className={cn(
                    "font-display text-4xl font-semibold tracking-[-0.03em] whitespace-nowrap md:text-6xl",
                    i % 2 === 1 && "text-outline",
                  )}
                >
                  {item}
                </span>
                <Spark />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
