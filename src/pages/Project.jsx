import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap, useGSAP, MQ } from '../lib/gsap';
import { usePageMeta, useReveal } from '../lib/hooks';
import { WORK, getProject } from '../data/work';
import Button, { ArrowIcon } from '../components/Button';
import ProjectTile from '../components/portfolio/ProjectTile';
import '../components/portfolio/portfolio.css';
import NotFound from './NotFound';
import './Project.css';

function ProjectView({ project }) {
  const root = useRef(null);
  usePageMeta(`${project.client} — ${project.title}`, project.summary);
  useReveal(root);

  const index = WORK.findIndex((p) => p.slug === project.slug);
  const next = WORK[(index + 1) % WORK.length];
  // Two related projects: shared services first, then whatever follows in the list.
  const others = WORK.filter((p) => p.slug !== project.slug);
  const shares = (p) => p.services.some((s) => project.services.includes(s));
  const related = [...others.filter(shares), ...others.filter((p) => !shares(p))].slice(0, 2);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from('.case-hero__line > span', { yPercent: 110, stagger: 0.08, duration: 1.1, ease: 'power4.out', delay: 0.1 });
        gsap.from('.case-cover', { clipPath: 'inset(18% 10% 0% 10% round 28px)', duration: 1.4, ease: 'expo.out', delay: 0.2 });
        gsap.to('.case-cover img', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: '.case-cover', start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root, dependencies: [project.slug], revertOnUpdate: true },
  );

  return (
    <article ref={root} className="case" aria-labelledby="case-title">
      <header className="container case-hero">
        <Link to="/work" className="case-back label">
          <ArrowIcon direction="left" size={12} /> All work
        </Link>
        <p className="case-client">{project.client}</p>
        <h1 id="case-title" className="case-hero__title">
          <span className="case-hero__line">
            <span>{project.title}</span>
          </span>
        </h1>
        <ul className="case-tags">
          {project.services.map((s) => (
            <li key={s} className="tag tag--yellow">
              {s}
            </li>
          ))}
          <li className="tag">{project.location}</li>
        </ul>
      </header>

      <div className={`case-cover case-cover--${project.format}`} style={{ background: project.tone }}>
        <img src={project.cover} alt="" style={{ objectPosition: project.coverPosition }} fetchPriority="high" />
      </div>

      <section className="container section case-body">
        <div className="case-facts" data-reveal="stagger">
          <div>
            <h2 className="label">Client</h2>
            <p>{project.client}</p>
          </div>
          <div>
            <h2 className="label">Scope</h2>
            <p>{project.services.join(', ')}</p>
          </div>
          <div>
            <h2 className="label">Market</h2>
            <p>{project.location}</p>
          </div>
        </div>
        <div className="case-summary" data-reveal>
          <p className="eyebrow">The mission</p>
          <p className="case-summary__text">{project.summary}</p>
        </div>
      </section>

      <section className="container case-gallery" aria-label="Project gallery">
        {project.gallery.map((g, i) => (
          <figure key={i} className="case-gallery__item" data-reveal style={{ background: project.tone }}>
            <img src={g.src} alt={g.alt} loading="lazy" />
          </figure>
        ))}
      </section>

      <section className="container section case-related" aria-labelledby="related-title">
        <h2 id="related-title" className="case-related__title" data-reveal>
          Related missions
        </h2>
        <div className="case-related__grid">
          {related.map((p) => (
            <ProjectTile key={p.slug} project={p} index={WORK.indexOf(p)} variant="related" />
          ))}
        </div>
      </section>

      <nav className="container section case-next" aria-label="Next project">
        <p className="label">Next mission</p>
        <Link to={`/work/${next.slug}`} className="case-next__link">
          <span>{next.client}</span>
          <span className="case-next__arrow">
            <ArrowIcon size={28} />
          </span>
        </Link>
        <Button to="/contact" variant="ghost">
          Start a project like this
        </Button>
      </nav>
    </article>
  );
}

export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;
  return <ProjectView key={project.slug} project={project} />;
}
