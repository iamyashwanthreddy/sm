import { usePageMeta } from '../lib/hooks';
import Button from '../components/Button';
import confused from '../assets/zeus/confused.webp';
import './NotFound.css';

export default function NotFound() {
  usePageMeta('Lost in space', 'This page drifted out of orbit.');
  return (
    <section className="not-found" aria-labelledby="nf-title">
      <div className="stars" aria-hidden="true" />
      <div className="container not-found__inner">
        <img src={confused} alt="Zeus shrugging, confused" className="not-found__zeus" />
        <p className="label">Error 404 · Signal lost</p>
        <h1 id="nf-title">
          Houston, this page <em>isn’t here.</em>
        </h1>
        <p className="lead">The link may be old or mistyped. Let’s get you back on course.</p>
        <div className="not-found__actions">
          <Button to="/">Back to base</Button>
          <Button to="/contact" variant="ghost">
            Contact mission control
          </Button>
        </div>
      </div>
    </section>
  );
}
