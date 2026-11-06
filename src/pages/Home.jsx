import { usePageMeta } from '../lib/hooks';
import Hero from '../sections/home/Hero';
import AboutStatement from '../sections/home/AboutStatement';
import ZeusComic from '../sections/home/comic/ZeusComic';
import ServicesScroller from '../sections/home/ServicesScroller';
import Works from '../sections/home/Works';
import WhyUs from '../sections/home/WhyUs';
import SectionConnector from '../components/motion/SectionConnector';

export default function Home() {
  usePageMeta(
    null,
    'Social Matters is a branding and digital marketing agency in Hyderabad and Mumbai. We study your brand, plan the mission and launch campaigns people notice.',
  );

  return (
    <>
      <Hero />
      <AboutStatement />
      <ZeusComic />
      <div className="section-joint" aria-hidden="true">
        <SectionConnector />
      </div>
      <ServicesScroller />
      <Works />
      <WhyUs />
    </>
  );
}
