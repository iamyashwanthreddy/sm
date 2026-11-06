// Service names follow socialmatters.agency/services ("We are experts at") and
// the web services listed on sm.socialmatters.in.
import creativeIdea from '../assets/zeus/creative-idea.webp';
import whiteboard from '../assets/zeus/whiteboard.webp';
import megaphone from '../assets/zeus/megaphone.webp';
import presenting from '../assets/zeus/presenting.webp';
import designing from '../assets/zeus/designing.webp';
import working from '../assets/zeus/working.webp';
import pointing from '../assets/zeus/pointing.webp';
import launching from '../assets/zeus/launching.webp';

export const SERVICES = [
  {
    id: 'branding',
    title: 'Branding',
    short: 'Identities with a point of view.',
    description:
      'How your brand looks, sounds and feels: logo, visual identity, packaging and the guidelines that keep it consistent wherever it shows up.',
    deliverables: ['Logo & visual identity', 'Brand guidelines', 'Packaging', 'Brand collateral'],
    zeus: creativeIdea,
    zeusAlt: 'Zeus at a laptop holding up a lightbulb',
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    short: 'Why you, and not the next option.',
    description:
      'Positioning and messaging grounded in research, so every campaign starts from the same clear idea of who you are and who you are for.',
    deliverables: ['Brand audit', 'Audience & competitor research', 'Positioning & messaging', 'Go-to-market plan'],
    zeus: whiteboard,
    zeusAlt: 'Zeus mapping a plan on a whiteboard',
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    short: 'Feeds people stop for.',
    description:
      'Platform strategy, content calendars and community management that build visibility across social media and keep people coming back.',
    deliverables: ['Platform strategy', 'Content calendars', 'Community management', 'Influencer collaborations'],
    zeus: megaphone,
    zeusAlt: 'Zeus speaking through a megaphone',
  },
  {
    id: 'performance',
    title: 'Performance Marketing',
    short: 'Paid media that has to earn its keep.',
    description:
      'Search and social campaigns built around leads and sales, optimised continuously and reported in plain language.',
    deliverables: ['Google Ads', 'Meta Ads', 'Landing page optimisation', 'Performance reporting'],
    zeus: presenting,
    zeusAlt: 'Zeus presenting a rising bar chart',
  },
  {
    id: 'content',
    title: 'Content & Creative',
    short: 'Creative that carries the brand.',
    description:
      'Social creatives, campaign artwork, reels and copy, designed as one system so the brand feels familiar in every format.',
    deliverables: ['Campaign artwork', 'Social creatives', 'Reels & video', 'Copywriting'],
    zeus: designing,
    zeusAlt: 'Zeus sketching on a tablet',
  },
  {
    id: 'web',
    title: 'Website Development',
    short: 'Fast sites that turn visits into enquiries.',
    description:
      'Responsive, SEO-friendly websites, UI/UX design and Flutter mobile apps, built to load fast and convert.',
    deliverables: ['Websites & e-commerce', 'UI / UX design', 'Mobile apps', 'SEO'],
    zeus: working,
    zeusAlt: 'Zeus working on a laptop beside a stack of books',
  },
  {
    id: 'franchise-consulting',
    title: 'Franchise Consulting',
    short: 'From one outlet to a model others buy into.',
    description:
      'Guidance for brands ready to expand through franchising, from shaping the model to preparing for partner conversations.',
    deliverables: ['Franchise readiness', 'Expansion planning', 'Partner pitch material', 'Launch support'],
    zeus: pointing,
    zeusAlt: 'Zeus pointing ahead',
  },
  {
    id: 'franchise-marketing',
    title: 'Franchise Marketing',
    short: 'Launches and leads for growing networks.',
    description:
      'Lead generation for franchise enquiries and launch campaigns for new outlets, with local marketing that keeps every location busy.',
    deliverables: ['Franchise lead generation', 'Investor-facing creative', 'Outlet launch campaigns', 'Local store marketing'],
    zeus: launching,
    zeusAlt: 'Zeus riding a rocket',
  },
];
