import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../lib/gsap';
import Spark from './Spark';
import './motion.css';

const CX = 100;
const CY = 70;
const RX = 78;
const RY = 22;
// Ellipse as a path starting at its left edge, travelling over the top.
const ORBIT = `M${CX - RX} ${CY}a${RX} ${RY} 0 1 1 ${RX * 2} 0a${RX} ${RY} 0 1 1 ${-RX * 2} 0`;

/**
 * A small planet whose orbit is traced once by a marker. When the loop
 * closes, a single star becomes the focal point.
 */
export default function OrbitGraphic({ className = '', start = 'top 80%' }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.deco, () => {
        const svg = root.current;
        if (!svg.getBoundingClientRect().width) return; // hidden at this breakpoint
        const q = gsap.utils.selector(svg);
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(q('.mo-orbit__planet'), { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.9 })
          .fromTo(q('.mo-orbit__marker'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.3)
          .fromTo(q('.mo-orbit__path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.2, ease: 'power1.inOut' }, 0.3)
          .to(
            q('.mo-orbit__marker'),
            {
              motionPath: { path: q('.mo-orbit__path')[0], align: q('.mo-orbit__path')[0], alignOrigin: [0.5, 0.5] },
              duration: 2.2,
              ease: 'power1.inOut',
            },
            0.3,
          )
          .to(q('.mo-orbit__marker'), { autoAlpha: 0, duration: 0.3 }, 2.4)
          .fromTo(
            q('.mo-orbit__focal'),
            { autoAlpha: 0, scale: 0, rotation: -90, transformOrigin: '50% 50%' },
            { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2)' },
            2.35,
          )
          .fromTo(
            q('.mo-orbit__ping'),
            { autoAlpha: 0.8, scale: 0.4, transformOrigin: '50% 50%' },
            { autoAlpha: 0, scale: 2.4, duration: 1.1, ease: 'power2.out' },
            2.45,
          );
        ScrollTrigger.create({ trigger: svg, start, once: true, onEnter: () => tl.play() });
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} className={`mo mo-orbit ${className}`} viewBox="0 0 200 140" aria-hidden="true" focusable="false">
      <g transform={`rotate(-16 ${CX} ${CY})`}>
        <path className="mo-orbit__track" d={ORBIT} />
        <path className="mo-orbit__path" d={ORBIT} />
        <circle className="mo-orbit__planet" cx={CX} cy={CY} r="15" />
        <circle className="mo-orbit__marker" cx={CX - RX} cy={CY} r="2.6" />
      </g>
      <circle className="mo-orbit__ping" cx="176" cy="28" r="6" />
      <g className="mo-orbit__focal">
        <Spark x={176} y={28} r={7} className="is-accent" />
      </g>
    </svg>
  );
}
