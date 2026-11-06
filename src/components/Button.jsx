import { Link } from 'react-router-dom';

export function ArrowIcon({ size = 16, direction = 'right' }) {
  const rotate = { right: 0, down: 90, left: 180, up: -90, 'up-right': -45 }[direction];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pill button. Renders a router Link, an anchor, or a <button>. */
export default function Button({ to, href, children, variant, size, className = '', ...rest }) {
  const cls = ['btn', variant && `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(' ');
  const inner = (
    <>
      <span>{children}</span>
      <span className="btn__icon">
        <ArrowIcon />
      </span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
