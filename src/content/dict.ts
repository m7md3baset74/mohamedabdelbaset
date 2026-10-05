import type { Locale } from "./site";

const en = {
  meta: {
    title: "Mohamed Abdelbaset — Frontend Developer",
    description:
      "Frontend developer in Cairo building fast, responsive and bilingual (EN/AR) web interfaces with React and Next.js.",
  },
  nav: {
    work: "Work",
    about: "About",
    stack: "Stack",
    contact: "Contact",
    talk: "Let's talk",
    inspect: "Inspect",
    inspectHint: "Inspect this page like DevTools (I)",
    menu: "Menu",
    close: "Close",
    switchTo: "ع",
    switchLabel: "اقرأ الموقع بالعربية",
    skip: "Skip to content",
  },
  hero: {
    based: "Based in Cairo, EG",
    available: "Available for frontend opportunities",
    tagline:
      "I build fast, responsive and bilingual web interfaces with React & Next.js. The kind people enjoy using and teams enjoy maintaining.",
    ctaWork: "See the work",
    ctaCv: "Download CV",
    scroll: "Scroll",
    tip: "Try it: press I and hover anything",
  },
  inspect: {
    on: "Inspect mode",
    hint: "Hover anything",
    exit: "Press I or Esc to exit",
    color: "Color",
    font: "Font",
    background: "Background",
    padding: "Padding",
    a11y: "Accessibility",
    name: "Name",
    role: "Role",
    focusable: "Keyboard-focusable",
  },
  about: {
    label: "About",
    statement:
      "I'm a frontend developer from Cairo who turns ideas into fast, *responsive* interfaces. Over the past year I've shipped real products for real clients: a *bilingual* luxury real-estate site, a live order tracker handling *thousands* of requests a day, and contributions to AutoMechanic's official platform.",
    body: "I care about the details you feel before you notice them: layouts that mirror perfectly into Arabic, animations that never drop a frame, and code the next developer will thank me for. I work closely with teams, communicate clearly, and take projects from the first brief to a production deploy.",
    stats: [
      { value: 21, suffix: "", label: "projects shipped" },
      { value: 2, suffix: "+", label: "year of professional experience" },
      { value: 5, suffix: "", label: "bilingual AR / EN builds" },
      { value: 8, suffix: "", label: "client sites live in production" },
    ],
    cv: "Download CV",
  },
  services: {
    label: "Services",
    title: "What I can do for you",
    items: [
      {
        title: "Websites & landing pages",
        body: "Marketing sites and landing pages that load fast, rank well and look sharp on every screen size.",
        tags: ["Next.js", "SEO", "Motion"],
      },
      {
        title: "Web apps & dashboards",
        body: "React and Next.js apps with real data behind them: auth, dashboards, state that stays in sync and APIs that hold up under load.",
        tags: ["React", "Prisma", "Redis"],
      },
      {
        title: "Bilingual & RTL",
        body: "Arabic and English done properly: mirrored layouts, RTL-aware components and type that reads naturally in both directions. This site is one. Try the ع button.",
        tags: ["i18n", "RTL", "AR / EN"],
      },
      {
        title: "From brief to launch",
        body: "Agile planning, clear communication and a clean production deploy at the end. I lead projects from the first call to a live URL.",
        tags: ["Agile", "Git", "Vercel"],
      },
    ],
  },
  work: {
    label: "Selected work",
    title: "Selected work",
    intro:
      "Client sites, dashboards and products, each built with care for performance, detail and the people using it.",
    featured: "Featured",
    archive: "More projects",
    visit: "Visit site",
    code: "Code",
    github: "More on GitHub",
  },
  stack: {
    label: "Stack",
    title: "The toolbox",
    intro: "Everything in this file has shipped in a real project. Hover a package to see where.",
    usedIn: "Shipped in",
    none: "Part of the daily toolkit",
    hint: "Hover or tap a line",
  },
  contact: {
    label: "Contact",
    title1: "Got a project",
    title2: "in mind?",
    title3: "Let's build it.",
    intro:
      "Have a job opportunity or a project you'd like to collaborate on? Reach out. I'm always open to discussing new opportunities.",
    copy: "Copy",
    copied: "Copied!",
    email: "Email",
    phone: "Phone",
    location: "Location",
    social: "Elsewhere",
    localTime: "Local time",
    form: {
      title: "Send a message",
      name: "Your name",
      email: "Your email",
      message: "Tell me about your project",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent. Thank you! I'll get back to you soon.",
      error: "Something went wrong. Please email me directly instead.",
    },
  },
  footer: {
    rights: "All rights reserved.",
    built: "Designed & built in Cairo with Next.js",
    top: "Back to top",
  },
};

export type Dict = typeof en;

