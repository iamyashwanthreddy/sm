import { useId, useState } from 'react';
import './Hotspot.css';

/**
 * Small pulsing marker that reveals a note on hover, focus or click.
 * The note is always in the DOM, so screen readers can reach it.
 */
export default function Hotspot({ label, text, x, y, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div
      className={`hotspot hotspot--${align}${open ? ' is-open' : ''}`}
      style={{ left: x, top: y }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="hotspot__btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      >
        <span className="sr-only">{label}: </span>
        <span aria-hidden="true">+</span>
      </button>
      <div id={id} className="hotspot__note" role="note">
        <strong>{label}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}
