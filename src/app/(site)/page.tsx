import { SiteFooter } from '../../components/layout/site-footer';
import { services } from '../../content/local/services';
import { AttitudeSection } from '../../features/company/components/attitude-section';
import { WhoWeAreSection } from '../../features/company/components/who-we-are-section';
import { EnquirySection } from '../../features/enquiry/components/enquiry-section';
import { HeroSection } from '../../features/hero/components/hero-section';
import { DgtlFieldSection } from '../../features/identity/components/dgtl-field-section';
import { CreativeNav } from '../../features/navigation/components/creative-nav';
import type { HomeService } from '../../features/services/types/service.types';
import { TeamSection } from '../../features/team/components/team-section.client';

const homeServices: HomeService[] = services.map(
  ({
    order,
    slug,
    label,
    cardHeadline,
    preview,
    summary,
    detailDescription,
    accent,
    image,
    imagePosition,
  }) => ({
    order,
    slug,
    label,
    cardHeadline,
    preview,
    summary,
    detailDescription,
    accent,
    image,
    imagePosition,
  }),
);

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <CreativeNav homepage />
      <main id="main-content" className="home-scroll-snap">
        <HeroSection services={homeServices} />
        <div className="home-section-slides">
          <WhoWeAreSection />
          <AttitudeSection />
          <TeamSection />
          <EnquirySection />
          <DgtlFieldSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
