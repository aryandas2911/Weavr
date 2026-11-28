'use client';

import {Suspense, useEffect, useId, useRef, useState, type FormEvent} from 'react';
import {useSearchParams} from 'next/navigation';
import {contact, services} from '../content';
import './contact-section.css';

const budgets = ['Under ₹50,000', '₹50,000 to ₹1 lakh', '₹1 lakh to ₹3 lakhs', '₹3 lakhs or more', 'Prefer to discuss'];
const successMessage = "Thanks for reaching out! We'll be in touch to discuss your project.";
const submissionError = 'We couldn’t confirm your submission. Your details are still here. Try again or contact us by email.';

function ProjectSelection({onSelect}: {onSelect: (project: string) => void}) {
  const requestedService = useSearchParams().get('service');

  useEffect(() => {
    const selectFromUrl = () => {
      const service = requestedService || location.hash.slice(1);
      onSelect(services.some(({id}) => id === service) ? service : '');
    };
    selectFromUrl();
    window.addEventListener('hashchange', selectFromUrl);
    return () => window.removeEventListener('hashchange', selectFromUrl);
  }, [requestedService, onSelect]);

  return null;
}

export function Inquiry() {
  const titleId = useId();
  const [project, setProject] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !contact.enquiryEndpoint) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const service = services.find(({id}) => id === project);

    if (!name || !message || (!service && project !== 'not-sure')) {
      setError('Please enter your name and project details, and choose a service.');
      setStatus('error');
      return;
    }

    data.set('name', name);
    data.set('message', message);
    data.set('service', service?.name ?? 'Not sure yet');
    submitting.current = true;
    setStatus('loading');
    setError('');

    try {
      const response = await fetch(contact.enquiryEndpoint, {
        method: 'POST',
        body: data,
        headers: {Accept: 'application/json'},
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('Enquiry submission rejected');
      form.reset();
      setStatus('success');
    } catch {
      setError(submissionError);
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  }

  const loading = status === 'loading';

  return (
    <form className="project-form" id="inquiry" aria-labelledby={titleId} aria-busy={loading}
      action={contact.enquiryEndpoint || undefined} method="post" onSubmit={submit}>
      <Suspense fallback={null}><ProjectSelection onSelect={setProject}/></Suspense>
      <header className="project-form__intro">
        <h2 id={titleId}>Tell us about your project</h2>
        <p>A few details to get the conversation started.</p>
      </header>
      <fieldset className="project-form__fields" disabled={loading}>
        <legend className="sr-only">Project enquiry</legend>
        <label>
          <span>Full Name <span aria-hidden="true">*</span></span>
          <input name="name" placeholder="Your name" autoComplete="name" required maxLength={120}/>
        </label>
        <label>
          <span>Work Email <span aria-hidden="true">*</span></span>
          <input name="email" type="email" placeholder="you@company.com" autoComplete="email" required maxLength={254}/>
        </label>
        <label>
          <span>Business Name</span>
          <input name="company" placeholder="Your business name" autoComplete="organization" maxLength={160}/>
        </label>
        <label>
          <span>Service Interested In <span aria-hidden="true">*</span></span>
          <select name="service" required value={project} onChange={event => setProject(event.target.value)}>
            <option value="" disabled>Select a service</option>
            {services.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
            <option value="not-sure">Not sure yet</option>
          </select>
        </label>
        <label className="project-form__wide">
          <span>Estimated Budget</span>
          <select name="budget" defaultValue="">
            <option value="">Select your budget (optional)</option>
            {budgets.map(budget => <option key={budget}>{budget}</option>)}
          </select>
        </label>
        <label className="project-form__wide">
          <span>Project Details <span aria-hidden="true">*</span></span>
          <textarea name="message" placeholder="What are you looking to build or improve?" required maxLength={3000} rows={4}/>
        </label>
      </fieldset>
      <div hidden><label>Leave this blank<input name="_gotcha" tabIndex={-1} autoComplete="off"/></label></div>
      <button className="project-form__button" type="submit" disabled={loading || !contact.enquiryEndpoint}>
        {loading ? 'Sending your enquiry…' : "Let's Discuss Your Project"}
        <svg viewBox="0 0 20 20" width="17" height="17" fill="none" aria-hidden="true">
          <path d="M5.5 14.5 14 6m-6.5 0H14v6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <p className="project-form__reassurance">No commitment. Just a conversation about what's possible.</p>
      {!contact.enquiryEndpoint && (
        <p className="project-form__notice">Online submissions are currently unavailable. <a href={`mailto:${contact.enquiryEmail}`}>Email us instead</a>.</p>
      )}
      {status === 'error' && <p className="project-form__notice" role="alert">{error} <a href={`mailto:${contact.enquiryEmail}`}>Email Weavr</a>.</p>}
      <div className="project-form__status" role="status">{status === 'success' ? successMessage : loading ? 'Sending…' : ''}</div>
    </form>
  );
}
