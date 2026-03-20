import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/kalkulator",
          "/polityka-prywatnosci",
          "/regulamin",
          "/api/",
        ],
      },
    ],
    sitemap: "https://blueport.studio/sitemap.xml",
  };
}

