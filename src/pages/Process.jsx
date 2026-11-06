import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../lib/gsap';
import { usePageMeta, useReveal } from '../lib/hooks';
import { MISSIONS } from '../data/process';
import PageHero from '../components/PageHero';
import Button from '../components/Button';
import whiteboard from '../assets/zeus/whiteboard.webp';
import './Process.css';

export default function Process() {
  usePageMeta(
    'Process',
    'The Social Matters method: brand study, market research, strategy, planning, campaign building, marketing, evaluation, then optimise and repeat.',
  );
  const root = useRef(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray('.mission-row').forEach((row) => {
          gsap.from(row, {
            y: 50,
            autoAlpha: 0,
            duration: 0.9,
            scrollTrigger: { trigger: row, start: 'top 90%', once: true },
          });
        });
        gsap.fromTo(
          '.loop__ring',
          { drawSVG: '0%' },
          { drawSVG: '100%', ease: 'none', scrollTrigger: { trigger: '.loop', start: 'top 80%', end: 'center 50%', scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <PageHero
        code="SM / 04"
        eyebrow="Process"
        title={['From an idea', <>to <em>impact.</em></>]}
        lead="Eight missions, one loop. It’s how every brand we work with goes from the first question to campaigns that keep getting better."
        zeus={whiteboard}
        zeusAlt="Zeus planning on a whiteboard"
      />

      <section className="section" aria-labelledby="missions-title">
        <div className="container">
          <div className="missions__head" data-reveal>
            <h2 id="missions-title">The mission plan</h2>
            <p className="label">Hover a mission to meet Zeus on the job</p>
          </div>
        </div>
        <ol className="missions">
          {MISSIONS.map((m) => (
            <li key={m.id} className="mission-row">
              <div className="container mission-row__inner">
                <span className="mission-row__num">{m.num}</span>
                <div className="mission-row__main">
                  <h3>{m.title}</h3>
                  <p className="mission-row__quote">
                    “{m.bubble[0]} {m.bubble[1]}”
                  </p>
                  <p className="mission-row__body">{m.body}</p>
                  <ul className="mission-row__list" aria-label={`${m.title} deliverables`}>
                    {m.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <img className="mission-row__zeus" src={m.poses[1].src} alt={m.poses[1].alt} loading="lazy" />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section loop" aria-labelledby="loop-title">
        <div className="container loop__inner">
          <svg className="loop__svg" viewBox="0 0 200 200" aria-hidden="true">
            <circle className="loop__track" cx="100" cy="100" r="88" />
            <circle className="loop__ring" cx="100" cy="100" r="88" />
            <text x="100" y="94" textAnchor="middle" className="loop__big">
              08 → 01
            </text>
            <text x="100" y="120" textAnchor="middle" className="loop__small">
              REPEAT
            </text>
          </svg>
          <div data-reveal>
            <p className="eyebrow">The loop</p>
            <h2 id="loop-title">The last mission is the first step of the next one.</h2>
            <p className="lead">
              Every report feeds the next plan. That is how campaigns get sharper and brands keep growing, month after
              month.
            </p>
            <div className="loop__actions">
              <Button to="/contact">Start a Project</Button>
              <Button to="/#process-story" variant="ghost">
                Watch Zeus’s story
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
