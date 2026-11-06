import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../lib/gsap';
import Spark from './Spark';
import './motion.css';

/**
 * A few points that appear one by one, joined by thin lines that draw in.
 * When a line reaches its point, that point brightens once. Plays once.
 *
 * points: [x, y, kind?]  kind: 'dot' (default) | 'star' | 'accent'
 * links:  [fromIndex, toIndex] in drawing order
 */
export default function Constellation({
  points,
  links = [],
  viewBox,
  className = '',
  start = 'top 85%',
  delay = 0,
  autoplay = false,
}) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.deco, () => {
        const svg = root.current;
        if (!svg.getBoundingClientRect().width) return; // hidden at this breakpoint
        const nodes = gsap.utils.toArray('.mo-node', svg);
        const lines = gsap.utils.toArray('.mo-link', svg);
        const tl = gsap.timeline({ paused: true, delay, defaults: { ease: 'power2.out' } });

        tl.fromTo(
          nodes,
          { autoAlpha: 0, scale: 0, rotation: -45, transformOrigin: '50% 50%' },
          { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.7, stagger: 0.14 },
          0,
        );
        links.forEach(([, to], i) => {
          const at = 0.5 + i * 0.5;
          tl.fromTo(lines[i], { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut' }, at).to(
            nodes[to],
            { scale: 1.6, duration: 0.22, yoyo: true, repeat: 1, ease: 'sine.inOut' },
            at + 0.72,
          );
        });

        if (autoplay) tl.play();
        else ScrollTrigger.create({ trigger: svg, start, once: true, onEnter: () => tl.play() });
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} className={`mo mo-constellation ${className}`} viewBox={viewBox} aria-hidden="true" focusable="false">
      {links.map(([a, b], i) => (
        <line
          key={i}
          className="mo-link"
          x1={points[a][0]}
          y1={points[a][1]}
          x2={points[b][0]}
          y2={points[b][1]}
        />
      ))}
      {points.map(([x, y, kind = 'dot'], i) => (
        <g key={i} className={`mo-node mo-node--${kind}`}>
          {kind === 'dot' ? <circle cx={x} cy={y} r="1.6" /> : <Spark x={x} y={y} r={kind === 'accent' ? 5 : 3.4} />}
        </g>
      ))}
    </svg>
  );
}
