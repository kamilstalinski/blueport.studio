import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CaseStudyStory } from "@/components/pages/CaseStudyStory";
import { PageHead } from "@/components/pages/PageHead";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { InView } from "@/components/ui/InView";
import { CASE_STUDIES, isWorkSlug } from "@/constants/caseStudies";
import { WORK_SITES } from "@/constants/work";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/jsonLd";
import type { PageParamsSlug } from "@/types";

const SITE_URL = "https://blueport.studio";

function caseStudySeo(slug: string) {
  if (!isWorkSlug(slug)) return null;
  const study = CASE_STUDIES[slug];
  const url = `${SITE_URL}/realizacje/${slug}`;

  return {
    title: `${study.title} — Realizacja Blueport Studio`,
    description: study.context,
    client: study.client,
    url,
    image: `/og/og-realizacje-${slug}.png`,
  };
}

export function generateStaticParams() {
  return WORK_SITES.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: PageParamsSlug): Promise<Metadata> {
  const { slug } = await params;
  const seo = caseStudySeo(slug);

  if (!seo) {
    return {
      title: "Realizacja — Blueport Studio",
      alternates: { canonical: `${SITE_URL}/realizacje` },
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.url },
    openGraph: {
      url: seo.url,
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.image, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
  };
}

export default async function CaseStudyPage({ params }: PageParamsSlug) {
  const { slug } = await params;
  const seo = caseStudySeo(slug);
  const site = WORK_SITES.find((entry) => entry.slug === slug);
  if (!seo || !site || !isWorkSlug(slug)) notFound();

  const study = CASE_STUDIES[slug];
  const breadcrumbs = [
    { name: "Strona główna", url: SITE_URL },
    { name: "Realizacje", url: `${SITE_URL}/realizacje` },
    { name: study.title, url: seo.url },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudyJsonLd({ title: seo.title, description: seo.description, client: seo.client, url: seo.url, image: seo.image })),
        }}
      />
      <PageHead title={site.name} titleWidth="20ch" lede={site.desc} meta={site.domain} back={{ href: "/realizacje", label: "Wszystkie realizacje" }} />
      <section className="page-body" aria-label="Zrzut strony">
        <div className="shell">
          <InView className="reveal">
            <div className="shot chamfer cs-shot">
              <Image src={site.image} alt={`Strona ${site.name}`} width={1200} height={825} sizes="(max-width: 1240px) 100vw, 1184px" priority />
            </div>
          </InView>
        </div>
      </section>
      <CaseStudyStory study={study} />
      <CtaBand />
    </>
  );
}
