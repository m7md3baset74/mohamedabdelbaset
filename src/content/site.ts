export const locales = ["en", "ar"] as const;
import { Work } from "@/components/work";
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A string in every supported language. */
export type L = Record<Locale, string>;

// On Vercel, fall back to the project's own production domain so canonical URLs
// and social previews point at wherever this copy is actually deployed.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://mohamed-abdelbaset-portfolio.vercel.app");

/** Set SITE_NOINDEX=1 on review/staging copies to keep them out of search engines. */
export const NOINDEX = Boolean(process.env.SITE_NOINDEX);

/** Path of the home page for a locale ("/" for English, "/ar" for Arabic). */
export const homePath = (lang: Locale) => (lang === "en" ? "/" : `/${lang}`);

export const profile = {
  name: { en: "Mohamed Abdelbaset", ar: "محمد عبد الباسط" },
  first: { en: "Mohamed", ar: "محمد" },
  last: { en: "Abdelbaset", ar: "عبد الباسط" },
  role: { en: "Frontend Developer", ar: "مطوّر واجهات أمامية" },
  email: "mohamedabdelbasset265@gmail.com",
  phone: "+20 106 404 7214",
  phoneHref: "tel:+201064047214",
  location: { en: "Nasr City, Cairo, Egypt", ar: "مدينة نصر، القاهرة، مصر" },
  timeZone: "Africa/Cairo",
  cv: "/Mohamed_Abdelbaset_CV.pdf",
  github: "https://github.com/m7md3baset74",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohamed-abd-elbaset-033644213",
    },
    { label: "GitHub", href: "https://github.com/m7md3baset74" },
    { label: "Instagram", href: "https://www.instagram.com/3baset.art" },
    { label: "Facebook", href: "https://www.facebook.com/share/16UaYr1GJC/" },
  ],
};

/** EmailJS keys used by the contact form (public, client-side by design). */
export const emailjs = {
  serviceId: "service_v9i45ll",
  templateId: "template_v19peze",
  publicKey: "HhZxgzzt4w3ZzWiuX",
};

