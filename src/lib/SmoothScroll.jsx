import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { LenisContext } from './lenis';

/**
 * Single Lenis instance for the whole app, driven by GSAP's ticker so
 * ScrollTrigger and Lenis stay on the same frame. Disabled entirely when the
 * visitor prefers reduced motion (native scrolling takes over).
 */
export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let instance = null;
    const tick = (time) => instance?.raf(time * 1000);

    const start = () => {
      if (instance) return;
      instance = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 });
      instance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    };
    const stop = () => {
      if (!instance) return;
      gsap.ticker.remove(tick);
      instance.destroy();
      instance = null;
      setLenis(null);
    };

    if (!reduce.matches) start();
    const onChange = () => (reduce.matches ? stop() : start());
    reduce.addEventListener('change', onChange);
    return () => {
      reduce.removeEventListener('change', onChange);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
