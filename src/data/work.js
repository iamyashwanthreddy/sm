// Portfolio entries use artwork from the agency's own project folders
// (E:/SM Websites/sm/portfolio, /sm/case studies, /Kshetra farm, /TDS Images, /Justyou Cosmetics).
// Summaries describe only what the artwork shows. Confirm client approval and
// scope with the account team before publishing; add results only when verified.
//
// format tells the portfolio layout how to frame the cover:
//   landscape (wide photo) · square · identity (logo artwork, shown contained) · panorama (very wide banner)
import pista from '../assets/work/pista-house.webp';
import pistaPoster from '../assets/work/pista-house-poster.webp';
import kshetraLogo from '../assets/work/kshetra-logo.webp';
import kshetraBottle from '../assets/work/kshetra-bottle.webp';
import kshetraCampaign from '../assets/work/kshetra-campaign.webp';
import pravarsha from '../assets/work/pravarsha-logo.webp';
import ekadhi from '../assets/work/ekadhi-logo.webp';
import tds1 from '../assets/work/tds-1.webp';
import tds2 from '../assets/work/tds-2.webp';
import tds3 from '../assets/work/tds-3.webp';
import justyou from '../assets/work/justyou-banner.webp';

export const WORK = [
  {
    slug: 'pista-house',
    format: 'landscape',
    client: 'Pista House',
    title: 'A cup of chai, a piece of heritage.',
    services: ['Campaign Creative', 'Social Media'],
    location: 'Hyderabad',
    cover: pista,
    coverPosition: '50% 50%',
    tone: '#3a2412',
    summary:
      'Campaign artwork for Pista House pairing tea with its signature biscuits: warm, rich product art built around the line “Ek pyali chai, ek tukda virasat.”',
    gallery: [
      { src: pistaPoster, alt: 'Pista House poster: chai and biscuit on an ornate brass tray with the Charminar behind' },
      { src: pista, alt: 'Pista House tea cup and biscuit with saffron and pistachios' },
    ],
  },
  {
    slug: 'kshetra-farm',
    format: 'square',
    client: 'Kshetra Farm',
    title: 'Purity in every drop.',
    services: ['Branding', 'Packaging'],
    location: 'Hyderabad',
    cover: kshetraBottle,
    coverPosition: '50% 50%',
    tone: '#e6e6e6',
    summary:
      'Identity and packaging for a farm-fresh dairy brand. A bold K-mark built from field, grain and cattle carries onto milk bottles and launch creative.',
    gallery: [
      { src: kshetraLogo, alt: 'Kshetra Farm logo: a red K formed from fields, wheat and a cow' },
      { src: kshetraBottle, alt: 'Kshetra A2 buffalo milk bottle with a blue and white label' },
      { src: kshetraCampaign, alt: 'Kshetra creative: “Delivering purity in every drop” with a milk bottle in a splash' },
    ],
  },
  {
    slug: 'pravarsha-dairy',
    format: 'identity',
    client: 'Pravarsha Dairy',
    title: 'A fresh mark for a dairy brand.',
    services: ['Brand Identity'],
    location: 'India',
    cover: pravarsha,
    coverPosition: '50% 50%',
    coverFit: 'contain',
    tone: '#ffffff',
    summary:
      'A leaf-green monogram identity for a dairy brand, designed to read cleanly on packs, signage and social.',
    gallery: [{ src: pravarsha, alt: 'Pravarsha Dairy logo: a green leaf-shaped P monogram above a serif wordmark' }],
  },
  {
    slug: 'the-diamond-store',
    format: 'landscape',
    client: 'The Diamond Store',
    title: 'Fine jewellery, front and centre.',
    services: ['Website', 'Digital Campaign'],
    location: 'India',
    cover: tds1,
    coverPosition: '50% 30%',
    tone: '#1d3d5c',
    summary:
      'A digital presence for a fine-jewellery brand, led by bold model imagery and a clean, product-first layout.',
    gallery: [
      { src: tds2, alt: 'Model in a red gown wearing a sapphire diamond necklace' },
      { src: tds3, alt: 'Model wearing a pink-stone diamond necklace and earrings' },
      { src: tds1, alt: 'Model wearing an emerald diamond necklace and rings' },
    ],
  },
  {
    slug: 'just-you-cosmetics',
    format: 'panorama',
    client: 'Just You Cosmetics',
    title: 'Beauty, in low light.',
    services: ['Website', 'Art Direction'],
    location: 'India',
    cover: justyou,
    coverPosition: '30% 50%',
    tone: '#0b0b0b',
    summary:
      'A brand website for a cosmetics label, with moody, product-first art direction that lets each piece glow against black.',
    gallery: [{ src: justyou, alt: 'Just You cosmetics products on a dark surface with white flowers' }],
  },
  {
    slug: 'ekadhi',
    format: 'identity',
    client: 'Ekadhi Silver Jewellery',
    title: 'Quiet luxury in silver.',
    services: ['Brand Identity'],
    location: 'India',
    cover: ekadhi,
    coverPosition: '50% 50%',
    coverFit: 'contain',
    tone: '#0f3b33',
    summary:
      'A lotus-led wordmark and deep-green palette for a silver jewellery label: calm, crafted and premium.',
    gallery: [{ src: ekadhi, alt: 'Ekadhi Silver Jewellery logo: a line-art lotus above the wordmark on deep green' }],
  },
];

export const getProject = (slug) => WORK.find((p) => p.slug === slug);
