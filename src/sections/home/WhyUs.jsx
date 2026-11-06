import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { LINKS } from '../../data/site';
import SectionConnector from '../../components/motion/SectionConnector';
import thumbsUp from '../../assets/zeus/thumbs-up.webp';
import './WhyUs.css';

// Figures from socialmatters.agency (home + about pages).
const REASONS = [
  {
    code: 'SYS-01',
    value: '250+',
    title: 'Brands on board',
    text: 'Clients across food, jewellery, education, agriculture and more since 2020.',
  },
  {
    code: 'SYS-02',
    value: '170',
    title: 'Franchise openings supported',
    text: 'A dedicated franchise practice that helps one great outlet become a network, then markets every launch.',
  },
  {
    code: 'SYS-03',
    value: '2 yrs',
    title: 'To Google Partner',
    text: 'We became a Google Partner within two years of lift-off, so your paid media runs on proven practice.',
    link: { href: LINKS.googlePartner, label: 'Verify our Google Partner profile' },
  },
  {
    code: 'SYS-04',
    value: '1 crew',
    title: 'Idea to execution',
    text: 'Strategy, creative, content, web and media under one roof in Hyderabad and Mumbai. Nothing gets lost between agencies.',
  },
];

export default function WhyUs() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from('.why__cell', {
          autoAlpha: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.9,
          scrollTrigger: { trigger: '.why__grid', start: 'top 80%', once: true },
        });
        gsap.from('.why__cell-line', {
          scaleX: 0,
          transformOrigin: 'left',
          stagger: 0.1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.why__grid', start: 'top 80%', once: true },
        });
        gsap.fromTo(
          '.why__zeus',
          { y: 80, rotation: 8 },
          { y: -40, rotation: -4, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="why section" aria-labelledby="why-title">
      <div className="container why__inner">
        <div className="why__intro">
          <SectionConnector className="why__connector" />
          <p className="eyebrow">Why Social Matters</p>
          <h2 id="why-title">
            Why brands launch <br />
            with <span className="text-yellow">us.</span>
          </h2>
          <p className="lead">
            We call ourselves Capsule Communicators: the people on the ground who keep a mission on course. For brands,
            that means fewer handovers, faster decisions and work that stays true to who you are.
          </p>
          <img className="why__zeus" src={thumbsUp} alt="Zeus giving a thumbs up" loading="lazy" width="254" height="356" />
        </div>

        <ul className="why__grid">
          {REASONS.map((r) => (
            <li key={r.code} className="why__cell">
              <span className="why__cell-line" aria-hidden="true" />
              <span className="label">{r.code}</span>
              <p className="why__value">{r.value}</p>
              <h3>{r.title}</h3>
              <p className="why__text">{r.text}</p>
              {r.link && (
                <a className="why__link" href={r.link.href} target="_blank" rel="noreferrer">
                  {r.link.label} ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
