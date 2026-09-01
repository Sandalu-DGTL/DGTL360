import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getService, services } from '../../../../content/local/services';
import { ServiceDetailPage } from '../../../../features/services/components/detail/service-detail-page';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: service.label,
    description: service.summary,
    openGraph: {
      title: `${service.label} — DGTL 360`,
      description: service.summary,
      images: [{ url: service.image, alt: `${service.label} by DGTL 360` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.label} — DGTL 360`,
      description: service.summary,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
