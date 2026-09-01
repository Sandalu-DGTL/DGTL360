import type { Service } from '../../features/services/types/service.types';

export const services: Service[] = [
  {
    order: 1,
    slug: 'production',
    label: 'Production',
    cardHeadline: 'Hear it first. See it through.',
    preview: 'Sound + Vision',
    summary: 'Sound, film and motion that earn the replay.',
    detailDescription:
      'Production covers everything created in sound and colour—from original music and voice to TVCs, photography, live production, motion, VFX and the final grade.',
    tagline: 'Sound + Vision',
    accent: '#ff5c35',
    image: '/assets/reference/homepage-reference.png',
    imagePosition: '74% 70%',
    sections: [
      { title: 'Sound', body: 'Songs, jingles, voiceovers, voice prompts and complete podcast production—from first idea to publish-ready master.' },
      { title: 'Capture', body: 'TVCs, music videos, digital ads, corporate films, branded content, live productions, creative development and photography.' },
      { title: 'Post & Polish', body: 'Motion graphics, 2D and 3D animation, VFX, compositing, colour grading and AI-assisted content production.' },
    ],
  },
  {
    order: 2,
    slug: 'brand-strategy',
    label: 'Branding & Strategy',
    cardHeadline: 'Find the idea. Build the system.',
    preview: 'Identity + System',
    summary: 'Positioning, identity and go-to-market—sorted, not decorated.',
    detailDescription:
      'We find the strategic idea that makes a business distinctive, build it into a coherent identity and connect it to the decisions that take the brand to market.',
    tagline: 'Identity + System',
    accent: '#2350ff',
    image: '/assets/reference/who-we-are.png',
    imagePosition: '28% 48%',
    sections: [
      { title: 'Positioning', body: 'Research, competitive mapping and dialogue that define where the brand can win and why anyone should care.' },
      { title: 'Identity', body: 'Logo design, colour, typography, tone, templates, guidelines and artwork built as one recognisable system.' },
      { title: 'Go-to-Market', body: 'Trade marketing and business 0–1 foundations that connect naming, messaging and launch to the core strategy.' },
    ],
  },
  {
    order: 3,
    slug: 'digital-marketing',
    label: 'Digital Marketing',
    cardHeadline: 'Make noise. Then move the numbers.',
    preview: 'Campaigns + Growth',
    summary: 'Campaigns, creators and paid media tuned to actual outcomes.',
    detailDescription:
      'Digital and social strategy, content, platform handling, paid media, creator partnerships, web experiences and SEO work together as one learning loop.',
    tagline: 'Campaigns + Growth',
    accent: '#ff2d9a',
    image: '/assets/reference/attitude.png',
    imagePosition: '28% 48%',
    sections: [
      { title: 'Strategy', body: 'Digital and social strategies that reach the right people, keep the brand relevant and provide a clear plan for growth.' },
      { title: 'Content & Community', body: 'Audio, video and graphic content, daily platform handling, creator partnerships and audience engagement.' },
      { title: 'Performance', body: 'Social advertising, Google advertising, websites and SEO measured against useful awareness, leads and conversion.' },
    ],
  },
  {
    order: 4,
    slug: 'web-platforms',
    label: 'Web Development',
    cardHeadline: 'Built to work. Built to last.',
    preview: 'Build + Manage',
    summary: 'Full-stack builds, CMS, CRM and workflows. No template theatre.',
    detailDescription:
      'We develop the systems a business runs on, not only the site customers see. Full-stack builds, CMS platforms and connected CRM workflows are designed together.',
    tagline: 'Build + Manage',
    accent: '#ff9f1c',
    image: '/assets/reference/team-collective.png',
    imagePosition: '72% 54%',
    sections: [
      { title: 'Build', body: 'End-to-end full-stack web development handled by one accountable technical team.' },
      { title: 'Manage', body: 'Content-management systems that give teams safe, structured and ongoing editorial control.' },
      { title: 'Connect', body: 'CRM, automation and operational workflows that keep the customer and business systems moving together.' },
    ],
  },
  {
    order: 5,
    slug: 'apps-product',
    label: 'App Development',
    cardHeadline: 'One idea. Every platform.',
    preview: 'Build + Operate',
    summary: 'iOS, Android and PWA—from prototype to reliable release.',
    detailDescription:
      'We turn a product problem into a testable experience, carry it through interface and engineering, then keep it operating after the first release.',
    tagline: 'Build + Operate',
    accent: '#ff6247',
    image: '/assets/reference/team-profile.png',
    imagePosition: '70% 45%',
    sections: [
      { title: 'Build', body: 'Agile product development augmented with appropriate AI tools and grounded in regular testing.' },
      { title: 'Platforms', body: 'Native iOS and Android applications plus progressive web apps designed around the strengths of each platform.' },
      { title: 'Operate', body: 'DevOps augmentation, monitoring and ongoing technical support that keep the product reliable after launch.' },
    ],
  },
  {
    order: 6,
    slug: 'business-systems',
    label: 'Digital Services',
    cardHeadline: 'Every touchpoint. One system.',
    preview: 'Service + Scale',
    summary: 'POS, HRM, service and enterprise systems that connect the work.',
    detailDescription:
      'We connect the operational work hiding behind forms, spreadsheets and handoffs into simpler customer, people and enterprise systems.',
    tagline: 'Service + Scale',
    accent: '#0a7f5a',
    image: '/assets/reference/enquiry.png',
    imagePosition: '75% 48%',
    sections: [
      { title: 'Customer Touchpoints', body: 'Point-of-sale and customer-service systems built for smooth transactions and organised support.' },
      { title: 'People & Operations', body: 'HRM solutions that simplify people management from onboarding through daily operations.' },
      { title: 'Enterprise Scale', body: 'Custom digital systems built around the requirements, governance and integration needs of larger organisations.' },
    ],
  },
  {
    order: 7,
    slug: 'events-experiences',
    label: 'Events & Experiences',
    cardHeadline: 'The idea. The room. The moment.',
    preview: 'Concept + Production',
    summary: 'Corporate, private and social events—big feel, no loku scene.',
    detailDescription:
      'We build events around the feeling people should leave with, then make strategy, creative, venue, staging, AV, talent and logistics support it.',
    tagline: 'Concept + Production',
    accent: '#8d33ff',
    image: '/assets/reference/events-detail-reference.png',
    imagePosition: '52% 45%',
    sections: [
      { title: 'Corporate Events', body: 'Conferences, workshops, AGMs, awards, team days, retreats, celebrations and gala dinners brought together end to end.' },
      { title: 'Private & Social Events', body: 'Birthdays, anniversaries, engagements, cultural programmes, festivals, sport, community and cause-led experiences.' },
      { title: 'Weddings', body: 'Concept, venue, décor, invitations, entertainment, photography, film and coordination shaped around the couple’s story.' },
      { title: 'Custom Event Solutions', body: 'Strategy, creative, technology, production, talent and logistics assembled without a fixed formula.' },
    ],
  },
  {
    order: 8,
    slug: 'agentic-systems',
    label: 'Agentic Biz Systems',
    cardHeadline: 'Trained to think. Built to act.',
    preview: 'Agents + Automation',
    summary: 'Practical agents and workflows—with humans still in charge.',
    detailDescription:
      'We map repetitive work, connect the right tools and introduce agents where they genuinely help—keeping visible controls, audit trails and people in charge.',
    tagline: 'Agents + Automation',
    accent: '#00aee8',
    image: '/assets/reference/homepage-reference.png',
    imagePosition: '58% 55%',
    sections: [
      { title: 'Agents', body: 'Autonomous AI agents and agentic workflows that complete defined multi-step work inside clear boundaries.' },
      { title: 'Automation & Integration', body: 'Repetitive processes automated and connected cleanly into the tools the organisation already uses.' },
      { title: 'Augmentation', body: 'Agentic employee augmentation that supports people’s judgement and capacity rather than replacing accountability.' },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}
