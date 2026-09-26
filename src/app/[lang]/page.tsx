import { notFound } from "next/navigation";
import { isLocale, profile, SITE_URL } from "@/content/site";
import { dict } from "@/content/dict";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { Services } from "@/components/services";
import { Stack } from "@/components/stack";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name.en,
    alternateName: profile.name.ar,
    jobTitle: profile.role.en,
    description: dict.en.meta.description,
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    sameAs: profile.socials.map((s) => s.href),
    knowsLanguage: ["en", "ar"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav lang={lang} />
      <main id="main">
        <Hero lang={lang} />
        <Marquee />
        <About lang={lang} />
        <Work lang={lang} />
        <Services lang={lang} />
        <Stack lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
