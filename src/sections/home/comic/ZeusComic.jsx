import { useCallback, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../../lib/gsap';
import { scrollTo, useLenis } from '../../../lib/lenis';
import { MISSIONS } from '../../../data/process';
import Scene from './Scene';
import { buildScene, ENTRANCES, exitScene } from './choreography';
import './comic.css';

const STEP = 4; // master-timeline seconds per mission
const SCROLL_PER_MISSION = 0.85; // viewport heights of scrolling per mission
const PINNED = `${MQ.motion} and (min-width: 1024px) and (min-height: 640px)`;
const STACKED = '(prefers-reduced-motion: reduce), (max-width: 1023px), (max-height: 639px)';

export default function ZeusComic() {
  const root = useRef(null);
  const progressBar = useRef(null);
  const master = useRef(null); // { tl, st } while pinned
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const total = MISSIONS.length;

  useGSAP(
    () => {
      const section = root.current;
      const scenes = gsap.utils.toArray('.scene', section);
      const mm = gsap.matchMedia();

      // ---------- Desktop: pinned cinematic stage ----------
      mm.add(PINNED, () => {
        section.classList.add('comic--pinned');
        const vh = () => window.innerHeight;
        const length = () => vh() * SCROLL_PER_MISSION * total;

        gsap.set(scenes.slice(1), { autoAlpha: 0 });

        const pin = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${length()}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: () => `+=${length() + vh() * 0.6}`,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const t = self.progress * tl.duration();
              const idx = Math.min(total - 1, Math.floor(t / STEP));
              setActive((prev) => (prev === idx ? prev : idx));
              if (progressBar.current) progressBar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        scenes.forEach((scene, i) => {
          const at = i * STEP;
          if (i > 0) {
            tl.add(exitScene(scenes[i - 1]), at - 0.55)
              .set(scenes[i - 1], { autoAlpha: 0 }, at)
              .set(scene, { autoAlpha: 1 }, at)
              .add(ENTRANCES[i % ENTRANCES.length](scene), at);
          }
          tl.add(buildScene(scene), at + (i === 0 ? 0 : 0.5));
        });
        tl.to({}, { duration: 1 }); // hold on the final frame

        master.current = { tl, st: tl.scrollTrigger };

        return () => {
          section.classList.remove('comic--pinned');
          master.current = null;
          pin.kill();
        };
      });

      // ---------- Mobile, tablet, reduced motion: vertical story ----------
      mm.add({ stacked: STACKED, motion: MQ.motion }, (ctx) => {
        if (!ctx.conditions.stacked) return;

        // Each frame plays its action once as it scrolls into view.
        if (ctx.conditions.motion) {
          scenes.forEach((scene) => {
            const tl = gsap.timeline({ paused: true });
            tl.add(ENTRANCES[2](scene), 0).add(buildScene(scene), 0.2);
            ScrollTrigger.create({ trigger: scene, start: 'top 72%', once: true, onEnter: () => tl.play() });
          });
        }

        // Keep the mission nav in sync (no animation involved).
        scenes.forEach((scene, i) => {
          ScrollTrigger.create({
            trigger: scene,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          end: 'bottom 60%',
          onUpdate: (self) => {
            if (progressBar.current) progressBar.current.style.transform = `scaleX(${self.progress})`;
          },
        });
      });
    },
    { scope: root },
  );

  const goTo = useCallback(
    (i) => {
      const m = master.current;
      if (m) {
        // Land at the moment the mission is fully built.
        const t = Math.min(i * STEP + 3.2, m.tl.duration());
        const y = m.st.start + (t / m.tl.duration()) * (m.st.end - m.st.start);
        scrollTo(lenis, y, { duration: 1.6 });
      } else {
        const el = root.current.querySelector(`#mission-${MISSIONS[i].id}`);
        scrollTo(lenis, el, { offset: -120 });
      }
    },
    [lenis],
  );

  return (
    <section ref={root} className="comic" id="process-story" aria-labelledby="comic-title">
      <div className="comic__stage">
        <div className="stars" aria-hidden="true" />
        <header className="comic__head container">
          <div>
            <p className="eyebrow">The Social Matters method</p>
            <h2 id="comic-title" className="comic__title">
              From an idea <em>to impact.</em>
            </h2>
          </div>
          <p className="comic__intro">
            Follow Zeus through eight missions, from the first question about your brand to the campaign that keeps
            getting better. Tap the <span className="comic__plus">+</span> markers for field notes.
          </p>
        </header>

        <div className="comic__scenes container">
          {MISSIONS.map((m, i) => (
            <Scene key={m.id} mission={m} index={i} total={total} onReplay={() => goTo(0)} />
          ))}
        </div>

        <nav className="mission-nav" aria-label="Mission stages">
          <div className="mission-nav__inner container">
            <div className="mission-nav__track" aria-hidden="true">
              <span ref={progressBar} className="mission-nav__progress" />
            </div>
            <ol>
              {MISSIONS.map((m, i) => (
                <li key={m.id}>
                  <button
                    type="button"
                    className={`mission-nav__btn${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                    aria-current={i === active ? 'step' : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className="mission-nav__dot" aria-hidden="true" />
                    <span className="mission-nav__num">{m.num}</span>
                    <span className="mission-nav__name">{m.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </div>
    </section>
  );
}
