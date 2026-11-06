import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../lib/gsap';
import { usePageMeta, useReveal } from '../lib/hooks';
import { MILESTONES, FACTS, TEAM } from '../data/milestones';
import { OFFICES, LINKS } from '../data/site';
import PageHero from '../components/PageHero';
import Button from '../components/Button';
import idea from '../assets/zeus/idea.webp';
import victory from '../assets/zeus/victory.webp';
import './About.css';

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('');

export default function About() {
  usePageMeta(
    'About',
    'Social Matters was founded in Hyderabad in 2020. Today our Capsule Communicators work with 250+ brands from offices in Hyderabad and Mumbai.',
  );
  const root = useRef(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.log__progress',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.log__list', start: 'top 60%', end: 'bottom 60%', scrub: true } },
        );
        gsap.utils.toArray('.log__item').forEach((item) => {
          gsap.from(item.children, {
            x: item.classList.contains('log__item--right') ? 40 : -40,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.08,
            scrollTrigger: { trigger: item, start: 'top 80%', once: true },
          });
        });
        gsap.to('.log__zeus', {
          y: -20,
          rotation: 4,
          ease: 'none',
          scrollTrigger: { trigger: '.log', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <PageHero
        code="SM / 05"
        eyebrow="About"
        title={['The journey', 'of capsule', <><em>communicators.</em></>]}
        lead="In spaceflight, the CAPCOM is the one voice that connects mission control with the crew. That is the role we play for brands."
        zeus={idea}
        zeusAlt="Zeus raising a finger with an idea"
        compact
      />

      <section className="section container about-story" aria-labelledby="story-title">
        <h2 id="story-title" className="about-story__quote" data-reveal>
          Founded in 2020 by two young founders who wanted to bring more businesses into the marketing space and help
          them <span className="text-yellow">grow.</span>
        </h2>
        <div className="about-story__body" data-reveal="stagger">
          <p>
            Social Matters started in Hyderabad with a simple idea: great businesses deserve marketing that is as good
            as what they make. We help brands build a distinct digital identity and keep it visible where their
            customers spend time.
          </p>
          <p>
            Our approach covers the whole journey, from brainstorming to execution, with a close eye on the trends and
            tools that bring the right people to your door. Since then the crew has worked with brands across many
            industries, opened a second Hyderabad office and a base in Mumbai.
          </p>
        </div>
      </section>

      <section className="about-facts" aria-label="Social Matters in numbers">
        <ul className="container about-facts__list" data-reveal="stagger">
          {FACTS.map((f) => (
            <li key={f.label}>
              <span className="about-facts__value">{f.value}</span>
              <span className="about-facts__label">{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section log" aria-labelledby="log-title">
        <div className="container">
          <div className="log__head" data-reveal>
            <p className="eyebrow">Mission log</p>
            <h2 id="log-title">
              The ascent to <br />
              reaching <span className="text-yellow">milestones.</span>
            </h2>
          </div>
          <div className="log__list">
            <span className="log__line" aria-hidden="true">
              <span className="log__progress" />
            </span>
            <ol className="log__items">
            {MILESTONES.map((m, i) => (
              <li key={m.date} className={`log__item${i % 2 ? ' log__item--right' : ''}`}>
                <time className="log__date">{m.date}</time>
                <div className="log__card">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
            </ol>
          </div>
          <div className="log__end" data-reveal>
            <img className="log__zeus" src={victory} alt="Zeus planting a flag on a summit" loading="lazy" />
            <p>Crossed several milestones together. There’s more to come.</p>
          </div>
        </div>
      </section>

      <section className="section container about-crew" aria-labelledby="crew-title">
        <div className="about-crew__head" data-reveal>
          <p className="eyebrow">Minds behind our space mission</p>
          <h2 id="crew-title">Mission leads</h2>
        </div>
        <ul className="about-crew__list" data-reveal="stagger">
          {TEAM.map((t) => (
            <li key={t.name} className="crew-card">
              <span className="crew-card__badge" aria-hidden="true">
                {initials(t.name)}
              </span>
              <div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
            </li>
          ))}
          <li className="crew-card crew-card--join">
            <div>
              <h3>Join the crew</h3>
              <p>We are always looking for curious minds.</p>
            </div>
            <a className="link-arrow" href="mailto:hr@socialmatters.agency">
              hr@socialmatters.agency
            </a>
          </li>
        </ul>
      </section>

      <section className="section about-bases" aria-labelledby="bases-title">
        <div className="container">
          <div className="about-bases__head" data-reveal>
            <p className="eyebrow">Our presence</p>
            <h2 id="bases-title">Bases</h2>
            <a className="about-partner" href={LINKS.googlePartner} target="_blank" rel="noreferrer">
              <span className="footer__partner-dot" aria-hidden="true" /> Google Partner within 2 years
            </a>
          </div>
          <ul className="about-bases__list" data-reveal="stagger">
            {OFFICES.map((o) => (
              <li key={o.name}>
                <p className="label">{o.name}</p>
                <h3>{o.city}</h3>
                {o.address && <p className="about-bases__addr">{o.address}</p>}
                {o.map && (
                  <a className="link-arrow" href={o.map} target="_blank" rel="noreferrer">
                    Open in Maps
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="about-bases__cta" data-reveal>
            <Button to="/contact">Start a Project</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
