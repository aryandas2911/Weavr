'use client';
import {useState} from 'react';
import Link from 'next/link';
import {services} from '../content';

export function ServiceAccordion(){
  const [open,setOpen]=useState<string | null>(null);
  return <div className="service-index" data-stagger>{services.map((service,i)=>{
    const expanded=open===service.id;
    return <article className={'service-item'+(expanded?' is-open':'')} key={service.id}>
      <button className="service-trigger" aria-expanded={expanded} aria-controls={'service-'+service.id} onClick={()=>setOpen(expanded?null:service.id)}>
        <span className="service-number">{String(i+1).padStart(2,'0')}</span><span>{service.name}</span><span className="plus" aria-hidden="true">+</span>
      </button>
      <div className={'service-panel'+(expanded?' active':'')} id={'service-'+service.id} aria-hidden={!expanded} inert={!expanded}>
        <div className="service-panel-inner"><div className="service-panel-copy"><p>{service.detail}</p><Link className="text-link" href={'/contact/#'+service.id}>Discuss this service <span aria-hidden="true">↗</span></Link></div><dl><div><dt>Included</dt><dd>{service.includes}</dd></div><div><dt>Good fit</dt><dd>{service.fit}</dd></div></dl></div>
      </div>
    </article>
  })}</div>
}
