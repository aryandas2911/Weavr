'use client';

import {useId, useState} from 'react';
import {enquiryHref, services} from '../content';
import {ServiceCta} from './service-cta';
import './services-showcase.css';

export function ServiceAccordion() {
  const id = useId();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="service-discovery" data-service-entrance>
      {services.map((service, index) => {
        const expanded = open === service.id;
        const triggerId = `${id}-${service.id}`;
        const panelId = `${triggerId}-details`;

        return (
          <article className="service-discovery__item" data-expanded={expanded} key={service.id}>
            <h3>
              <button
                type="button"
                className="service-discovery__trigger"
                id={triggerId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(current => current === service.id ? null : service.id)}
              >
                <span className="service-discovery__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="service-discovery__title">{service.name}</span>
                <span className="service-discovery__icon" aria-hidden="true"/>
              </button>
            </h3>
            <div className="service-discovery__panel" id={panelId} role="region" aria-labelledby={triggerId} inert={!expanded}>
              <div className="service-discovery__clip">
                <div className="service-discovery__details">
                  <div className="service-discovery__summary">
                    <p>{service.detail}</p>
                    <div>
                      <ServiceCta href={enquiryHref(service.id, '/')} outline>Discuss Your Requirements</ServiceCta>
                    </div>
                  </div>
                  <dl>
                    <div><dt>What's included</dt><dd>{service.includes}</dd></div>
                    <div><dt>Ideal for</dt><dd>{service.fit}</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
