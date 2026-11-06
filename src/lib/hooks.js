import { useEffect } from 'react';
import { gsap, useGSAP, MQ } from './gsap';

const SITE = 'Social Matters';

/** Sets the document title and meta description for a page. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Branding & Digital Marketing Agency, Hyderabad`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}

/**
 * Scroll reveals for anything marked [data-reveal] inside scope.
 * data-reveal="stagger" animates the element's direct children in sequence.
 * Nothing is hidden when motion is reduced.
 */
export function useReveal(scope) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray('[data-reveal]', scope.current).forEach((el) => {
          const stagger = el.dataset.reveal === 'stagger';
          gsap.from(stagger ? el.children : el, {
            y: stagger ? 28 : 40,
            autoAlpha: 0,
            duration: 1,
            stagger: stagger ? 0.08 : 0,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });
      });
    },
    { scope },
  );
}
