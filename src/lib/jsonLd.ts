export type JsonLdItem = Record<string, unknown>;

export function localBusinessJsonLd(): JsonLdItem {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Blueport Studio",
    description: "Studio webowe — strony internetowe i sklepy online w Next.js i WordPress.",
    url: "https://blueport.studio",
    telephone: "+48534287233",
    email: "kontakt@blueport.studio",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Szczecin",
      addressRegion: "Zachodniopomorskie",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.4285,
      longitude: 14.5528,
    },
    areaServed: [
      { "@type": "City", name: "Szczecin" },
      { "@type": "Country", name: "Polska" },
    ],
    serviceType: [
      "Tworzenie stron internetowych",
      "Sklepy internetowe",
      "Web development",
      "WordPress",
      "Next.js",
    ],
    priceRange: "$$",
    sameAs: [],
  };
}

export function websiteJsonLd(): JsonLdItem {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Blueport Studio",
    url: "https://blueport.studio",
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
): JsonLdItem {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
): JsonLdItem {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function caseStudyJsonLd(data: {
  title: string;
  description: string;
  client: string;
  url: string;
  image?: string;
}): JsonLdItem {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: data.title,
    description: data.description,
    url: data.url,
    creator: {
      "@type": "Organization",
      name: "Blueport Studio",
      url: "https://blueport.studio",
    },
    ...(data.image ? { image: data.image } : {}),
  };
}

