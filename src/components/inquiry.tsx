'use client';
import {useEffect,useState} from 'react';
import {contact,services} from '../content';

export function Inquiry(){
  const [project,setProject]=useState('');
  const [status,setStatus]=useState('');
  useEffect(()=>{
    const selectFromHash=()=>{
      const id=location.hash.slice(1);
      if(services.some(service=>service.id===id))setProject(id);
    };
    selectFromHash();
    addEventListener('hashchange',selectFromHash);
    return ()=>removeEventListener('hashchange',selectFromHash);
  },[]);
  function prepare(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const labels:Record<string,string>={name:'Name',email:'Email',company:'Company',project:'Project type',budget:'Estimated budget',description:'Project description',timeline:'Preferred timeline'};
    const type=services.find(item=>item.id===project)?.name || 'Other';
    const lines=Array.from(data.entries()).filter(([,value])=>String(value).trim()).map(([key,value])=>labels[key]+': '+(key==='project'?type:String(value).trim()));
    const body=lines.join('\n\n');
    if(contact.email){
      location.href='mailto:'+contact.email+'?subject='+encodeURIComponent('WEAVR inquiry / '+type)+'&body='+encodeURIComponent(body);
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
  return <form className="inquiry" id="inquiry" onSubmit={prepare}>
    <h2>Project inquiry</h2>
    <p>{contact.email?'Prepare an email with the details below.':'Online delivery is currently unavailable. Fill in the form to download your project brief.'}</p>
    <div className="fields">
      <label>Full name<input name="name" autoComplete="name" required maxLength={120} pattern=".*\S.*"/></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
      <label>Company or brand<input name="company" autoComplete="organization" required maxLength={160} pattern=".*\S.*"/></label>
      <label>Project type<select name="project" required value={project} onChange={event=>setProject(event.target.value)}><option value="">Select a project type</option>{services.map(service=><option value={service.id} key={service.id}>{service.name}</option>)}<option value="other">Other / still deciding</option></select></label>
      <label>Estimated budget <small>(optional)</small><input name="budget" maxLength={120}/></label>
      <label>Preferred timeline <small>(optional)</small><input name="timeline" maxLength={120}/></label>
      <label className="wide">Project description<textarea name="description" required minLength={10} maxLength={3000} rows={5} onChange={event=>event.target.setCustomValidity(event.target.value.trim().length>=10||!event.target.value?'':'Please describe your project in at least 10 characters.')}/></label>
    </div>
    <button className="button" type="submit">{contact.email?'Prepare email draft':'Download project brief'}</button>
    <p role="status" aria-live="polite">{status}</p>
  </form>
}
