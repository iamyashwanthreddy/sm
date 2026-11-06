import { useEffect, useMemo, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { usePageMeta } from '../lib/hooks';
import { WORK } from '../data/work';
import PageHero from '../components/PageHero';
import ProjectShowcase from '../components/portfolio/ProjectShowcase';
import presenting from '../assets/zeus/presenting.webp';
import './Work.css';

const FILTERS = [
  { id: 'all', label: 'All missions', match: () => true },
  { id: 'identity', label: 'Branding & identity', match: (p) => p.services.some((s) => /brand|packag/i.test(s)) },
  { id: 'campaign', label: 'Campaigns & social', match: (p) => p.services.some((s) => /campaign|social|art direction/i.test(s)) },
  { id: 'web', label: 'Websites', match: (p) => p.services.some((s) => /website/i.test(s)) },
];

export default function Work() {
  usePageMeta('Work', 'Selected branding, campaign and website projects by Social Matters for brands across India.');
  const [filter, setFilter] = useState('all');
  const projects = useMemo(() => WORK.filter(FILTERS.find((f) => f.id === filter).match), [filter]);

  // The page height changes with the filter, so positions further down need re-measuring.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filter]);

  return (
    <div>
      <PageHero
        code="SM / 03"
        eyebrow="Work"
        title={['Ideas made', <><em>visible.</em></>]}
        lead="Identities, campaigns and websites for brands that wanted to be noticed. A selection from our recent work."
        zeus={presenting}
        zeusAlt="Zeus presenting a rising chart"
      />

      <section className="section container" aria-labelledby="work-list-title">
        <h2 id="work-list-title" className="sr-only">
          Projects
        </h2>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="work-filter"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="work-filter__count">{WORK.filter(f.match).length}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {projects.length} projects
        </p>
        <ProjectShowcase key={filter} projects={projects} />
      </section>
    </div>
  );
}
