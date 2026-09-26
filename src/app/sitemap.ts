import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: SITE_URL, ar: `${SITE_URL}/ar` } },
    },
    {
      url: `${SITE_URL}/ar`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: SITE_URL, ar: `${SITE_URL}/ar` } },
    },
  ];
}
