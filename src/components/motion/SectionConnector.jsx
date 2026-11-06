import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import './motion.css';

const ROUTE = 'M12 0C12 34 30 40 30 66S12 98 12 128';

/**
 * A short route that draws as one section hands over to the next. A marker
 * rides the line with the scroll and settles into a ring at the end.
 */
export default function SectionConnector({ className = '' }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.deco, () => {
        const svg = root.current;
        if (!svg.getBoundingClientRect().width) return; // hidden at this breakpoint
        const q = gsap.utils.selector(svg);
        const path = q('.mo-route__path')[0];
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: svg, start: 'top 88%', end: 'bottom 55%', scrub: 0.6 },
          })
          .fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1 }, 0)
          .fromTo(q('.mo-route__marker'), { autoAlpha: 1 }, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 1 }, 0)
          .to(q('.mo-route__marker'), { autoAlpha: 0, duration: 0.1 }, 0.95)
          .fromTo(q('.mo-route__end'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.12, ease: 'back.out(3)' }, 0.92);
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} className={`mo mo-route ${className}`} viewBox="0 0 42 134" aria-hidden="true" focusable="false">
      <path className="mo-route__guide" d={ROUTE} />
      <path className="mo-route__path" d={ROUTE} />
      <circle className="mo-route__marker" cx="12" cy="0" r="2.6" />
      <circle className="mo-route__end" cx="12" cy="128" r="4.5" />
    </svg>
  );
}
