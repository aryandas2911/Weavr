import Link from 'next/link';
import {BookingLink} from '../components/navigation';
import {Closing,ConceptCard,Eyebrow,principles,pageMetadata} from '../components/editorial';
import {Sculpture} from '../components/sculpture';
import {concepts,services,steps} from '../content';
export const metadata={...pageMetadata('Independent Creative Development Studio','WEAVR designs and builds distinctive digital experiences for ambitious brands.','/'),title:{absolute:'WEAVR | Independent Creative Development Studio'}};
export default function Home(){
  return <>
    <section className="shell hero">
      <div className="hero-copy"><Eyebrow>Independent creative development studio</Eyebrow>
        <h1><span><b className="hero-line">Good ideas</b></span><span><b className="hero-line">deserve a</b></span><span><b className="hero-line">better <em>web.</em></b></span></h1>
        <p>We design and build distinctive digital experiences for ambitious brands.</p>
        <div className="actions"><BookingLink/><Link className="button outline" href="/services/">Explore our services</Link></div>
      </div>
      <Sculpture interactive/>
      <a href="#studio" className="scroll-link"><span aria-hidden="true"/> Scroll to explore</a>
    </section>
    <section className="band blue" id="studio"><div className="shell editorial-grid" data-reveal><Eyebrow>The studio</Eyebrow><div><h2>Built to look different.<br/>Made to work harder.</h2><p>WEAVR brings design and engineering together from the first conversation. We build websites that help people understand what you do, find what they need, and remember who made it possible.</p><Link className="text-link" href="/about/">Meet WEAVR</Link></div></div></section>
    <section className="shell block"><div className="section-head" data-reveal><div><Eyebrow>Services</Eyebrow><h2>What we do.</h2></div><Link className="button outline" href="/services/">View all services</Link></div><div className="service-index">{services.map((service,i)=><Link key={service.id} href={'/services/#'+service.id}><span className="service-number">{String(i+1).padStart(2,'0')}</span><span>{service.name}</span><span className="plus" aria-hidden="true">+</span></Link>)}</div></section>
    <section className="band lavender"><div className="shell philosophy"><div className="interlock" aria-hidden="true" data-parallax><i/><i/><i/></div><div data-reveal><Eyebrow>Our approach</Eyebrow><h2>Good work starts with good questions.</h2><p>We get to know the business before choosing a direction. That gives us a reason for what we design, a clear plan for what we build, and something concrete to improve after launch.</p><Link className="text-link" href="/process/">See how we work</Link></div></div></section>
    <section className="shell block"><div className="section-head" data-reveal><div><Eyebrow>Capabilities preview</Eyebrow><h2>Three ways it could look.</h2><p>Studio concepts for a marketing site, a storefront, and a web application.</p></div><Link className="button outline" href="/work/">View explorations</Link></div><div className="concept-grid">{concepts.map(concept=><ConceptCard key={concept.id} concept={concept}/>)}</div></section>
    <section className="band blue"><div className="shell editorial-grid" data-reveal><div><Eyebrow>Why WEAVR</Eyebrow><h2>Care in the details.</h2></div><dl className="principles">{principles.map(([title,copy])=><div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}</dl></div></section>
    <section className="shell block"><div className="section-head" data-reveal><div><Eyebrow>Process</Eyebrow><h2>From first call to launch.</h2></div><Link className="button outline" href="/process/">Explore the process</Link></div><ol className="steps-preview">{steps.map((step,i)=><li key={step.name}><Link href={'/process/#step-'+(i+1)}><small>0{i+1}</small>{step.name}</Link></li>)}</ol></section>
    <Closing/>
  </>
}
