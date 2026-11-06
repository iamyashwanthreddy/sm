import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger, MQ } from '../lib/gsap';
import { scrollTo, useLenis } from '../lib/lenis';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Puts the window back at the top before the new page mounts its animations.
 * Rendered as the sibling before <Outlet />, so this layout effect runs before
 * the page's useGSAP effects: ScrollTriggers are then created from the top
 * instead of from the previous page's scroll depth.
 */
function ScrollReset() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useLayoutEffect(() => {
    scrollTo(lenis, 0, { immediate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

/** Page entrance, #hash targets and a ScrollTrigger refresh after each navigation. */
function useRouteScroll(main) {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(main.current, { autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out', clearProps: 'all' });
    });
    let raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash) {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) raf = requestAnimationFrame(() => scrollTo(lenis, el, { offset: -96 }));
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
    };
    // lenis intentionally omitted: only navigation should trigger a reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  // Late layout changes (web fonts, images) need a refresh so pinned sections stay accurate.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);
}

export default function SiteLayout() {
  const main = useRef(null);
  useRouteScroll(main);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" ref={main} tabIndex={-1}>
        <ScrollReset />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
