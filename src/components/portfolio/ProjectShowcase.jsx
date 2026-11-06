import { useMemo, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../lib/gsap';
import ProjectTile from './ProjectTile';
import { buildRows, variantFor } from './layout';
import './portfolio.css';

// Each composition opens from a different side so the sequence never settles into one rhythm.
const OPEN_FROM = {
  feature: 'inset(0% 0% 100% 0%)',
  'pair-main': 'inset(0% 0% 100% 0%)',
  'pair-side': 'inset(0% 0% 0% 100%)',
  editorial: 'inset(0% 0% 0% 100%)',
  strip: 'inset(0% 50% 0% 50%)',
};

/**
 * The portfolio sequence: editorial rows of projects joined by a thin route
 * on the left that draws with the scroll and lights each project's marker.
 */
export default function ProjectShowcase({ projects, route = true }) {
  const root = useRef(null);
  const rows = useMemo(() => buildRows(projects), [projects]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // One-time entrances. Content is visible by default if this never runs.
      mm.add(MQ.motion, () => {
        gsap.utils.toArray('.pt', root.current).forEach((tile) => {
          const q = gsap.utils.selector(tile);
          const flip = tile.classList.contains('pt--flip');
          const from = flip ? 'inset(0% 100% 0% 0%)' : OPEN_FROM[tile.dataset.variant];
          gsap
            .timeline({ scrollTrigger: { trigger: tile, start: 'top 84%', once: true } })
            .fromTo(q('.pt__label > span'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 }, 0)
            .fromTo(q('.pt__label-line line'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut' }, 0.05)
            .fromTo(q('.pt__media'), { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'expo.inOut' }, 0.1)
            .fromTo(q('.pt__media img'), { scale: 1.14 }, { scale: 1, duration: 1.7, ease: 'expo.out' }, 0.2)
            .fromTo(q('.pt__meta > *'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, 0.6);
        });
      });

      // Desktop: the route draws with the scroll; markers light as it reaches them.
      if (route) {
        mm.add(`${MQ.motion} and (min-width: 1100px)`, () => {
          const routeEl = root.current.querySelector('.pf-route');
          gsap
            .timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { trigger: root.current, start: 'top 68%', end: 'bottom 68%', scrub: 0.5, invalidateOnRefresh: true },
            })
            .fromTo('.pf-route__line', { drawSVG: '0%' }, { drawSVG: '100%' }, 0)
            .fromTo('.pf-route__head', { y: 0 }, { y: () => routeEl.offsetHeight }, 0);

          gsap.utils.toArray('.pt__marker', root.current).forEach((m) => {
            ScrollTrigger.create({
              trigger: m,
              start: 'top 68%',
              onEnter: () => {
                m.classList.add('is-lit');
                gsap.fromTo(m, { scale: 0.5 }, { scale: 1, duration: 0.6, ease: 'back.out(3)' });
              },
              onLeaveBack: () => m.classList.remove('is-lit'),
            });
          });
        });
      }
    },
    { scope: root, dependencies: [rows], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={`pf${route ? ' pf--route' : ''}`}>
      {route && (
        <div className="pf-route" aria-hidden="true">
          <svg focusable="false">
            <line className="pf-route__guide" x1="1" y1="0" x2="1" y2="100%" />
            <line className="pf-route__line" x1="1" y1="0" x2="1" y2="100%" />
          </svg>
          <span className="pf-route__head" />
        </div>
      )}
      {rows.map((row) => (
        <div key={row.items[0].project.slug} className={`pf-row pf-row--${row.type}`}>
          {row.items.map(({ project, index }, k) => (
            <ProjectTile key={project.slug} project={project} index={index} variant={variantFor(row, k)} flip={row.flip} />
          ))}
        </div>
      ))}
    </div>
  );
}
