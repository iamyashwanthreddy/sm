import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { scrollTo, useLenis } from '../lib/lenis';
import { usePageMeta, useReveal } from '../lib/hooks';
import { SERVICES } from '../data/services';
import PageHero from '../components/PageHero';
import Button from '../components/Button';
import megaphone from '../assets/zeus/megaphone.webp';
import './Services.css';

export default function Services() {
  usePageMeta(
    'Services',
    'Branding, brand strategy, social media marketing, performance marketing, content, websites and franchise growth from Social Matters, Hyderabad.',
  );
  const root = useRef(null);
  const lenis = useLenis();
  const [active, setActive] = useState(SERVICES[0].id);
  useReveal(root);

  // Highlight the service currently in view in the sticky index.
  useGSAP(
    () => {
      gsap.utils.toArray('.svc-chapter', root.current).forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => self.isActive && setActive(el.id),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <PageHero
        code="SM / 02"
        eyebrow="Services"
        title={[
          'Everything',
          'your brand',
          <>
            needs to <em>launch.</em>
          </>,
        ]}
        lead="Marketing isn’t just about epic strategy. It’s about nailing every detail with a fresh perspective. Here’s what our crew handles, from first idea to final report."
        zeus={megaphone}
        zeusAlt="Zeus announcing through a megaphone"
      />

      <section className="section container svc-page" aria-label="Service details">
        <nav className="svc-index" aria-label="Services index">
          <p className="label">Index</p>
          <ol>
            {SERVICES.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === s.id ? 'is-active' : undefined}
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(s.id);
                    scrollTo(lenis, el, { offset: -110 });
                    history.replaceState(null, '', `#${s.id}`);
                  }}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="svc-chapters">
          {SERVICES.map((s, i) => (
            <article key={s.id} id={s.id} className="svc-chapter" aria-labelledby={`${s.id}-title`}>
              <div className="svc-chapter__head" data-reveal>
                <span className="svc-chapter__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 id={`${s.id}-title`}>{s.title}</h2>
              </div>
              <div className="svc-chapter__body" data-reveal>
                <div>
                  <p className="svc-chapter__short">{s.short}</p>
                  <p className="svc-chapter__desc">{s.description}</p>
                  <h3 className="label">What you get</h3>
                  <ul className="svc-chapter__list">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <figure className={`svc-chapter__zeus svc-chapter__zeus--${i % 3}`}>
                  <img src={s.zeus} alt={s.zeusAlt} loading="lazy" />
                </figure>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section svc-cta" aria-labelledby="svc-process">
        <div className="container svc-cta__inner" data-reveal>
          <div>
            <p className="eyebrow">How it comes together</p>
            <h2 id="svc-process">Every service runs on the same eight-step mission plan.</h2>
          </div>
          <div className="svc-cta__actions">
            <Button to="/process">See the process</Button>
            <Button to="/contact" variant="ghost">
              Start a Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