export type Project = {
  slug: string;
  title: L;
  kind: L;
  summary: L;
  stack: string[];
  image: string;
  width: number;
  height: number;
  /** "contain" for screenshots that are a centred device/card on a dark background. */
  fit?: "cover" | "contain";
  /** CSS object-position for cropped screenshots (defaults to top centre). */
  position?: string;
  /** Brand colour of the project, used for glows. */
  tint: string;
  live?: string;
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "kayan-avenue",
    title: { en: "Kayan Avenue Properties", ar: "كيان أفينيو للعقارات" },
    kind: { en: "Real estate · Client site", ar: "عقارات · موقع لعميل" },
    summary: {
      en: "A bilingual (EN/AR) luxury real-estate website with full RTL/LTR support, scroll animations, email integration and a production deploy on Vercel.",
      ar: "موقع عقارات فاخر ثنائي اللغة (عربي/إنجليزي) بدعم كامل للاتجاهين RTL/LTR، مع حركات تفاعلية أثناء التمرير وربط بالبريد الإلكتروني ونشر كامل على Vercel.",
    },
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Resend"],
    image: "/work/kayan-avenue.webp",
    width: 1311,
    height: 907,
    tint: "#c9a55a",
    live: "https://www.kayanavenue.com/",
    featured: true,
  },
  {
    slug: "order-tracker",
    title: { en: "Real-Time Order Tracker", ar: "متتبّع الطلبات اللحظي" },
    kind: { en: "Dashboard · Client", ar: "لوحة متابعة · لعميل" },
    summary: {
      en: "A high-traffic tracking dashboard serving thousands of requests a day. Debounced API calls, Upstash Redis caching and tightly controlled re-renders keep it smooth.",
      ar: "لوحة تتبّع عالية الضغط تخدم آلاف الطلبات يوميًا. استدعاءات API مُنظَّمة (debounce) وتخزين مؤقت عبر Upstash Redis وتحكّم دقيق في إعادة الرسم تجعلها سلسة دائمًا.",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Upstash Redis",
      "REST APIs",
    ],
    image: "/work/order-tracker.webp",
    width: 1100,
    height: 898,
    fit: "contain",
    tint: "#e5484d",
    live: "https://m5-coinshop.com/order/885aecea",
    featured: true,
  },
  {
    slug: "fitness-coach",
    title: { en: "Online Fitness Coach", ar: "منصة المدرب الرياضي" },
    kind: { en: "Fitness · Freelance", ar: "لياقة · عمل حر" },
    summary: {
      en: "A bilingual (AR/EN) coaching platform delivered as a freelance project, live on a custom domain with SEO tuned for performance and search visibility.",
      ar: "منصة تدريب رياضي أونلاين ثنائية اللغة (عربي/إنجليزي) نُفّذت كمشروع حر، تعمل على نطاق خاص مع تحسين لمحركات البحث (SEO) لأداء أعلى وظهور أفضل.",
    },
    stack: ["Next.js", "TypeScript", "TailwindCSS", "SEO", "Framer Motion"],
    image: "/work/fitness-coach.webp",
    width: 1080,
    height: 720,
    fit: "contain",
    tint: "#3dd68c",
    live: "https://humaidiomar.com/",
    featured: true,
  },
  {
    slug: "3basetStudio",
    title: { en: "3baset Studio", ar: "3baset Studio" },
    kind: { en: "Artworks · Website", ar: "لوحات فنية · موقع" },
    summary: {
      en: "A premium e-commerce website showcasing handcrafted artistic rugs, combining traditional craftsmanship with unique artwork and an elegant shopping experience.",
      ar: "متجر إلكتروني فاخر لعرض السجاد اليدوي الفني، يجمع بين الحرفية التقليدية والتصميمات الفنية المميزة لتقديم تجربة تسوق أنيقة واحترافية.",
    },
    stack: ["Next.js", "TailwindCSS", "TYpeScript"],
    image: "/Work/3baset.art.png",
    width: 1600,
    height: 654,
    position: "left top",
    tint: "#ff2d3a",
    live: "https://3baset.art/",
    repo: "https://github.com/m7md3baset74/3basetstudio",
    featured: true,
  },
  {
    slug: "fitelite",
    title: { en: "FitElite Gym", ar: "نادي FitElite" },
    kind: { en: "Fitness · Website", ar: "لياقة · موقع" },
    summary: {
      en: "A modern, responsive gym website built to attract new members and present classes, trainers and memberships in a clean, professional way.",
      ar: "موقع حديث ومتجاوب لصالة رياضية، صُمّم لجذب أعضاء جدد وعرض الحصص والمدربين والاشتراكات بشكل واضح واحترافي.",
    },
    stack: ["React.js", "TailwindCSS", "JavaScript"],
    image: "/work/fitelite.webp",
    width: 1600,
    height: 654,
    position: "left top",
    tint: "#ff2d3a",
    live: "https://fitelite-gym.vercel.app/",
    repo: "https://github.com/m7md3baset74/fitelite-gym",
  },
  {
    slug: "inventory",
    title: { en: "Inventory Management", ar: "نظام إدارة المخزون" },
    kind: { en: "Full-stack app", ar: "تطبيق متكامل" },
    summary: {
      en: "Full-stack inventory app with secure auth and a responsive dashboard.",
      ar: "تطبيق متكامل لإدارة المخزون مع تسجيل دخول آمن ولوحة تحكم متجاوبة.",
    },
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
    image: "/work/inventory.webp",
    width: 1600,
    height: 667,
    tint: "#9b5cff",
    live: "https://inventory-management-blue-rho.vercel.app/",
    repo: "https://github.com/m7md3baset74/inventory-management",
  },
  {
    slug: "edge-ai",
    title: { en: "Edge AI", ar: "Edge AI" },
    kind: { en: "SaaS landing page", ar: "صفحة هبوط SaaS" },
    summary: {
      en: "A modern landing page for an AI SaaS product.",
      ar: "صفحة هبوط عصرية لمنتج SaaS بالذكاء الاصطناعي.",
    },
    stack: ["React.js", "TypeScript", "TailwindCSS", "Zustand"],
    image: "/work/edge-ai.webp",
    width: 1280,
    height: 720,
    tint: "#8b3dff",
    live: "https://edge-ai-one.vercel.app/",
    repo: "https://github.com/m7md3baset74/edge-ai",
  },
  {
    slug: "task-manager",
    title: { en: "Task Manager", ar: "مدير المهام" },
    kind: { en: "Web app", ar: "تطبيق ويب" },
    summary: {
      en: "A Vue 3 task manager with categories, editing and completion tracking.",
      ar: "مدير مهام مبني بـ Vue 3 مع تصنيفات وتعديل ومتابعة لإنجاز المهام.",
    },
    stack: ["Vue.js", "Pinia", "TailwindCSS", "JavaScript"],
    image: "/work/task-manager.webp",
    width: 1600,
    height: 673,
    tint: "#b0264f",
    live: "https://task-manager-vue-js-three.vercel.app/",
    repo: "https://github.com/m7md3baset74/task-manager-vue.js",
  },
  {
    slug: "freshcart",
    title: { en: "FreshCart E-Commerce", ar: "متجر FreshCart" },
    kind: { en: "E-commerce", ar: "تجارة إلكترونية" },
    summary: {
      en: "A full e-commerce app with dynamic product listings, a cart and a wishlist.",
      ar: "متجر إلكتروني متكامل بقوائم منتجات ديناميكية وسلة مشتريات وقائمة مفضّلة.",
    },
    stack: ["React.js", "TailwindCSS", "JavaScript"],
    image: "/work/e-commerce.webp",
    width: 1280,
    height: 627,
    tint: "#1fae6b",
    live: "https://e-commerce-react2.vercel.app/",
    repo: "https://github.com/m7md3baset74/e-commerce-react2",
  },
  {
    slug: "note-app",
    title: { en: "Note App", ar: "تطبيق الملاحظات" },
    kind: { en: "Web app", ar: "تطبيق ويب" },
    summary: {
      en: "A note-taking app with its own look: create, edit and delete notes.",
      ar: "تطبيق ملاحظات بتصميم مختلف: إنشاء الملاحظات وتعديلها وحذفها.",
    },
    stack: ["React.js", "TailwindCSS", "JavaScript"],
    image: "/work/note-app.webp",
    width: 1280,
    height: 619,
    tint: "#d7263d",
    live: "https://note-app-mu-dusky.vercel.app/",
    repo: "https://github.com/m7md3baset74/NoteApp",
  },
  {
    slug: "zain",
    title: { en: "Zain Construction", ar: "زين التنموية" },
    kind: { en: "Company site · Arabic", ar: "موقع شركة · عربي" },
    summary: {
      en: "An Arabic-first company website showcasing the firm's projects and services.",
      ar: "موقع لشركة مقاولات باللغة العربية يعرض مشاريعها وخدماتها.",
    },
    stack: ["Next.js", "TailwindCSS", "JavaScript"],
    image: "/work/zain.webp",
    width: 1280,
    height: 621,
    tint: "#f2b705",
    live: "https://zain-task.vercel.app/",
    repo: "https://github.com/m7md3baset74/ZainTask",
  },
  {
    slug: "3hand",
    title: { en: "3Hand Dashboard", ar: "لوحة تحكم 3Hand" },
    kind: { en: "Dashboard · Laravel", ar: "لوحة تحكم · Laravel" },
    summary: {
      en: "A Laravel app with dark mode, user management (add, edit, delete) and a responsive layout.",
      ar: "تطبيق Laravel بوضع داكن وإدارة للمستخدمين (إضافة وتعديل وحذف) وتصميم متجاوب.",
    },
    stack: ["Laravel", "Blade", "TailwindCSS", "JavaScript", "Vite"],
    image: "/work/3hand.webp",
    width: 1600,
    height: 664,
    tint: "#f04438",
    repo: "https://github.com/m7md3baset74/3Hand-Laravel",
  },
  {
    slug: "product-catalog",
    title: { en: "Product Catalog", ar: "كتالوج المنتجات" },
    kind: { en: "Web app", ar: "تطبيق ويب" },
    summary: {
      en: "A React catalogue that pulls products from a REST API, with a detail page for each one.",
      ar: "كتالوج منتجات بـ React يجلب البيانات من REST API مع صفحة تفاصيل لكل منتج.",
    },
    stack: ["React.js", "TailwindCSS", "JavaScript", "REST APIs"],
    image: "/work/product-catalog.webp",
    width: 1600,
    height: 656,
    tint: "#16a34a",
    live: "https://product-catalog-react-beta.vercel.app/",
    repo: "https://github.com/m7md3baset74/product-catalog-react",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);

