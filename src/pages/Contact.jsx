import { useRef, useState } from 'react';
import { usePageMeta, useReveal } from '../lib/hooks';
import { CONTACT, OFFICES, SOCIALS } from '../data/site';
import { SERVICES } from '../data/services';
import { ArrowIcon } from '../components/Button';
import megaphone from '../assets/zeus/megaphone.webp';
import highFive from '../assets/zeus/high-five.webp';
import './Contact.css';

// Set VITE_CONTACT_ENDPOINT (e.g. a Formspree / Basin / own API URL) to post
// submissions as JSON. Without it the form opens a pre-filled email instead.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const EMPTY = { name: '', email: '', phone: '', company: '', services: [], message: '', website: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please tell us your name.';
  if (!v.email.trim()) e.email = 'We need an email to reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'That email doesn’t look quite right.';
  if (v.phone && !/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = 'Use digits, spaces and + only.';
  if (v.message.trim().length < 10) e.message = 'A sentence or two about the project helps (10+ characters).';
  return e;
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>
        {label} {optional && <span className="field__opt">(optional)</span>}
      </label>
      {children}
      <p id={`${id}-error`} className="field__error" role={error ? 'alert' : undefined}>
        {error}
      </p>
    </div>
  );
}

export default function Contact() {
  usePageMeta(
    'Start a Project',
    'Tell Social Matters about your brand. Email hello@socialmatters.agency or call +91 99599 43211. Offices in Begumpet, Secunderabad and Mumbai.',
  );
  const root = useRef(null);
  const form = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error
  useReveal(root);

  const set = (name) => (e) => {
    const next = { ...values, [name]: e.target.value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  };
  const blur = (name) => () => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };
  const toggleService = (title) =>
    setValues((v) => ({
      ...v,
      services: v.services.includes(title) ? v.services.filter((s) => s !== title) : [...v.services, title],
    }));

  const fieldProps = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    onBlur: blur(name),
    'aria-invalid': touched[name] && errors[name] ? true : undefined,
    'aria-describedby': `f-${name}-error`,
  });

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(errs).length) {
      form.current.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    if (values.website) return; // honeypot: silently ignore bots

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      services: values.services,
      message: values.message.trim(),
    };

    if (!ENDPOINT) {
      const lines = [`Name: ${payload.name}`, `Email: ${payload.email}`];
      if (payload.phone) lines.push(`Phone: ${payload.phone}`);
      if (payload.company) lines.push(`Company: ${payload.company}`);
      if (payload.services.length) lines.push(`Interested in: ${payload.services.join(', ')}`);
      const body = [...lines, '', payload.message].join('\n');
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        `New project enquiry — ${payload.company || payload.name}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus('error');
    }
  }

  const done = status === 'sent' || status === 'mailto';

  return (
    <div ref={root} className="contact">
      <div className="stars" aria-hidden="true" />
      <div className="container contact__grid">
        <aside className="contact__info">
          <span className="label contact__code">SM / 06 · Start a project</span>
          <h1 className="contact__title" data-reveal>
            Let’s plan your <em>mission.</em>
          </h1>
          <p className="lead" data-reveal>
            Tell us where your brand is today and where you want it to go. The crew will take it from there.
          </p>

          <dl className="contact__list" data-reveal="stagger">
            <div>
              <dt className="label">Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </dd>
            </div>
            <div>
              <dt className="label">Call</dt>
              <dd>
                {CONTACT.phones.map((p) => (
                  <a key={p.href} href={p.href}>
                    {p.label}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="label">Visit</dt>
              <dd>
                {OFFICES.filter((o) => o.map).map((o) => (
                  <a key={o.name} href={o.map} target="_blank" rel="noreferrer" className="contact__office">
                    <strong>{o.city}</strong>
                    <span>{o.address}</span>
                  </a>
                ))}
                <span className="contact__office">
                  <strong>Mumbai</strong>
                </span>
              </dd>
            </div>
            <div>
              <dt className="label">Follow</dt>
              <dd className="contact__socials">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
          <img className="contact__zeus" src={megaphone} alt="" />
        </aside>

        <section className="contact__panel" aria-labelledby="form-title">
          {done ? (
            <div className="contact__done" role="status">
              <img src={highFive} alt="Zeus giving a high five" />
              <h2 id="form-title">{status === 'sent' ? 'Message received!' : 'Almost there!'}</h2>
              <p>
                {status === 'sent'
                  ? 'Thanks for reaching out. Someone from the crew will get back to you soon.'
                  : `Your email app should now be open with your message ready to go. Just hit send. If nothing opened, write to us at ${CONTACT.email}.`}
              </p>
              <button type="button" className="link-arrow" onClick={() => setStatus('idle')}>
                Send another message <ArrowIcon />
              </button>
            </div>
          ) : (
            <form ref={form} className="contact__form" onSubmit={onSubmit} noValidate>
              <div className="contact__form-head">
                <h2 id="form-title">Project brief</h2>
                <span className="label">Fields marked * are required</span>
              </div>

              <div className="field-row">
                <Field id="f-name" label="Your name *" error={touched.name && errors.name}>
                  <input type="text" autoComplete="name" {...fieldProps('name')} />
                </Field>
                <Field id="f-email" label="Email *" error={touched.email && errors.email}>
                  <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
                </Field>
              </div>
              <div className="field-row">
                <Field id="f-phone" label="Phone" optional error={touched.phone && errors.phone}>
                  <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} />
                </Field>
                <Field id="f-company" label="Company / brand" optional>
                  <input type="text" autoComplete="organization" {...fieldProps('company')} />
                </Field>
              </div>

              <fieldset className="chips">
                <legend>
                  What can we help with? <span className="field__opt">(pick any)</span>
                </legend>
                <div className="chips__list">
                  {SERVICES.map((s) => (
                    <label key={s.id} className="chip">
                      <input
                        type="checkbox"
                        checked={values.services.includes(s.title)}
                        onChange={() => toggleService(s.title)}
                      />
                      <span>{s.title}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field id="f-message" label="Tell us about the project *" error={touched.message && errors.message}>
                <textarea rows={5} {...fieldProps('message')} />
              </Field>

              {/* Honeypot */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="f-website">Website</label>
                <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
              </div>

              {status === 'error' && (
                <p className="contact__alert" role="alert">
                  Something went wrong while sending. Please try again, or email us directly at{' '}
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
                </p>
              )}

              <div className="contact__submit">
                <button type="submit" className="btn" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                  <span>{status === 'sending' ? 'Launching…' : 'Send brief'}</span>
                  <span className="btn__icon">
                    {status === 'sending' ? <span className="spinner" aria-hidden="true" /> : <ArrowIcon />}
                  </span>
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
