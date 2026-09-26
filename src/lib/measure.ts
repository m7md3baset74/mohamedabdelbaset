export type Sides = { t: number; r: number; b: number; l: number };

export type Measured = {
  /** Border box, relative to whatever origin the caller subtracts. */
  x: number;
  y: number;
  width: number;
  height: number;
  margin: Sides;
  border: Sides;
  padding: Sides;
  selector: { tag: string; rest: string };
  color: string;
  background: string | null;
  font: string;
  role: string;
  name: string;
  focusable: boolean;
};

const px = (v: string) => Math.max(0, parseFloat(v) || 0);

const sides = (cs: CSSStyleDeclaration, prop: "margin" | "padding" | "border", suffix = ""): Sides => ({
  t: px(cs.getPropertyValue(`${prop}-top${suffix}`)),
  r: px(cs.getPropertyValue(`${prop}-right${suffix}`)),
  b: px(cs.getPropertyValue(`${prop}-bottom${suffix}`)),
  l: px(cs.getPropertyValue(`${prop}-left${suffix}`)),
});

/** "rgb(237, 234, 228)" → "#EDEAE4" (alpha appended when not opaque). */
export function toHex(color: string): string | null {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return color;
  const parts = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  const [r, g, b, a = 1] = parts;
  if (a === 0) return null;
  const hex = [r, g, b].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("");
  return `#${hex.toUpperCase()}${a < 1 ? Math.round(a * 255).toString(16).padStart(2, "0").toUpperCase() : ""}`;
}

const IMPLICIT_ROLES: Record<string, string> = {
  a: "link",
  button: "button",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  img: "image",
  nav: "navigation",
  main: "main",
  header: "banner",
  footer: "contentinfo",
  form: "form",
  input: "textbox",
  textarea: "textbox",
  ul: "list",
  ol: "list",
  li: "listitem",
  p: "paragraph",
  section: "region",
  article: "article",
  figure: "figure",
  svg: "graphics-document",
};

const FOCUSABLE = "a[href], button, input, textarea, select, summary, [tabindex]:not([tabindex='-1'])";

/** Tailwind utility classes are noisy; keep only the readable ones for the label. */
const readableClasses = (el: Element) =>
  Array.from(el.classList)
    .filter((c) => /^[a-z][a-z0-9-]*$/.test(c) && c.length < 18)
    .slice(0, 2);

export function measure(el: Element, originX = 0, originY = 0): Measured {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const tag = el.tagName.toLowerCase();
  const named = el.getAttribute("data-name");
  const rest = named ? `.${named}` : el.id ? `#${el.id}` : readableClasses(el).map((c) => `.${c}`).join("");

  const family = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
  const weight = cs.fontWeight === "400" ? "" : ` ${cs.fontWeight}`;
  const size = Math.round(parseFloat(cs.fontSize));

  const role = el.getAttribute("role") ?? IMPLICIT_ROLES[tag] ?? "generic";
  const label =
    el.getAttribute("aria-label") ??
    el.getAttribute("alt") ??
    (["a", "button", "h1", "h2", "h3", "h4", "label"].includes(tag) ? el.textContent ?? "" : "");

  return {
    x: rect.left - originX,
    y: rect.top - originY,
    width: rect.width,
    height: rect.height,
    margin: sides(cs, "margin"),
    border: sides(cs, "border", "-width"),
    padding: sides(cs, "padding"),
    selector: { tag, rest },
    color: toHex(cs.color) ?? "transparent",
    background: toHex(cs.backgroundColor),
    font: `${size}px ${family}${weight}`,
    role,
    name: label.replace(/\s+/g, " ").trim().slice(0, 32),
    focusable: el.matches(FOCUSABLE),
  };
}

export const formatSides = (s: Sides) => {
  if (s.t === s.r && s.r === s.b && s.b === s.l) return `${s.t}px`;
  if (s.t === s.b && s.l === s.r) return `${s.t}px ${s.r}px`;
  return `${s.t}px ${s.r}px ${s.b}px ${s.l}px`;
};

export const isEmptySides = (s: Sides) => s.t + s.r + s.b + s.l === 0;
