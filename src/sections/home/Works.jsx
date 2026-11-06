import { useRef } from 'react';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { WORK } from '../../data/work';
import ProjectShowcase from '../../components/portfolio/ProjectShowcase';
import Constellation from '../../components/motion/Constellation';
import Button from '../../components/Button';
import './Works.css';

export default function Works() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from('.works__word span', {
          yPercent: 100,
          stagger: 0.06,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.works__sticky', start: 'top 70%', once: true },
        });
        // The sticky word recedes as the work rises over it.
        gsap.to('.works__word', {
          opacity: 0.07,
          scale: 0.94,
          ease: 'none',
          scrollTrigger: { trigger: '.works__intro', start: 'top 85%', end: 'top 30%', scrub: true },
        });
        gsap.from('.works__intro > *', {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          scrollTrigger: { trigger: '.works__intro', start: 'top 80%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="works" aria-labelledby="works-title">
      <div className="works__sticky" aria-hidden="true">
        <span className="works__word">
          {'WORKS'.split('').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </span>
      </div>

      <div className="container works__inner">
        <header className="works__intro">
          <p className="eyebrow">Selected transmissions</p>
          <div className="works__heading">
            <h2 id="works-title">
              Ideas made <em>visible.</em>
            </h2>
            <Constellation
              className="works__constellation"
              viewBox="0 0 220 110"
              points={[
                [8, 92],
                [62, 58, 'star'],
                [118, 74],
                [166, 26],
                [210, 40, 'accent'],
              ]}
              links={[
                [0, 1],
                [1, 2],
                [2, 3],
                [3, 4],
              ]}
              start="top 75%"
              delay={0.4}
            />
          </div>
          <p className="lead">
            A selection of brands, campaigns and digital experiences we’ve helped bring to life, from 250+ brands since
            2020.
          </p>
        </header>

        <ProjectShowcase projects={WORK} />

        <div className="works__close">
          <p>Every brand is a different mission. Each case shows the work up close.</p>
          <Button to="/work">View all work</Button>
        </div>
      </div>
    </section>
  );
}
