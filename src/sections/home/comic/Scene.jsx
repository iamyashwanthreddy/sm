import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hotspot from '../../../components/Hotspot';
import { ArrowIcon } from '../../../components/Button';
import earth from '../../../assets/space/earth-horizon.webp';

/* Where Zeus, the speech bubble and the hotspots sit inside the main panel. */
const LAYOUT = {
  'brand-study': { zeus: ['8%', '2%', '64%'], bubble: ['40%', '10%'], spots: [['80%', '26%'], ['68%', '68%', 'left']] },
  'market-research': { zeus: ['6%', '2%', '62%'], bubble: ['42%', '10%'], spots: [['56%', '62%'], ['86%', '34%', 'left'], ['78%', '80%', 'left']] },
  strategy: { zeus: ['6%', '2%', '64%'], bubble: ['38%', '9%'], spots: [] },
  planning: { zeus: ['8%', '2%', '64%'], bubble: ['40%', '9%'], spots: [['78%', '40%', 'left'], ['62%', '72%']] },
  'building-campaigns': { zeus: ['6%', '2%', '62%'], bubble: ['44%', '9%'], spots: [['72%', '36%'], ['86%', '62%', 'left'], ['62%', '78%']] },
  marketing: { zeus: ['6%', '6%', '60%'], bubble: ['40%', '9%'], spots: [['70%', '58%', 'left'], ['92%', '34%', 'left']] },
  evaluation: { zeus: ['4%', '2%', '64%'], bubble: ['36%', '9%'], spots: [] },
  optimize: { zeus: ['8%', '8%', '60%'], bubble: ['40%', '10%'], spots: [['74%', '44%', 'left']] },
};

const NOTE_TILT = [-6, 4, -3, 5, -5];
const STICKY_TILT = [-4, 3, -2, 2, -5, 4];

const Check = () => (
  <svg className="check" viewBox="0 0 20 20" aria-hidden="true">
    <rect x="1" y="1" width="18" height="18" rx="4" />
    <path d="M5.5 10.5 8.5 13.5 14.5 6.5" />
  </svg>
);

/* ---------- Background art per mission (decorative) ---------- */
function Art({ id }) {
  switch (id) {
    case 'brand-study':
      return (
        <>
          <div className="art-lamp" />
          <div className="art-wall">
            {['?', '', '?', '★', ''].map((t, i) => (
              <span key={i} className={`art-note art-note--${i}`} data-tilt={NOTE_TILT[i]} style={{ '--tilt': NOTE_TILT[i] }}>
                {t}
              </span>
            ))}
          </div>
          <div className="art-desk" />
          <span className="art-q art-q--1">?</span>
          <span className="art-q art-q--2">?</span>
          <span className="art-q art-q--3">?</span>
        </>
      );
    case 'market-research':
      return (
        <>
          <svg className="art-map" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <g className="art-grid">
              {Array.from({ length: 9 }, (_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" />
              ))}
              {Array.from({ length: 7 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
              ))}
            </g>
            <path className="art-trend" d="M150 250 L200 220 L240 232 L285 170 L320 182 L380 90" />
            <path className="art-trend-head" d="M366 86 380 90 376 104" />
          </svg>
          {/* Findings join into a constellation once Zeus has inspected them (matches LAYOUT spots) */}
          <svg className="art-links" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <line x1="56" y1="62" x2="86" y2="34" />
            <line x1="86" y1="34" x2="78" y2="80" />
            <line x1="78" y1="80" x2="56" y2="62" />
          </svg>
        </>
      );
    case 'strategy':
      return (
        <>
          <svg className="art-target" viewBox="0 0 200 200">
            <circle className="art-ring" cx="100" cy="100" r="90" />
            <circle className="art-ring" cx="100" cy="100" r="62" />
            <circle className="art-ring" cx="100" cy="100" r="34" />
            <circle className="art-bull" cx="100" cy="100" r="10" />
            <path className="art-cross" d="M100 0v200M0 100h200" />
          </svg>
          <svg className="art-arrow" viewBox="0 0 300 120" preserveAspectRatio="none">
            <path d="M10 110 C 80 20, 180 10, 290 40" />
          </svg>
        </>
      );
    case 'planning':
      return (
        <>
          <div className="art-wall art-wall--plan">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={`art-sticky art-sticky--${i}`} data-tilt={STICKY_TILT[i]} style={{ '--tilt': STICKY_TILT[i] }} />
            ))}
          </div>
          <svg className="art-clock" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" />
            <line className="art-clock-h" x1="50" y1="50" x2="50" y2="26" />
            <line className="art-clock-m" x1="50" y1="50" x2="72" y2="50" />
          </svg>
          <div className="art-desk" />
        </>
      );
    case 'building-campaigns':
      return (
        <>
          <svg className="art-rays" viewBox="-100 -100 200 200">
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1="0" y1="-40" x2="0" y2="-90" transform={`rotate(${i * 30})`} />
            ))}
          </svg>
          <div className="art-shapes">
            <span className="art-shape art-shape--circle" />
            <span className="art-shape art-shape--square" />
            <span className="art-shape art-shape--tri" />
            <span className="art-shape art-shape--bar" />
          </div>
        </>
      );
    case 'marketing':
      return (
        <>
          <div className="art-speed">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} />
            ))}
          </div>
          <div className="art-platforms">
            <PlatformIcon type="instagram" />
            <PlatformIcon type="facebook" />
            <PlatformIcon type="youtube" />
            <PlatformIcon type="linkedin" />
            <PlatformIcon type="x" />
          </div>
          <div className="art-smoke">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} />
            ))}
          </div>
        </>
      );
    case 'evaluation':
      return (
        <svg className="art-bigchart" viewBox="0 0 400 260" preserveAspectRatio="none">
          <path className="art-axis" d="M20 10v230h370" />
          <path className="art-area" d="M20 220 C 90 210, 120 160, 170 170 S 260 90, 300 100 S 360 40, 390 30 V240 H20Z" />
          <path className="art-line" d="M20 220 C 90 210, 120 160, 170 170 S 260 90, 300 100 S 360 40, 390 30" />
        </svg>
      );
    case 'optimize':
      return (
        <>
          <img className="art-earth" src={earth} alt="" loading="lazy" width="2400" height="1440" />
          <svg className="art-loop" viewBox="0 0 400 240" preserveAspectRatio="none">
            <ellipse cx="230" cy="120" rx="150" ry="70" />
          </svg>
          <span className="art-spark art-spark--1">✦</span>
          <span className="art-spark art-spark--2">✦</span>
          <span className="art-spark art-spark--3">✦</span>
          <span className="art-next">Next cycle → 01</span>
        </>
      );
    default:
      return null;
  }
}

