import Link from 'next/link';
import {PageIntro,Closing,Eyebrow,pageMetadata} from '../../components/editorial';
import {services} from '../../content';
export const metadata=pageMetadata('Services','Explore WEAVR’s website design, development, branding and performance services.','/services/');
export default function Services(){return <>
  <PageIntro label="Services" title="Designed to do something."><p>From your first landing page to a custom web application, we design and build around what your business actually needs.</p></PageIntro>
  <div className="shell service-list">{services.map((s,i)=><section className="service-detail" id={s.id} key={s.id}><div data-reveal><Eyebrow>{String(i+1).padStart(2,'0')} / {s.name}</Eyebrow><h2>{s.title}</h2><p>{s.detail}</p><Link className="button outline" href={'/contact/#'+s.id}>Discuss {s.name.toLowerCase()}</Link></div><dl><div><dt>What’s included</dt><dd>{s.includes}</dd></div><div><dt>Good fit for</dt><dd>{s.fit}</dd></div><div><dt>What you get</dt><dd>{s.deliver}</dd></div></dl></section>)}</div><Closing/>
</>}