const ar: Dict = {
  meta: {
    title: "محمد عبد الباسط — مطوّر واجهات أمامية",
    description:
      "مطوّر واجهات أمامية من القاهرة يبني واجهات ويب سريعة ومتجاوبة وثنائية اللغة (عربي/إنجليزي) باستخدام React و Next.js.",
  },
  nav: {
    work: "الأعمال",
    about: "نبذة",
    stack: "الأدوات",
    contact: "تواصل",
    talk: "لنتحدث",
    inspect: "فحص",
    inspectHint: "افحص الصفحة مثل DevTools (I)",
    menu: "القائمة",
    close: "إغلاق",
    switchTo: "EN",
    switchLabel: "Read this site in English",
    skip: "تخطَّ إلى المحتوى",
  },
  hero: {
    based: "من القاهرة، مصر",
    available: "متاح لمشاريع جديدة",
    tagline:
      "أبني واجهات ويب سريعة ومتجاوبة وثنائية اللغة باستخدام React و Next.js. واجهات يستمتع الناس باستخدامها، ويسهل على الفرق تطويرها.",
    ctaWork: "شاهد الأعمال",
    ctaCv: "السيرة الذاتية",
    scroll: "مرّر",
    tip: "جرّب: اضغط I ومرّر المؤشر على أي عنصر",
  },
  inspect: {
    on: "وضع الفحص",
    hint: "مرّر المؤشر على أي عنصر",
    exit: "اضغط I أو Esc للخروج",
    color: "Color",
    font: "Font",
    background: "Background",
    padding: "Padding",
    a11y: "Accessibility",
    name: "Name",
    role: "Role",
    focusable: "Keyboard-focusable",
  },
  about: {
    label: "نبذة",
    statement:
      "أنا مطوّر واجهات أمامية من القاهرة، أحوّل الأفكار إلى واجهات سريعة *ومتجاوبة*. خلال العام الماضي أطلقت منتجات حقيقية لعملاء حقيقيين: موقع عقارات فاخر *بلغتين*، ومتتبّع طلبات مباشر يتعامل مع *آلاف* الطلبات يوميًا، ومساهمات في المنصة الرسمية لـ AutoMechanic.",
    body: "أهتم بالتفاصيل التي تشعر بها قبل أن تلاحظها: تصميم ينعكس بدقة عند التحويل إلى العربية، وحركات لا تتقطع أبدًا، وكود سيشكرني عليه المطوّر التالي. أعمل عن قرب مع الفرق، وأتواصل بوضوح، وأتابع المشروع من أول فكرة حتى النشر الفعلي.",
    stats: [
      { value: 20, suffix: "", label: "مشروعًا منجزًا" },
      { value: 2, suffix: "+", label: "سنة من الخبرة العملية" },
      { value: 4, suffix: "", label: "مشاريع ثنائية اللغة عربي / إنجليزي" },
      { value: 7, suffix: "", label: "مواقع لعملاء تعمل الآن" },
    ],
    cv: "تحميل السيرة الذاتية",
  },
  services: {
    label: "الخدمات",
    title: "ماذا أقدّم لك",
    items: [
      {
        title: "مواقع وصفحات هبوط",
        body: "مواقع تسويقية وصفحات هبوط سريعة التحميل، متوافقة مع محركات البحث، وأنيقة على كل أحجام الشاشات.",
        tags: ["Next.js", "SEO", "Motion"],
      },
      {
        title: "تطبيقات ويب ولوحات تحكم",
        body: "تطبيقات React و Next.js مبنية على بيانات حقيقية: تسجيل دخول ولوحات تحكم وحالة متزامنة دائمًا وواجهات API تتحمل الضغط.",
        tags: ["React", "Prisma", "Redis"],
      },
      {
        title: "ثنائية اللغة و RTL",
        body: "العربية والإنجليزية كما يجب: تخطيطات معكوسة بدقة، ومكوّنات تفهم الاتجاه من اليمين لليسار، وخطوط مريحة للقراءة في الاتجاهين. هذا الموقع مثال، جرّب زر EN.",
        tags: ["i18n", "RTL", "AR / EN"],
      },
      {
        title: "من الفكرة إلى الإطلاق",
        body: "تخطيط مرن (Agile)، وتواصل واضح، ونشر نظيف في النهاية. أقود المشروع من أول مكالمة حتى رابط يعمل على الإنترنت.",
        tags: ["Agile", "Git", "Vercel"],
      },
    ],
  },
  work: {
    label: "أعمال مختارة",
    title: "أعمال مختارة",
    intro: "مواقع لعملاء ولوحات تحكم ومنتجات، كل منها بُني بعناية بالأداء والتفاصيل ومن سيستخدمه.",
    featured: "مميّزة",
    archive: "مشاريع أخرى",
    visit: "زيارة الموقع",
    code: "الكود",
    github: "المزيد على GitHub",
  },
  stack: {
    label: "الأدوات",
    title: "صندوق الأدوات",
    intro: "كل ما في هذا الملف استُخدم في مشروع حقيقي. مرّر المؤشر على أي حزمة لترى أين.",
    usedIn: "استُخدم في",
    none: "جزء من أدواتي اليومية",
    hint: "مرّر المؤشر أو اضغط على أي سطر",
  },
  contact: {
    label: "تواصل",
    title1: "لديك مشروع",
    title2: "في بالك؟",
    title3: "لنبنِه معًا.",
    intro: "عندك فرصة عمل أو مشروع وتريد أن نتعاون؟ تواصل معي، فأنا دائمًا منفتح لمناقشة فرص جديدة.",
    copy: "نسخ",
    copied: "تم النسخ!",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    location: "الموقع",
    social: "تابعني",
    localTime: "الوقت المحلي",
    form: {
      title: "أرسل رسالة",
      name: "اسمك",
      email: "بريدك الإلكتروني",
      message: "حدّثني عن مشروعك",
      send: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      success: "تم إرسال رسالتك. شكرًا لك! سأرد عليك قريبًا.",
      error: "حدث خطأ ما. من فضلك راسلني مباشرة عبر البريد.",
    },
  },
  footer: {
    rights: "جميع الحقوق محفوظة.",
    built: "صُمّم وطُوّر في القاهرة باستخدام Next.js",
    top: "العودة للأعلى",
  },
};

export const dict: Record<Locale, Dict> = { en, ar };

/** "5 projects" / "٥ مشاريع" with correct Arabic plural forms. */
export function projectCount(n: number, lang: Locale) {
  if (lang === "en") return `${n} ${n === 1 ? "project" : "projects"}`;
  if (n === 1) return "مشروع واحد";
  if (n === 2) return "مشروعان";
  if (n <= 10) return `${n} مشاريع`;
  return `${n} مشروعًا`;
}
