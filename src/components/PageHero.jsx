import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../lib/gsap';
import './PageHero.css';

/**
 * Inner-page opener: mission label, large title, lead and a Zeus pose on an orbit.
 * `title` is an array of lines; wrap a word in <em> for the yellow accent.
 */
export default function PageHero({ code, eyebrow, title, lead, zeus, zeusAlt, compact, children }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });
        tl.from('.page-hero__line > span', { yPercent: 110, duration: 1.1, stagger: 0.08 })
          .from('.page-hero__meta > *, .page-hero__lead, .page-hero__extra', { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.8 }, 0.2)
          .from('.page-hero__orbit circle', { drawSVG: '0%', duration: 1.6, ease: 'power2.inOut', stagger: 0.15 }, 0)
          .from('.page-hero__zeus', { y: 60, autoAlpha: 0, rotation: 8, duration: 1.2 }, 0.3);
        gsap.to('.page-hero__zeus', { y: -12, rotation: -2, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 });
        gsap.to('.page-hero__visual', {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`page-hero${compact ? ' page-hero--compact' : ''}`}>
      <div className="stars" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="page-hero__text">
          <div className="page-hero__meta">
            <span className="label page-hero__code">{code}</span>
            <p className="eyebrow">{eyebrow}</p>
          </div>
          <h1 className="page-hero__title">
            {title.map((line, i) => (
              <span key={i} className="page-hero__line">
                <span>{line}</span>
              </span>
            ))}
          </h1>
          {lead && <p className="lead page-hero__lead">{lead}</p>}
          {children && <div className="page-hero__extra">{children}</div>}
        </div>
        {zeus && (
          <div className="page-hero__visual">
            <svg className="page-hero__orbit" viewBox="0 0 400 400" aria-hidden="true">
              <circle cx="200" cy="200" r="190" />
              <circle cx="200" cy="200" r="140" />
            </svg>
            <img className="page-hero__zeus" src={zeus} alt={zeusAlt} />
          </div>
        )}
      </div>
    </section>
  );
}
