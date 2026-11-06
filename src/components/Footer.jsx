import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, MQ } from '../lib/gsap';
import { scrollTo, useLenis } from '../lib/lenis';
import { NAV, CONTACT, OFFICES, SOCIALS, LINKS, TAGLINE } from '../data/site';
import { SERVICES } from '../data/services';
import Button, { ArrowIcon } from './Button';
import OrbitGraphic from './motion/OrbitGraphic';
import logo from '../assets/brand/logo.png';
import zeusWave from '../assets/zeus/wave.webp';
import earth from '../assets/space/earth-horizon.webp';
import './Footer.css';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const root = useRef(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '.footer__launch', start: 'top 85%', end: 'bottom bottom', scrub: 0.8 },
        });
        tl.fromTo('.footer__orbit-path', { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none' }, 0)
          .from('.footer__earth', { yPercent: 30, scale: 1.1, ease: 'none' }, 0)
          .from('.footer__zeus', { y: 120, rotate: -12, ease: 'none' }, 0);
        gsap.from('.footer__statement .line > span', {
          yPercent: 105,
          stagger: 0.08,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.footer__statement', start: 'top 85%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="footer">
      <section className="footer__launch" aria-labelledby="footer-cta">
        <div className="footer__space" aria-hidden="true">
          <div className="stars" />
          <img className="footer__earth" src={earth} alt="" loading="lazy" width="2400" height="1440" />
          <svg className="footer__orbit" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <path
              className="footer__orbit-path"
              d="M-40 520 C 300 120, 1100 60, 1480 300"
            />
          </svg>
        </div>
        <div className="container footer__launch-inner">
          <OrbitGraphic className="footer__planet" start="top 70%" />
          <p className="eyebrow">Your next chapter starts here</p>
          <h2 id="footer-cta" className="footer__statement">
            <span className="line">
              <span>Let’s make your</span>
            </span>
            <span className="line">
              <span>
                brand <em>matter.</em>
              </span>
            </span>
          </h2>
          <div className="footer__cta-row">
            <Button to="/contact">Start a Project</Button>
            <a className="footer__email" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
              <ArrowIcon direction="up-right" />
            </a>
          </div>
          <div className="footer__zeus">
            <img src={zeusWave} alt="Zeus waving goodbye" loading="lazy" width="294" height="352" />
          </div>
        </div>
      </section>

      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={logo} alt="Social Matters" width="1283" height="481" loading="lazy" />
          <p>{TAGLINE}. Your Capsule Communicators for branding and digital marketing since 2020.</p>
          <a className="footer__partner" href={LINKS.googlePartner} target="_blank" rel="noreferrer">
            <span className="footer__partner-dot" aria-hidden="true" />
            Google Partner
          </a>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3 className="label">Navigate</h3>
          <ul>
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
            <li>
              <a href={LINKS.blog} target="_blank" rel="noreferrer">
                Blog <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__col">
          <h3 className="label">Services</h3>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="label">Talk to us</h3>
          <ul>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href}>{p.label}</a>
              </li>
            ))}
          </ul>
          <h3 className="label footer__sub">Careers</h3>
          <ul>
            <li>
              <a href={`mailto:${CONTACT.careersEmail}`}>{CONTACT.careersEmail}</a>
            </li>
          </ul>
        </div>

        <div className="footer__col footer__offices">
          <h3 className="label">Bases</h3>
          <ul>
            {OFFICES.map((o) => (
              <li key={o.name}>
                <strong>{o.city}</strong>
                {o.address && <span>{o.address}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {YEAR} Social Matters. All rights reserved.</p>
        <ul className="footer__socials">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="footer__top" onClick={() => scrollTo(lenis, 0, { duration: 2 })}>
          Back to top <ArrowIcon direction="up" />
        </button>
      </div>
    </footer>
  );
}
