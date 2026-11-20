import Link from 'next/link';
import {BookingLink,BrandMark} from './navigation';
import {contact,concepts,siteOrigin} from '../content';
export function pageMetadata(title:string,description:string,path:string){
  const canonical=siteOrigin?new URL(path,siteOrigin).href:undefined;
  return {title,description,alternates:{canonical},openGraph:{title,description,url:canonical,images:['/sculpture.webp']}};
}
export function Eyebrow({children}:{children:React.ReactNode}){return <p className="eyebrow"><i aria-hidden="true"/>{children}</p>}
export function PageIntro({label,title,children}:{label:string,title:string,children:React.ReactNode}){
  return <section className="page-intro shell"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><div className="intro-description">{children}</div></section>
}
export function Closing({title="Have something good in mind? Let’s make it real."}:{title?:string}){
  return <section className="closing"><div className="shell closing-inner" data-reveal><div><Eyebrow>Start a conversation</Eyebrow><h2>{title}</h2><p>Tell us what you’re building and where you could use a hand.</p><div className="actions"><BookingLink/><Link className="button outline" href={contact.email?'mailto:'+contact.email:'/contact/#email'}>Email options</Link></div></div><span className="closing-mark"><BrandMark/></span></div></section>
}
type Concept=typeof concepts[number];
export function ConceptCard({concept,full=false}:{concept:Concept,full?:boolean}){
  return <article className="concept" id={concept.id} data-reveal>
    <div className={'concept-art '+concept.art} aria-hidden="true">
      <div className="mock-window"><div className="mock-nav"><b>{concept.name}</b><span>•••</span></div>
        {concept.art==='field'&&<div className="mock-field"><strong>Objects<br/>in good form.</strong><i/><i/><i/></div>}
        {concept.art==='goods'&&<div className="mock-goods"><strong>Soft by nature.</strong><div><i/><i/><i/></div></div>}
        {concept.art==='daymark'&&<div className="mock-app"><strong>Plan the week.</strong><div>{Array.from({length:9},(_,i)=><i key={i}/>)}</div></div>}
      </div>
    </div>
    <div className="concept-meta"><p className="eyebrow">Concept exploration / {concept.type}</p><h3>{full?concept.name:<Link href={'/work/#'+concept.id}>{concept.name}</Link>}</h3>{full&&<><p><strong>{concept.industry}</strong></p><p>{concept.challenge} {concept.solution}</p></>}</div>
  </article>
}
export const principles=[
  ['Design with intention','From the first headline to the smallest control, every element helps someone understand or do something.'],
  ['Engineering with care','We pay attention to the things people feel immediately: speed, responsiveness, and an interface that works as expected.'],
  ['Clear communication','We share work early, explain decisions in plain language and agree on what happens next.'],
  ['Built around the business','We shape our work around your audience, goals, and what your team needs to manage after launch.'],
];
