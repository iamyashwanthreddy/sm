import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, useGSAP);
gsap.defaults({ ease: 'power3.out', duration: 0.9 });
ScrollTrigger.config({ ignoreMobileResize: true });

/** matchMedia condition sets shared across components */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
  /** Decorative motion: skipped on phones and for reduced motion. */
  deco: '(prefers-reduced-motion: no-preference) and (min-width: 768px)',
};

export { gsap, ScrollTrigger, useGSAP };
