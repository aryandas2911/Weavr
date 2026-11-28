import Link from 'next/link';
import {BookingLink} from './navigation';
import {contact,siteOrigin} from '../content';

export function pageMetadata(title:string,description:string,path:string){
  const canonical=siteOrigin?new URL(path,siteOrigin).href:undefined;
  return {title,description,alternates:{canonical},openGraph:{title,description,url:canonical,images:['/Logo.png']}};
}
export function Eyebrow({children}:{children:React.ReactNode}){return <p className="eyebrow"><i aria-hidden="true"/>{children}</p>}
export function PageIntro({label,title,children}:{label:string;title:string;children:React.ReactNode}){
  return <section className="page-intro shell"><Eyebrow>{label}</Eyebrow><h1 data-split>{title}</h1><div className="page-lead" data-reveal>{children}</div></section>
}
export function Closing({title="Good idea? Let’s make it real."}:{title?:string}){
  return <section className="closing"><div className="shell closing-inner"><div className="closing-copy"><Eyebrow>Tell us about your business</Eyebrow><h2>{title}</h2><div className="actions"><BookingLink/><Link className="button outline" href={contact.email?'mailto:'+contact.email:'/contact/#email'}>Email us</Link></div></div><span className="closing-logo-stop" aria-hidden="true" data-logo-stop><img src="/Logo.png" alt="" width="641" height="456" loading="lazy"/></span></div></section>
}
export const principles=[
  ['Intentional design','Every element earns its place.'],
  ['Careful engineering','Fast, responsive and dependable.'],
  ['Plain communication','Early work, clear decisions, no jargon.'],
  ['Built for your business','Shaped around your audience and team.'],
];