/** Host name shown in the fake browser address bar. */
export const displayUrl = (project: Project) => {
  const href = project.live ?? project.repo;
  if (!href) return "";
  const url = new URL(href);
  return (url.host + url.pathname).replace(/^www\./, "").replace(/\/$/, "");
};

export type Skill = {
  key: string;
  version: string;
  group: "dependencies" | "devDependencies";
  /** Stack labels that count as using this skill; "*" means every project. */
  matches?: string[];
  /** Shown instead of a project count when the skill isn't tied to a project. */
  hint?: L;
};

export const skills: Skill[] = [
  {
    key: "react",
    version: "^19",
    group: "dependencies",
    matches: ["React.js", "Next.js"],
  },
  { key: "next", version: "^16", group: "dependencies", matches: ["Next.js"] },
  {
    key: "typescript",
    version: "^5",
    group: "dependencies",
    matches: ["TypeScript"],
  },
  {
    key: "javascript",
    version: "ES2024",
    group: "dependencies",
    matches: ["JavaScript"],
  },
  {
    key: "tailwindcss",
    version: "^4",
    group: "dependencies",
    matches: ["TailwindCSS"],
  },
  { key: "html", version: "5", group: "dependencies", matches: ["*"] },
  { key: "css", version: "3", group: "dependencies", matches: ["*"] },
  {
    key: "framer-motion",
    version: "^12",
    group: "dependencies",
    matches: ["Framer Motion"],
  },
  { key: "vue", version: "^3", group: "dependencies", matches: ["Vue.js"] },
  { key: "pinia", version: "^3", group: "dependencies", matches: ["Pinia"] },
  {
    key: "zustand",
    version: "^5",
    group: "dependencies",
    matches: ["Zustand"],
  },
  { key: "prisma", version: "^6", group: "dependencies", matches: ["Prisma"] },
  {
    key: "postgresql",
    version: "^17",
    group: "dependencies",
    matches: ["PostgreSQL"],
  },
  {
    key: "@upstash/redis",
    version: "^1",
    group: "dependencies",
    matches: ["Upstash Redis"],
  },
  { key: "resend", version: "^4", group: "dependencies", matches: ["Resend"] },
  {
    key: "rest-api",
    version: "http/1.1",
    group: "dependencies",
    matches: ["REST APIs"],
  },
  {
    key: "laravel",
    version: "^12",
    group: "dependencies",
    matches: ["Laravel"],
  },
  {
    key: "sass",
    version: "^1",
    group: "dependencies",
    hint: { en: "toolbox", ar: "toolbox" },
  },
  {
    key: "bootstrap",
    version: "^5",
    group: "dependencies",
    hint: { en: "toolbox", ar: "toolbox" },
  },
  {
    key: "git",
    version: "^2",
    group: "devDependencies",
    hint: { en: "daily", ar: "daily" },
  },
  {
    key: "postman",
    version: "^11",
    group: "devDependencies",
    hint: { en: "every API", ar: "every API" },
  },
  { key: "vite", version: "^7", group: "devDependencies", matches: ["Vite"] },
  {
    key: "vercel",
    version: "latest",
    group: "devDependencies",
    hint: { en: "ships it", ar: "ships it" },
  },
];

export const projectsUsing = (skill: Skill) =>
  skill.matches
    ? projects.filter((p) =>
        skill.matches!.some((m) => m === "*" || p.stack.includes(m)),
      )
    : [];
