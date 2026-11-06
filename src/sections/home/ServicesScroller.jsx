import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { SERVICES } from '../../data/services';
import Button, { ArrowIcon } from '../../components/Button';
import './ServicesScroller.css';

const TILTS = [-4, 3, -2, 4, -3, 2, -4, 3];

export default function ServicesScroller() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and (min-width: 768px)`, () => {
        const section = root.current;
        section.classList.add('svc--pinned');
        const distance = () => track.current.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.6}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl.to('.svc__heading', { scale: 0.9, autoAlpha: 0.08, duration: 0.25 }, 0.05)
          .fromTo(track.current, { x: () => window.innerWidth }, { x: () => -distance(), duration: 1 }, 0)
          .fromTo('.svc-card', { rotation: 0 }, { rotation: (i) => TILTS[i % TILTS.length], duration: 0.4, stagger: 0.04 }, 0.05);

        return () => section.classList.remove('svc--pinned');
      });

      mm.add(MQ.motion, () => {
        gsap.from('.svc__heading > *', {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="svc" aria-labelledby="svc-title">
      <div className="svc__heading container">
        <p className="eyebrow">What we do</p>
        <h2 id="svc-title">
          Skyrocket your <br />
          brand <span className="text-yellow">presence.</span>
        </h2>
        <p className="lead">
          Eight crafts, one crew. Pick a single service or bring us the whole mission.
        </p>
      </div>

      <div ref={track} className="svc__track" data-lenis-prevent-touch>
        {SERVICES.map((s, i) => (
          <article key={s.id} className={`svc-card svc-card--${i % 3}`}>
            <Link to={`/services#${s.id}`} className="svc-card__link" aria-label={`${s.title}: ${s.short}`}>
              <div className="svc-card__media">
                <span className="svc-card__num">{String(i + 1).padStart(2, '0')}</span>
                <img src={s.zeus} alt="" loading="lazy" />
              </div>
              <div className="svc-card__body">
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <ul>
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="tag">
                      {d}
                    </li>
                  ))}
                </ul>
                <span className="svc-card__more" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          </article>
        ))}

        <div className="svc__outro">
          <h3>
            Marketing isn’t just about <em>epic strategy.</em>
          </h3>
          <p>It’s about nailing every detail with a fresh perspective.</p>
          <Button to="/services">All services</Button>
        </div>
      </div>
    </section>
  );
}
