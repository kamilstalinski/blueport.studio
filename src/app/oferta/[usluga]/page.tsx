import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqList } from "@/components/pages/FaqList";
import { ServiceContact } from "@/components/pages/service/ServiceContact";
import { ServiceFit } from "@/components/pages/service/ServiceFit";
import { ServiceHero } from "@/components/pages/service/ServiceHero";
import { ServiceProof } from "@/components/pages/service/ServiceProof";
import { ServiceTerms } from "@/components/pages/service/ServiceTerms";
import { SERVICES, getService } from "@/constants/services";

type Props = { params: Promise<{ usluga: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ usluga: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).usluga);
  if (!service) return {};
  const url = `https://blueport.studio/oferta/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: { url },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).usluga);
  if (!service) notFound();

  return (
    <>
      <ServiceHero service={service} />
      <ServiceFit service={service} />
      <ServiceTerms service={service} />
      <ServiceProof service={service} />
      <section className="bp-sec" aria-labelledby="svc-faq-h">
        <div className="bp-shell bp-grid">
          <div className="bp-sec-head">
            <h2 id="svc-faq-h">Częste pytania</h2>
          </div>
          <div className="bp-sec-body">
            <FaqList items={service.faq} />
          </div>
        </div>
      </section>
      <ServiceContact service={service} />
    </>
  );
}
