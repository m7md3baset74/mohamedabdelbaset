"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatSides, isEmptySides, measure, type Measured } from "@/lib/measure";
import type { Dict } from "@/content/dict";

type InspectState = { on: boolean; supported: boolean; toggle: () => void; setOn: (on: boolean) => void };

const InspectContext = createContext<InspectState>({
  on: false,
  supported: false,
  toggle: () => {},
  setOn: () => {},
});

export const useInspect = () => useContext(InspectContext);

export function InspectProvider({ children, labels }: { children: ReactNode; labels: Dict["inspect"] }) {
  const [on, setOn] = useState(false);
  const [supported, setSupported] = useState(false);
  const toggle = useCallback(() => setOn((v) => !v), []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setSupported(mq.matches);
      if (!mq.matches) setOn(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!supported) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // e.code covers Arabic keyboard layouts (where the key types "ه").
      if (e.code === "KeyI" || e.key === "i" || e.key === "I") toggle();
      else if (e.key === "Escape") setOn(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [supported, toggle]);

  useEffect(() => {
    document.documentElement.classList.toggle("inspecting", on);
  }, [on]);

  return (
    <InspectContext.Provider value={{ on, supported, toggle, setOn }}>
      {children}
      {on && <LiveInspector labels={labels} />}
      <AnimatePresence>
        {on && (
          <motion.div
            data-inspect-ignore
            initial={{ opacity: 0, y: 16, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 16, x: "-50%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 z-[90] flex items-center gap-3 rounded-full border border-line-strong bg-raised/90 py-2 ps-3 pe-4 text-sm shadow-2xl backdrop-blur-xl"
          >
            <span className="relative flex size-2.5">
              <span className="ping-soft absolute inset-0 rounded-full bg-[#6fa8dc]" />
              <span className="relative size-2.5 rounded-full bg-[#6fa8dc]" />
            </span>
            <span className="font-medium">{labels.on}</span>
            <span className="text-muted">{labels.hint}</span>
            <span className="hidden text-dim sm:inline">· {labels.exit}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </InspectContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Box model overlay + tooltip (shared by the live inspector and the   */
/* auto-playing hero demo)                                             */
/* ------------------------------------------------------------------ */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function BoxOverlay({ m, animated }: { m: Measured; animated?: boolean }) {
  const { margin: mg, border: bd, padding: pd } = m;
  const transition = animated
    ? `left .6s ${EASE}, top .6s ${EASE}, width .6s ${EASE}, height .6s ${EASE}, border-width .6s ${EASE}`
    : undefined;
  const widths = (s: typeof mg) => `${s.t}px ${s.r}px ${s.b}px ${s.l}px`;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        left: m.x - mg.l,
        top: m.y - mg.t,
        width: m.width + mg.l + mg.r,
        height: m.height + mg.t + mg.b,
        borderStyle: "solid",
        borderColor: "var(--color-ins-margin)",
        borderWidth: widths(mg),
        transition,
      }}
    >
      <div
        className="size-full"
        style={{ borderStyle: "solid", borderColor: "var(--color-ins-border)", borderWidth: widths(bd), transition }}
      >
        <div
          className="size-full"
          style={{ borderStyle: "solid", borderColor: "var(--color-ins-padding)", borderWidth: widths(pd), transition }}
        >
          <div className="size-full bg-ins-content" />
        </div>
      </div>
    </div>
  );
}

export function InspectTooltip({
  m,
  bounds,
  labels,
  compact,
  animated,
}: {
  m: Measured;
  bounds: { width: number; height: number };
  labels: Dict["inspect"];
  compact?: boolean;
  animated?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 260, h: compact ? 96 : 200 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const { offsetWidth: w, offsetHeight: h } = ref.current;
    setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
  }, [m, compact]);

  const gap = 10;
  const below = m.y + m.height + m.margin.b + gap;
  const above = m.y - m.margin.t - size.h - gap;
  let top = below + size.h <= bounds.height - 8 ? below : above;
  top = Math.min(Math.max(top, 8), Math.max(8, bounds.height - size.h - 8));
  const left = Math.min(Math.max(m.x, 8), Math.max(8, bounds.width - size.w - 8));

  const rows: [string, ReactNode][] = [
    [
      labels.color,
      <span key="c" className="inline-flex items-center gap-1.5">
        <span className="size-2.5 rounded-[2px] border border-white/30" style={{ background: m.color }} />
        {m.color}
      </span>,
    ],
    [labels.font, m.font],
  ];
  if (!compact && m.background) {
    rows.push([
      labels.background,
      <span key="b" className="inline-flex items-center gap-1.5">
        <span className="size-2.5 rounded-[2px] border border-white/30" style={{ background: m.background }} />
        {m.background}
      </span>,
    ]);
  }
  if (!compact && !isEmptySides(m.padding)) rows.push([labels.padding, formatSides(m.padding)]);

  return (
    <div
      ref={ref}
      dir="ltr"
      aria-hidden
      className="pointer-events-none absolute z-10 w-max max-w-[300px] rounded-lg border border-white/10 bg-[#232323]/95 px-3 py-2.5 font-mono text-[11px] leading-[1.55] text-[#e8e8e8] shadow-[0_12px_40px_rgb(0_0_0/0.55)] backdrop-blur"
      style={{
        left,
        top,
        transition: animated ? `left .6s ${EASE}, top .6s ${EASE}` : undefined,
      }}
    >
      <div className="flex items-baseline justify-between gap-6">
        <span className="truncate">
          <span className="text-[#e36eec]">{m.selector.tag}</span>
          <span className="text-[#9bbbdc]">{m.selector.rest}</span>
        </span>
        <span className="shrink-0 text-[#a8a8a8]">
          {Math.round(m.width * 100) / 100} × {Math.round(m.height * 100) / 100}
        </span>
      </div>
      <div className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-5">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <span className="text-[#9a9a9a]">{k}</span>
            <span className="truncate">{v}</span>
          </div>
        ))}
      </div>
      {!compact && (
        <>
          <div className="mt-2 border-t border-white/10 pt-1.5 text-[10px] uppercase tracking-wider text-[#8a8a8a]">
            {labels.a11y}
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-5">
            {m.name && (
              <>
                <span className="text-[#9a9a9a]">{labels.name}</span>
                <span className="truncate">{m.name}</span>
              </>
            )}
            <span className="text-[#9a9a9a]">{labels.role}</span>
            <span>{m.role}</span>
            <span className="text-[#9a9a9a]">{labels.focusable}</span>
            <span className={m.focusable ? "text-[#81c995]" : "text-[#9a9a9a]"}>{m.focusable ? "✓" : "⊘"}</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Live inspector: follows the pointer over the whole page             */
/* ------------------------------------------------------------------ */

function LiveInspector({ labels }: { labels: Dict["inspect"] }) {
  const [m, setM] = useState<Measured | null>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    const update = () => {
      frame.current = 0;
      const p = pointer.current;
      if (!p) return;
      const el = document.elementFromPoint(p.x, p.y);
      if (!el || el.closest("[data-inspect-ignore]") || el === document.documentElement || el === document.body) {
        setM(null);
        return;
      }
      setBounds({ width: window.innerWidth, height: window.innerHeight });
      setM(measure(el));
    };
    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer.current = null;
      setM(null);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!m) return null;
  return (
    <div data-inspect-ignore aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      <BoxOverlay m={m} />
      <InspectTooltip m={m} bounds={bounds} labels={labels} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero demo: cycles through [data-demo] elements on its own           */
/* ------------------------------------------------------------------ */

export function InspectDemo({
  containerRef,
  labels,
  startDelay = 1800,
  interval = 2600,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  labels: Dict["inspect"];
  startDelay?: number;
  interval?: number;
}) {
  const { on } = useInspect();
  const [m, setM] = useState<Measured | null>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [visible, setVisible] = useState(true);
  const index = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || on || !visible) return;

    const targets = () => Array.from(container.querySelectorAll<HTMLElement>("[data-demo]"));
    const show = () => {
      const list = targets();
      if (!list.length) return;
      const el = list[index.current % list.length];
      const box = container.getBoundingClientRect();
      setBounds({ width: box.width, height: box.height });
      setM(measure(el, box.left, box.top));
    };
    const next = () => {
      index.current += 1;
      show();
    };

    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      show();
      timer = setInterval(next, interval);
    }, startDelay);
    // Re-measure the current target on resize/scroll (the hero content has parallax).
    let frame = 0;
    const onChange = () => {
      if (frame || !timer) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        show();
      });
    };
    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, { passive: true });
    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange);
    };
  }, [containerRef, on, visible, startDelay, interval]);

  if (on || !m) return null;

  // Fake cursor rests near the lower end of the inspected element.
  const cursorX = m.x + Math.min(m.width * 0.72, m.width - 12);
  const cursorY = m.y + m.height * 0.62;

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute inset-0 z-20"
    >
      <BoxOverlay m={m} animated />
      <InspectTooltip m={m} bounds={bounds} labels={labels} compact animated />
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        className="absolute drop-shadow-[0_2px_6px_rgb(0_0_0/0.6)]"
        style={{
          left: cursorX,
          top: cursorY,
          transition: `left .9s ${EASE}, top .9s ${EASE}`,
        }}
      >
        <path d="M4 2.5 19.5 12l-6.8 1.6L9.4 20 4 2.5Z" fill="#fff" stroke="#0c0b0a" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}
