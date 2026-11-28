'use client';
import {Suspense, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {contact,services} from '../content';

function ProjectSelection({onSelect}: {onSelect: (project: string) => void}) {
  const requestedService = useSearchParams().get('service');
  useEffect(()=>{
    const selectFromUrl=()=>{
      const id=requestedService || location.hash.slice(1);
      onSelect(services.some(service=>service.id===id) ? id : '');
    };
    selectFromUrl();
    addEventListener('hashchange',selectFromUrl);
    return ()=>removeEventListener('hashchange',selectFromUrl);
  },[requestedService, onSelect]);
  return null;
}

export function Inquiry({recipient=contact.email}: {recipient?: string}){
  const [project,setProject]=useState('');
  const [status,setStatus]=useState('');
  function prepare(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const labels:Record<string,string>={name:'Name',email:'Email',company:'Company',project:'Project type',budget:'Estimated budget',description:'Project description',timeline:'Preferred timeline'};
    const type=services.find(item=>item.id===project)?.name || 'Other';
    const lines=Array.from(data.entries()).filter(([,value])=>String(value).trim()).map(([key,value])=>labels[key]+': '+(key==='project'?type:String(value).trim()));
    const body=lines.join('\n\n');
    if(recipient){
      location.href='mailto:'+recipient+'?subject='+encodeURIComponent('WEAVR inquiry / '+type)+'&body='+encodeURIComponent(body);
      setStatus('Your email draft is ready to review and send in your email app.');
      return;
    }
    try {
      const url=URL.createObjectURL(new Blob([body],{type:'text/plain'}));
      const link=document.createElement('a');
      link.href=url;link.download='weavr-project-brief.txt';link.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
      setStatus('Your brief is ready to save on this device.');
    } catch {setStatus('The download couldn’t start. Your brief is still in the form.')}
  }
  return <form className="inquiry" id="inquiry" aria-labelledby="inquiry-title" onSubmit={prepare} data-reveal>
    <Suspense fallback={null}><ProjectSelection onSelect={setProject}/></Suspense>
    <div className="inquiry-head"><h2 id="inquiry-title">Project enquiry</h2><p>{recipient?'Add a few details, then review and send your enquiry from your email app.':'Fill this in to download a project brief.'}</p></div>
    <div className="fields">
      <label>Full name<input name="name" autoComplete="name" required maxLength={120} pattern=".*\S.*"/></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
      <label>Company or brand<input name="company" autoComplete="organization" required maxLength={160} pattern=".*\S.*"/></label>
      <label>Project type<select name="project" required value={project} onChange={event=>setProject(event.target.value)}><option value="">Select a project type</option>{services.map(service=><option value={service.id} key={service.id}>{service.name}</option>)}<option value="other">Other / still deciding</option></select></label>
      <label>Estimated budget <small>(optional)</small><input name="budget" maxLength={120}/></label>
      <label>Preferred timeline <small>(optional)</small><input name="timeline" maxLength={120}/></label>
      <label className="wide">Project description<textarea name="description" required minLength={10} maxLength={3000} rows={4} onChange={event=>event.target.setCustomValidity(event.target.value.trim().length>=10||!event.target.value?'':'Please describe your project in at least 10 characters.')}/></label>
    </div>
    <div className="form-foot"><button className="button" type="submit">{recipient?'Prepare email draft':'Download project brief'}<span className="arrow" aria-hidden="true">↗</span></button><p role="status" aria-live="polite">{status}</p></div>
  </form>
}