/* Vector traces that live in Zeus's own coordinate box, so they follow him at any size. */
function ZeusTrace({ id }) {
  if (id === 'brand-study') {
    return (
      <svg className="zeus-trace" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false" aria-hidden="true">
        <path className="zt-halo" d="M24 -6a26 6 0 1 0 52 0a26 6 0 1 0 -52 0" />
      </svg>
    );
  }
  if (id === 'marketing') {
    return (
      <svg className="zeus-trace" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false" aria-hidden="true">
        <path className="zt-trajectory" d="M84 40C100 31 124 14 170 -20" />
      </svg>
    );
  }
  return null;
}

function PlatformIcon({ type }) {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" className="fill" />
      </>
    ),
    facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />,
    youtube: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" className="fill" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
      </>
    ),
    x: <path d="M5 4l14 16M19 4 5 20" />,
  };
  return (
    <span className={`art-platform art-platform--${type}`} aria-hidden="true">
      <svg viewBox="0 0 24 24">{paths[type]}</svg>
    </span>
  );
}

/* ---------- Detail panel per mission ---------- */
function Status({ index, total }) {
  return (
    <div className="status" aria-hidden="true">
      <span className="label">Mission status</span>
      <span className="status__bar">
        {Array.from({ length: total }, (_, i) => (
          <i key={i} className={i <= index ? 'is-on' : undefined} />
        ))}
      </span>
      <span className="label status__pct">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
}

function Detail({ mission, onReplay }) {
  const [selected, setSelected] = useState(0);
  const { id, items, listTitle, hotspots } = mission;

  if (id === 'strategy') {
    return (
      <>
        <p className="detail__title">{listTitle}</p>
        <div className="board" role="group" aria-label="Strategy elements">
          {items.map((item, i) => (
            <button
              key={item}
              type="button"
              data-item
              className="board__tile"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="board__num">0{i + 1}</span>
              {item}
            </button>
          ))}
        </div>
        <p className="board__note" aria-live="polite" data-item>
          {hotspots[selected].text}
        </p>
      </>
    );
  }

  if (id === 'planning') {
    const notes = [
      [1, 1, 'Teaser'],
      [3, 1, 'Reel'],
      [2, 2, 'Shoot'],
      [5, 2, 'Launch'],
      [4, 3, 'Ads'],
      [1, 3, 'Review'],
    ];
    return (
      <>
        <p className="detail__title">{listTitle}</p>
        <div className="cal" aria-hidden="true">
          {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
            <span key={i} className="cal__day">
              {d}
            </span>
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <span key={i} className="cal__cell" style={{ gridColumn: (i % 5) + 1, gridRow: Math.floor(i / 5) + 2 }} />
          ))}
          {notes.map(([c, r, t]) => (
            <span
              key={t}
              className={`cal__note${t === 'Launch' ? ' cal__note--key' : ''}`}
              style={{ gridColumn: c, gridRow: r + 1 }}
            >
              {t}
            </span>
          ))}
        </div>
        <ul className="legend">
          {items.map((it) => (
            <li key={it} data-item>
              {it}
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (id === 'building-campaigns') {
    return (
      <>
        <p className="detail__title">{listTitle}</p>
        <div className="kit" aria-hidden="true">
          <span className="kit__part kit__key">
            <span className="kit__sun" />
          </span>
          <span className="kit__part kit__post" />
          <span className="kit__part kit__post" />
          <span className="kit__part kit__post" />
          <span className="kit__part kit__page">
            <i />
            <i />
            <i />
          </span>
        </div>
        <ul className="legend">
          {items.map((it) => (
            <li key={it} data-item>
              {it}
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (id === 'evaluation') {
    return (
      <>
        <p className="detail__title">{listTitle}</p>
        <div className="dash">
          <svg className="dash__line" viewBox="0 0 220 90" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 80 L30 70 L60 74 L95 52 L130 58 L165 30 L220 12" />
          </svg>
          <div className="dash__bars" aria-hidden="true">
            {[38, 55, 46, 72, 64, 90].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          {hotspots.map((h, i) => (
            <Hotspot key={h.label} {...h} x={i ? '78%' : '58%'} y={i ? '76%' : '22%'} align="left" />
          ))}
        </div>
        <ul className="legend legend--dots">
          {items.map((it) => (
            <li key={it} data-item>
              {it}
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (id === 'optimize') {
    return (
      <>
        <ul className="grow">
          {items.map((it) => (
            <li key={it} data-item>
              {it}
            </li>
          ))}
        </ul>
        <div className="grow__actions" data-item>
          <Link to="/contact" className="btn btn--small">
            <span>Start your mission</span>
            <span className="btn__icon">
              <ArrowIcon />
            </span>
          </Link>
          <button type="button" className="grow__replay" onClick={onReplay}>
            ↺ Replay the loop
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="detail__title">{listTitle}</p>
      <ul className="checklist">
        {items.map((it) => (
          <li key={it} data-item>
            <Check />
            {it}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Scene({ mission, index, total, onReplay }) {
  const layout = LAYOUT[mission.id];
  const [zx, zb, zh] = layout.zeus;
  const flip = index % 2 === 1;
  const spots = layout.spots.map((p, i) => [p, mission.hotspots[i]]).filter(([, h]) => h);

  return (
    <article
      className={`scene scene--${mission.id}${flip ? ' scene--flip' : ''}`}
      data-scene={mission.id}
      id={`mission-${mission.id}`}
      aria-labelledby={`mission-title-${mission.id}`}
    >
      <div className="scene__grid">
        <div className="panel panel--main" data-rot={flip ? 0.6 : -0.6} style={{ '--rot': flip ? 0.6 : -0.6 }}>
          <span className="tape">
            {mission.num} {mission.tag}
          </span>
          <div className="scene__art" aria-hidden="true">
            <Art id={mission.id} />
          </div>
          <div className="scene__zeus" style={{ left: zx, bottom: zb, height: zh }}>
            <ZeusTrace id={mission.id} />
            <img className="scene__pose scene__pose--a" src={mission.poses[0].src} alt="" loading="lazy" />
            <img className="scene__pose scene__pose--b" src={mission.poses[1].src} alt={mission.poses[1].alt} loading="lazy" />
          </div>
          <div className="bubble" style={{ left: layout.bubble[0], top: layout.bubble[1] }}>
            <p>
              {mission.bubble[0]} <strong>{mission.bubble[1]}</strong>
            </p>
          </div>
          {spots.map(([[x, y, align], h]) => (
            <Hotspot key={h.label} label={h.label} text={h.text} x={x} y={y} align={align} />
          ))}
        </div>

        <div className="panel panel--caption" data-rot={flip ? -0.8 : 0.8} style={{ '--rot': flip ? -0.8 : 0.8 }}>
          <p className="label">
            Mission {mission.num} / {String(total).padStart(2, '0')}
          </p>
          <h3 id={`mission-title-${mission.id}`}>{mission.title}</h3>
          <p>{mission.body}</p>
        </div>

        <div className="panel panel--detail" data-rot={flip ? 0.4 : -0.4} style={{ '--rot': flip ? 0.4 : -0.4 }}>
          <Detail mission={mission} onReplay={onReplay} />
          <Status index={index} total={total} />
        </div>
      </div>
    </article>
  );
}
