import { createContext, useContext } from 'react';

export const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

/** Scroll to a y position or element, with or without Lenis. */
export function scrollTo(lenis, target, { immediate = false, offset = 0, duration = 1.4 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, duration, force: true });
    return;
  }
  const y =
    typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  const smooth = !immediate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
}
