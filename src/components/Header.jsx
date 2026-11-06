import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { gsap, useGSAP, ScrollTrigger, MQ } from '../lib/gsap';
import { useLenis } from '../lib/lenis';
import { NAV, CONTACT, SOCIALS } from '../data/site';
import Button from './Button';
import logo from '../assets/brand/logo.png';
import './Header.css';

function useHyderabadTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Header() {
  const header = useRef(null);
  const menu = useRef(null);
  const toggle = useRef(null);
  const lenis = useLenis();
  const { pathname } = useLocation();
  // The menu remembers the route it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const time = useHyderabadTime();

  // Scroll-state: solid after leaving the top, hidden while scrolling down.
  useGSAP(() => {
    const el = header.current;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const y = self.scroll();
        el.classList.toggle('is-scrolled', y > 40);
        el.classList.toggle('is-hidden', self.direction === 1 && y > 320);
      },
    });
    return () => st.kill();
  });

  // Menu open/close: lock scroll, animate, manage focus.
  useGSAP(
    () => {
      const panel = menu.current;
      if (!panel) return;
      if (open) {
        lenis?.stop();
        document.body.style.overflow = 'hidden';
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
          gsap.fromTo(panel, { clipPath: 'circle(0% at calc(100% - 48px) 38px)' }, { clipPath: 'circle(150% at calc(100% - 48px) 38px)', duration: 0.8, ease: 'power3.inOut' });
          gsap.from(panel.querySelectorAll('[data-menu-item]'), { yPercent: 110, duration: 0.8, stagger: 0.05, delay: 0.25, ease: 'power4.out' });
        });
        panel.querySelector('a')?.focus({ preventScroll: true });
        return () => mm.revert();
      }
      lenis?.start();
      document.body.style.overflow = '';
    },
    { dependencies: [open, lenis] },
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
        toggle.current?.focus();
      }
      // Keep keyboard focus inside the open menu
      if (e.key === 'Tab') {
        const focusables = [toggle.current, ...menu.current.querySelectorAll('a, button')];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header ref={header} className={`site-header${open ? ' is-open' : ''}`}>
        <div className="site-header__bar">
          <Link to="/" className="site-header__logo" aria-label="Social Matters — home">
            <img src={logo} alt="Social Matters" width="1283" height="481" />
          </Link>

          <nav className="site-nav" aria-label="Primary">
            <ul>
              {NAV.filter((n) => n.to !== '/contact').map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className="site-nav__link">
                    <span className="site-nav__dot" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <span className="site-header__clock label" aria-label={`Hyderabad time ${time}`}>
              <span className="site-header__pulse" aria-hidden="true" />
              HYD {time} IST
            </span>
            <Button to="/contact" size="small" className="site-header__cta">
              Start a Project
            </Button>
            <button
              ref={toggle}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpenOn(open ? null : pathname)}
            >
              <span className="menu-toggle__label">{open ? 'Close' : 'Menu'}</span>
              <span className="menu-toggle__lines" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div ref={menu} id="site-menu" className="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="stars" aria-hidden="true" />
          <svg className="site-menu__orbit" viewBox="0 0 800 800" aria-hidden="true">
            <circle cx="400" cy="400" r="300" />
            <circle cx="400" cy="400" r="390" />
          </svg>
          <nav className="site-menu__nav" aria-label="Mobile">
            <ol>
              {NAV.map((item, i) => (
                <li key={item.to}>
                  <span className="site-menu__mask">
                    <NavLink to={item.to} end={item.to === '/'} data-menu-item className="site-menu__link">
                      <span className="site-menu__num">0{i + 1}</span>
                      {item.label}
                    </NavLink>
                  </span>
                </li>
              ))}
            </ol>
          </nav>
          <div className="site-menu__footer">
            <span className="site-menu__mask">
              <a data-menu-item href={`mailto:${CONTACT.email}`} className="site-menu__email">
                {CONTACT.email}
              </a>
            </span>
            <ul className="site-menu__socials">
              {SOCIALS.map((s) => (
                <li key={s.label} className="site-menu__mask">
                  <a data-menu-item href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
