import { gsap } from '../../../lib/gsap';

const all = (el, sel) => gsap.utils.toArray(sel, el);

/* Scene-specific prop animation. Positions are in scene-timeline seconds (0–2.6). */
const PROPS = {
  'brand-study'(tl, el) {
    tl.fromTo(all(el, '.art-lamp'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0)
      .fromTo(all(el, '.art-note'), { scale: 0, rotation: (i, n) => +n.dataset.tilt - 30 }, { scale: 1, rotation: (i, n) => +n.dataset.tilt, stagger: 0.08, duration: 0.4, ease: 'back.out(2)' }, 0.2)
      .fromTo(all(el, '.art-q'), { autoAlpha: 0, y: 20, scale: 0.4 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.4, ease: 'back.out(3)' }, 1.5)
      // A thin thought-orbit traces above Zeus as he starts thinking.
      .fromTo(all(el, '.zt-halo'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'power2.inOut' }, 1.55);
  },
  'market-research'(tl, el) {
    tl.fromTo(all(el, '.art-grid line'), { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.02, duration: 0.3 }, 0)
      .fromTo(all(el, '.art-trend'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.2, ease: 'power1.inOut' }, 0.4)
      .fromTo(all(el, '.art-trend-head'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 1.5)
      // After the inspection, the findings connect into a small constellation.
      .fromTo(all(el, '.art-links line'), { drawSVG: '0%' }, { drawSVG: '100%', stagger: 0.15, duration: 0.45, ease: 'power2.inOut' }, 2.05);
  },
  strategy(tl, el) {
    tl.fromTo(all(el, '.art-ring'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, stagger: 0.12, duration: 0.5, ease: 'back.out(1.7)' }, 0.1)
      .fromTo(all(el, '.art-cross'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.5)
      .fromTo(all(el, '.art-arrow path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.in' }, 1.5)
      .fromTo(all(el, '.art-bull'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.8, duration: 0.15, yoyo: true, repeat: 1 }, 2.1);
  },
  planning(tl, el) {
    tl.fromTo(all(el, '.art-sticky'), { scale: 0, rotation: () => gsap.utils.random(-40, 40) }, { scale: 1, rotation: (i, n) => +n.dataset.tilt, stagger: 0.07, duration: 0.4, ease: 'back.out(2)' }, 0.1)
      .fromTo(all(el, '.art-clock-m'), { rotation: 0, transformOrigin: '0% 50%' }, { rotation: 720, duration: 2.4, ease: 'none' }, 0)
      .fromTo(all(el, '.art-clock-h'), { rotation: 0, transformOrigin: '50% 100%' }, { rotation: 60, duration: 2.4, ease: 'none' }, 0)
      // Sticky notes fly in from all over and settle into the calendar.
      .fromTo(
        all(el, '.cal__note'),
        { x: () => gsap.utils.random(-140, 140), y: () => gsap.utils.random(-120, 60), rotation: () => gsap.utils.random(-30, 30), autoAlpha: 0 },
        { x: 0, y: 0, rotation: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
        0.6,
      )
      .fromTo(all(el, '.cal__note--key'), { boxShadow: '0 0 0 0 rgba(248,197,50,0)' }, { boxShadow: '0 0 0 4px rgba(248,197,50,0.9)', duration: 0.3 }, 2.1);
  },
  'building-campaigns'(tl, el) {
    tl.fromTo(all(el, '.art-shape'), { x: () => gsap.utils.random(-120, 120), y: () => gsap.utils.random(-80, 80), rotation: () => gsap.utils.random(-90, 90), autoAlpha: 0 }, { x: 0, y: 0, rotation: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8 }, 0.1)
      .fromTo(all(el, '.kit__part'), { y: 40, autoAlpha: 0, scale: 0.8 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, duration: 0.5, ease: 'back.out(1.6)' }, 0.5)
      .fromTo(all(el, '.art-rays'), { scale: 0, autoAlpha: 0, rotation: -30 }, { scale: 1, autoAlpha: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.4)' }, 1.6);
  },
  marketing(tl, el) {
    tl.fromTo(all(el, '.art-platform'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.08, duration: 0.4, ease: 'back.out(2.4)' }, 0.2)
      .fromTo(all(el, '.art-smoke span'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.9, stagger: 0.05, duration: 0.5 }, 1.3)
      .fromTo(all(el, '.art-speed span'), { scaleX: 0, transformOrigin: '100% 50%' }, { scaleX: 1, stagger: 0.05, duration: 0.4 }, 1.6)
      // The trajectory draws first, then Zeus rides the rocket along it.
      .fromTo(all(el, '.zt-trajectory'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.45, ease: 'power2.out' }, 1.3)
      .fromTo(all(el, '.scene__pose--b'), { xPercent: 0, yPercent: 0, rotation: 0 }, { xPercent: 28, yPercent: -15, rotation: -6, duration: 0.9, ease: 'power2.in' }, 1.7)
      .to(all(el, '.art-platform'), { y: (i) => (i % 2 ? 10 : -10), duration: 0.6, ease: 'sine.inOut' }, 1.8);
  },
  evaluation(tl, el) {
    tl.fromTo(all(el, '.art-line'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, ease: 'power1.inOut' }, 0.2)
      .fromTo(all(el, '.art-area'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1)
      .fromTo(all(el, '.dash__line path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'power1.inOut' }, 0.6)
      .fromTo(all(el, '.dash__bars span'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, stagger: 0.08, duration: 0.5 }, 0.8);
  },
  optimize(tl, el) {
    tl.fromTo(all(el, '.art-earth'), { yPercent: 25, scale: 1.1 }, { yPercent: 0, scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
      .fromTo(all(el, '.art-loop ellipse'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.6, ease: 'power1.inOut' }, 0.4)
      .fromTo(all(el, '.art-spark'), { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, stagger: 0.12, duration: 0.4, ease: 'back.out(3)' }, 1.6)
      .fromTo(all(el, '.art-next'), { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 0.5 }, 1.9);
  },
};

/**
 * The inner choreography of one mission: Zeus appears in pose A, the bubble
 * pops, props animate, Zeus switches to pose B, the list fills in, hotspots appear.
 */
export function buildScene(el) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.5 } });
  const poseA = el.querySelector('.scene__pose--a');
  const poseB = el.querySelector('.scene__pose--b');

  tl.fromTo(poseA, { autoAlpha: 0, y: 40, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0)
    .fromTo(poseB, { autoAlpha: 0 }, { autoAlpha: 0, duration: 0.01 }, 0)
    .fromTo(
      el.querySelector('.bubble'),
      { autoAlpha: 0, scale: 0.3, rotation: -8, transformOrigin: '0% 100%' },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.2)' },
      0.45,
    );

  PROPS[el.dataset.scene]?.(tl, el);

  tl.to(poseA, { autoAlpha: 0, scale: 0.94, y: 8, duration: 0.3, ease: 'power2.in' }, 1.25)
    .fromTo(poseB, { autoAlpha: 0, scale: 0.9, y: 18 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)' }, 1.4)
    .fromTo(all(el, '[data-item]'), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.35 }, 1.1)
    .fromTo(all(el, '.check path'), { drawSVG: '0%' }, { drawSVG: '100%', stagger: 0.1, duration: 0.3 }, 1.3)
    .fromTo(all(el, '.status__bar i.is-on'), { scaleY: 0.2, autoAlpha: 0.3 }, { scaleY: 1, autoAlpha: 1, stagger: 0.04, duration: 0.2 }, 1.8)
    .fromTo(all(el, '.hotspot'), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, stagger: 0.1, duration: 0.35, ease: 'back.out(2)' }, 2.1);

  return tl;
}

const panels = (el) => all(el, '.panel');
const tilt = (i, p) => +p.dataset.rot || 0; // each panel's resting tilt

/* Each mission enters differently, so the comic never settles into one rhythm. */
export const ENTRANCES = [
  // pop
  (el) => gsap.fromTo(panels(el), { autoAlpha: 0, scale: 0.86, rotation: (i, p) => tilt(i, p) - 3 }, { autoAlpha: 1, scale: 1, rotation: tilt, stagger: 0.12, duration: 0.6, ease: 'back.out(1.6)' }),
  // wipe from the right
  (el) => gsap.fromTo(panels(el), { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.12, duration: 0.6, ease: 'power3.inOut' }),
  // rise
  (el) => gsap.fromTo(panels(el), { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 }),
  // flip down
  (el) => gsap.fromTo(panels(el), { rotationX: -75, transformOrigin: '50% 0%', autoAlpha: 0 }, { rotationX: 0, autoAlpha: 1, stagger: 0.12, duration: 0.7 }),
  // wipe from the top
  (el) => gsap.fromTo(panels(el), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.12, duration: 0.6, ease: 'power3.inOut' }),
  // slam in from the left
  (el) => gsap.fromTo(panels(el), { xPercent: -35, rotation: (i, p) => tilt(i, p) - 6, autoAlpha: 0 }, { xPercent: 0, rotation: tilt, autoAlpha: 1, stagger: 0.08, duration: 0.55, ease: 'power4.out' }),
  // iris
  (el) => gsap.fromTo(panels(el), { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', stagger: 0.12, duration: 0.7, ease: 'power2.inOut' }),
  // zoom out of the page
  (el) => gsap.fromTo(panels(el), { scale: 1.15, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.1, duration: 0.7 }),
];

export const exitScene = (el) =>
  gsap.to(panels(el), { autoAlpha: 0, yPercent: -10, scale: 0.97, stagger: 0.05, duration: 0.45, ease: 'power2.in' });
