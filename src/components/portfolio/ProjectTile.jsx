import { Link } from 'react-router-dom';
import { ArrowIcon } from '../Button';
import Spark from '../motion/Spark';

/** One project in the portfolio. `variant` decides the composition; the markup stays the same. */
export default function ProjectTile({ project: p, index, variant, flip = false }) {
  const num = String(index + 1).padStart(2, '0');
  const classes = ['pt', `pt--${variant}`, `pt--${p.format}`, flip && 'pt--flip'].filter(Boolean).join(' ');

  return (
    <article className={classes} data-variant={variant}>
      <span className="pt__marker" aria-hidden="true">
        <svg viewBox="-8 -8 16 16" focusable="false">
          <Spark x={0} y={0} r={6} />
        </svg>
      </span>

      <div className="pt__label" aria-hidden="true">
        <span>TX–{num}</span>
        <svg className="pt__label-line" focusable="false">
          <line x1="0" y1="1" x2="100%" y2="1" />
        </svg>
        <span>{p.services[0]}</span>
      </div>

      <Link to={`/work/${p.slug}`} className="pt__link">
        <div className="pt__figure">
          <div className="pt__media" style={{ background: p.tone }}>
            <div className="pt__zoom">
              <img src={p.cover} alt="" loading="lazy" decoding="async" style={{ objectPosition: p.coverPosition }} />
            </div>
          </div>
          <span className="pt__corners" aria-hidden="true" />
          {/* Pixel units (no viewBox) so the normalised dash traces the whole edge at any size */}
          <svg className="pt__frame" aria-hidden="true" focusable="false">
            <rect pathLength="1" x="0.5" y="0.5" width="100%" height="100%" />
          </svg>
        </div>

        <div className="pt__meta">
          <p className="pt__client">
            <span className="pt__num">{num}</span>
            {p.client}
          </p>
          <h3 className="pt__title">{p.title}</h3>
          <p className="pt__summary">{p.summary}</p>
          <div className="pt__foot">
            <p className="pt__tags">
              {[...p.services, p.location].join(' · ')}
            </p>
            <span className="pt__cta">
              View case
              <span className="pt__arrow">
                <ArrowIcon />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
