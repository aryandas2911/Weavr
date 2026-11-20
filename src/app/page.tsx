import Link from 'next/link';
import {BookingLink} from '../components/navigation';
import {Closing,Eyebrow,principles,pageMetadata} from '../components/editorial';
import {Sculpture} from '../components/sculpture';
import {ServiceAccordion} from '../components/service-accordion';
import {steps} from '../content';
export const metadata={...pageMetadata('Independent Creative Development Studio','WEAVR designs and builds distinctive digital experiences for ambitious brands.','/'),title:{absolute:'WEAVR | Independent Creative Development Studio'}};
export default function Home(){
  return <>
    <section className="shell hero">
      <div className="hero-copy"><Eyebrow>Independent creative development studio</Eyebrow>
        <h1><span><b className="hero-line">Good ideas</b></span><span><b className="hero-line">deserve a</b></span><span><b className="hero-line">better <em>web.</em></b></span></h1>
        <p className="hero-tagline">Design. Development. Detail.</p>
        <div className="actions"><BookingLink/></div>
      </div>
      <Sculpture/>
      <a href="#studio" className="scroll-link"><span aria-hidden="true"/> Scroll to explore</a>
    </section>
    <section className="band blue" id="studio"><div className="shell editorial-grid" data-reveal><Eyebrow>The studio</Eyebrow><div><h2>Built to look different.<br/>Made to work harder.</h2><div className="studio-visual" aria-hidden="true"><span>Strategy</span><i/><span>Design</span><i/><span>Development</span></div><Link className="text-link" href="/about/">Meet WEAVR</Link></div></div></section>
    <section className="shell block"><div className="section-head" data-reveal><div><Eyebrow>Services</Eyebrow><h2>What we do.</h2></div></div><ServiceAccordion/></section>
    <section className="band lavender"><div className="shell philosophy"><div className="logo-orbit" aria-hidden="true" data-parallax><span/><span/><span/><img src="/Logo.png" alt=""/></div><div data-reveal><Eyebrow>Our approach</Eyebrow><h2>Good work starts with good questions.</h2><Link className="text-link" href="/process/">See how we work</Link></div></div></section>
    <section className="band blue"><div className="shell editorial-grid" data-reveal><div><Eyebrow>Why WEAVR</Eyebrow><h2>Care in the details.</h2></div><dl className="principles">{principles.map(([title,copy])=><div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}</dl></div></section>
    <section className="shell block"><div className="section-head" data-reveal><div><Eyebrow>Process</Eyebrow><h2>From first call to launch.</h2></div><Link className="button outline" href="/process/">Explore the process</Link></div><ol className="steps-preview">{steps.map((step,i)=><li key={step.name}><Link href={'/process/#step-'+(i+1)}><small>0{i+1}</small>{step.name}</Link></li>)}</ol></section>
    <Closing/>
  </>
}
