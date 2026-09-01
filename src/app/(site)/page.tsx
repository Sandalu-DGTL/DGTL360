import { SiteFooter } from '../../components/layout/site-footer';
import { AttitudeSection, WhoWeAreSection } from '../../features/company';
import { EnquirySection } from '../../features/enquiry';
import { HeroSection } from '../../features/hero';
import { DgtlFieldSection } from '../../features/identity';
import { CreativeNav } from '../../features/navigation';
import { TeamSection } from '../../features/team';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <CreativeNav />
      <main id="main-content" className="home-scroll-snap">
        <HeroSection />
        <WhoWeAreSection />
        <AttitudeSection />
        <TeamSection />
        <EnquirySection />
        <DgtlFieldSection />
      </main>
      <SiteFooter />
    </>
  );
}
