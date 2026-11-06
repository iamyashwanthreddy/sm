import { useEffect, useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { ArrowIcon } from '../../components/Button';
import { Link } from 'react-router-dom';
import kshetraLogo from '../../assets/work/kshetra-logo.webp';
import pravarsha from '../../assets/work/pravarsha-logo.webp';
import ekadhi from '../../assets/work/ekadhi-logo.webp';
import pistaPoster from '../../assets/work/pista-house-poster.webp';
import kshetraCampaign from '../../assets/work/kshetra-campaign.webp';
import tds2 from '../../assets/work/tds-2.webp';
import tds3 from '../../assets/work/tds-3.webp';
import justyou from '../../assets/work/justyou-banner.webp';
import kshetraBottle from '../../assets/work/kshetra-bottle.webp';
import heart from '../../assets/zeus/heart.webp';
import celebrating from '../../assets/zeus/celebrating.webp';
import cheering from '../../assets/zeus/cheering.webp';
import jump from '../../assets/zeus/jump.webp';
import './AboutStatement.css';

const STACKS = {
  matter: { images: [heart, celebrating, cheering, jump], zeus: true },
  story: { images: [kshetraLogo, pravarsha, ekadhi] },
  creative: { images: [pistaPoster, kshetraCampaign, tds3, kshetraBottle] },
  look: { images: [tds2, justyou, pistaPoster] },
};

/**
 * A word that, while hovered (or tapped), keeps popping images on top of each
 * other in a loop. Decorative only: the sentence reads the same without it.
 */
function HoverWord({ id, children, layer }) {
  const word = useRef(null);
  const timer = useRef(null);
  const index = useRef(0);

  const stop = () => {
    clearInterval(timer.current);
    timer.current = null;
    const imgs = layer.current?.querySelectorAll(`[data-stack="${id}"]`);
    if (imgs?.length) {
      gsap.to(imgs, {
        scale: 0.6,
        autoAlpha: 0,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => imgs.forEach((n) => n.remove()),
      });
    }
  };

  const pop = () => {
    const { images, zeus } = STACKS[id];
    const host = layer.current;
    const w = word.current.getBoundingClientRect();
    const h = host.getBoundingClientRect();
    const src = images[index.current % images.length];
    index.current += 1;

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.dataset.stack = id;
    img.className = `stack-img${zeus ? ' stack-img--zeus' : ''}`;
    img.style.left = `${w.left - h.left + w.width / 2}px`;
    img.style.top = `${w.top - h.top + w.height / 2}px`;
    host.appendChild(img);

    const existing = host.querySelectorAll(`[data-stack="${id}"]`);
    if (existing.length > 5) existing[0].remove();

    if (window.matchMedia(MQ.reduce).matches) return;
    gsap.fromTo(
      img,
      { scale: 0.4, rotation: gsap.utils.random(-14, 14), autoAlpha: 0 },
      {
        scale: 1,
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-24, 24),
        rotation: gsap.utils.random(-8, 8),
        autoAlpha: 1,
        duration: 0.55,
        ease: 'back.out(1.6)',
      },
    );
  };

  const start = () => {
    if (timer.current) return;
    pop();
    timer.current = setInterval(pop, 520);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <span
      ref={word}
      className="hover-word"
      onPointerEnter={(e) => e.pointerType === 'mouse' && start()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && stop()}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse') return;
        if (timer.current) stop();
        else start();
      }}
    >
      {children}
    </span>
  );
}

export default function AboutStatement() {
  const root = useRef(null);
  const layer = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from('.statement__row', {
          yPercent: 40,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.statement', start: 'top 80%', once: true },
        });
        gsap.from('.statement__foot > *', {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: '.statement__foot', start: 'top 90%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="statement-section" aria-labelledby="statement-title">
      <div className="container">
        <p className="statement__eyebrow label">Capsule Communicators · Since 2020</p>
        <h2 id="statement-title" className="statement">
          <span className="statement__row">We’re mission control</span>{' '}
          <span className="statement__row">
            for brands that{' '}
            <HoverWord id="matter" layer={layer}>
              matter.
            </HoverWord>
          </span>{' '}
          <span className="statement__row">
            We find the{' '}
            <HoverWord id="story" layer={layer}>
              story,
            </HoverWord>{' '}
            build the
          </span>{' '}
          <span className="statement__row">
            <HoverWord id="creative" layer={layer}>
              creative
            </HoverWord>{' '}
            and launch it
          </span>{' '}
          <span className="statement__row">
            where people{' '}
            <HoverWord id="look" layer={layer}>
              actually look.
            </HoverWord>
          </span>
        </h2>
        <div className="statement__foot">
          <p>
            Founded in Hyderabad by two young founders, Social Matters brings strategy, creative and execution under
            one roof, from the first brainstorm to the campaign that goes live.
          </p>
          <p className="statement__hint label" aria-hidden="true">
            <span className="statement__hint-dot" /> Hover the underlined words
          </p>
          <Link to="/about" className="link-arrow">
            Meet the crew <ArrowIcon />
          </Link>
        </div>
      </div>
      <div ref={layer} className="statement__layer" aria-hidden="true" />
    </section>
  );
}
