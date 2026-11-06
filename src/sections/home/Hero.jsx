import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import Button from '../../components/Button';
import Constellation from '../../components/motion/Constellation';
import zeus from '../../assets/zeus/zeus-hero.webp';
import earth from '../../assets/space/earth-horizon.webp';
import './Hero.css';

const CHIPS = ['Branding', 'Social Media', 'Performance', 'Content', 'Websites', 'Franchise'];

function RotatingChip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia(MQ.reduce).matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % CHIPS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hero__chip" aria-hidden="true">
      <span key={i} className="hero__chip-text">
        {CHIPS[i]}
      </span>
    </span>
  );
}

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const section = root.current;
        const win = section.querySelector('.hero__window');
        const top = section.querySelector('.hero__top');
        const bottom = section.querySelector('.hero__bottom');
        section.classList.add('hero--cinematic');

        // The window starts in the gap between headline and description.
        const gap = () => {
          const s = section.getBoundingClientRect();
          const t = top.getBoundingClientRect();
          const b = bottom.getBoundingClientRect();
          const width = Math.min(560, s.width * 0.62);
          return {
            top: t.bottom - s.top + 14,
            bottom: Math.max(s.bottom - b.top + 14, 0),
            side: (s.width - width) / 2,
            mid: s.width / 2,
          };
        };
        const startClip = () => {
          const g = gap();
          return `inset(${g.top}px ${g.side}px ${g.bottom}px ${g.side}px round 18px)`;
        };
        const slitClip = () => {
          const g = gap();
          return `inset(${g.top}px ${g.mid}px ${g.bottom}px ${g.mid}px round 18px)`;
        };

        // Scroll: headline up, description down, window opens to full viewport.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 1.6}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(win, { clipPath: startClip }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1 }, 0)
          .to(top, { yPercent: -140, duration: 0.8 }, 0)
          .to('.hero__line--a', { xPercent: -8, duration: 0.8 }, 0)
          .to('.hero__line--b', { xPercent: 8, duration: 0.8 }, 0)
          .to(bottom, { yPercent: 160, duration: 0.8 }, 0)
          .fromTo('.hero__earth', { scale: 1.35, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1 }, 0)
          .fromTo('.hero__zeus', { scale: 1.9, yPercent: 22 }, { scale: 1, yPercent: 0, duration: 1 }, 0)
          .from('.hero__hud > *', { autoAlpha: 0, y: 20, stagger: 0.06, duration: 0.3 }, 0.65)
          .from('.hero__orbit path', { drawSVG: '0%', duration: 0.6 }, 0.4)
          .to({}, { duration: 0.25 });

        // Intro on load: the window opens from a slit between the lines.
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from('.hero__line > span', { yPercent: 110, duration: 1.2, stagger: 0.1 })
          .from('.hero__pill', { y: 16, autoAlpha: 0, duration: 0.8 }, 0.2)
          .fromTo(win, { clipPath: slitClip }, { clipPath: startClip, duration: 1.3, ease: 'expo.inOut' }, 0.35)
          .from('.hero__bottom > *', { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.6);

        // Idle float
        gsap.to('.hero__zeus-float', { y: -14, rotation: 2, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        return () => section.classList.remove('hero--cinematic');
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="stars" aria-hidden="true" />
      <div className="hero__top container">
        <Constellation
          className="hero__stars hero__stars--l"
          viewBox="0 0 200 110"
          points={[[10, 92], [72, 40, 'star'], [128, 70], [188, 18]]}
          links={[[0, 1], [1, 2], [2, 3]]}
          autoplay
          delay={1.4}
        />
        <Constellation
          className="hero__stars hero__stars--r"
          viewBox="0 0 200 110"
          points={[[14, 22, 'accent'], [82, 62], [146, 34, 'star'], [192, 96]]}
          links={[[0, 1], [1, 2], [2, 3]]}
          autoplay
          delay={1.9}
        />
        <p className="hero__pill">
          <span className="hero__pill-icon" aria-hidden="true">✦</span>
          <span className="hero__pill-long">Capsule Communicators · </span>Hyderabad &amp; Mumbai
        </p>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line hero__line--a">
            <span>We make brands</span>
          </span>
          <span className="hero__line hero__line--b">
            <span>
              <em>matter.</em>
              <RotatingChip />
            </span>
          </span>
        </h1>
      </div>

      <div className="hero__window">
        <img className="hero__earth" src={earth} alt="" width="2400" height="1440" fetchPriority="high" />
        <div className="hero__vignette" aria-hidden="true" />
        <svg className="hero__orbit" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-20 700 C 360 520, 980 520, 1460 260" />
          <path d="M-20 820 C 420 640, 1060 660, 1460 420" />
        </svg>
        <div className="hero__zeus">
          <img
            className="hero__zeus-float"
            src={zeus}
            alt="Zeus, the Social Matters astronaut, floating above Earth"
            width="900"
            height="900"
            fetchPriority="high"
          />
        </div>
        <div className="hero__hud container">
          <p className="label">Mission 001 · The Creative Rocket</p>
          <p className="hero__hud-title">
            Mission control between your brand and the people it’s for.
          </p>
          <p className="label hero__coords">17.44° N · 78.46° E · Begumpet, Hyderabad</p>
        </div>
      </div>

      <div className="hero__bottom container">
        <p className="hero__desc">
          A branding and digital marketing agency. We study your brand, plan the mission and launch campaigns people
          actually notice, then keep improving them.
        </p>
        <div className="hero__ctas">
          <Button to="/contact">Start a Project</Button>
          <Button to="/work" variant="ghost">
            Explore Our Work
          </Button>
        </div>
        <span className="hero__scroll label" aria-hidden="true">
          Scroll to launch
        </span>
      </div>
    </section>
  );
}
