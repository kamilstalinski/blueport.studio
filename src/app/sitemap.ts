import type { MetadataRoute } from "next";

const BASE_URL = "https://blueport.studio";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/uslugi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/oferta", priority: 0.9, changeFrequency: "monthly" },
  { path: "/oferta/strony", priority: 0.9, changeFrequency: "monthly" },
  { path: "/oferta/sklepy", priority: 0.9, changeFrequency: "monthly" },
  { path: "/cennik", priority: 0.85, changeFrequency: "monthly" },
  { path: "/realizacje", priority: 0.85, changeFrequency: "weekly" },
  { path: "/kontakt", priority: 0.8, changeFrequency: "yearly" },
  { path: "/o-nas", priority: 0.75, changeFrequency: "monthly" },
  { path: "/proces", priority: 0.75, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/wycena", priority: 0.7, changeFrequency: "monthly" },
];

const CASE_STUDY_SLUGS = [
  "vilmart",
  "dowytrenowania",
  "abcmosty",
  "afterthesin",
  "dobreprecle",
  "spavalnia",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const caseStudyEntries = CASE_STUDY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/realizacje/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...caseStudyEntries];
}

