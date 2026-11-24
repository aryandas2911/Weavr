import Link from 'next/link';
import {BookingLink} from '../components/navigation';
import {Closing,Eyebrow,principles,pageMetadata} from '../components/editorial';
import {Sculpture} from '../components/sculpture';
import {ServiceAccordion} from '../components/service-accordion';
import {steps} from '../content';

export const metadata={...pageMetadata('Independent Creative Development Studio','WEAVR designs and builds distinctive digital experiences for ambitious brands.','/'),title:{absolute:'WEAVR | Independent Creative Development Studio'}};

const tickerWords=['Strategy','Design','Development','Detail'];

export default function Home(){
  return <>
    <section className="shell hero">
      <div className="hero-copy"><Eyebrow>Independent creative studio</Eyebrow>
        <h1 aria-label="Good ideas deserve a better web."><span><b className="hero-line">Good ideas</b></span><span><b className="hero-line">deserve a</b></span><span><b className="hero-line">better <em>web.</em></b></span></h1>
        <p className="hero-tagline">Design. Development. Detail.</p>
        <div className="actions"><BookingLink/><Link className="button outline" href="/services/">Explore services <span className="arrow" aria-hidden="true">↗</span></Link></div>
      </div>
      <Sculpture/>
      <a href="#studio" className="scroll-link"><span aria-hidden="true"/> Scroll to explore</a>
    </section>

    <div className="ticker" aria-label="WEAVR disciplines"><div className="ticker-track">{tickerWords.map((word)=><span key={word}>{word}<i aria-hidden="true"/></span>)}</div></div>

    <section className="band blue" id="studio"><div className="shell studio-grid" data-reveal><div className="studio-head"><Eyebrow>The studio</Eyebrow><h2>Built to look different.<br/>Made to work harder.</h2></div><div className="studio-copy"><p>Strategy, design and code under one roof. One small team, close to the work.</p><div className="studio-visual" aria-hidden="true"><span>Strategy</span><i/><span>Design</span><i/><span>Development</span></div><Link className="text-link" href="/about/">Meet WEAVR <span aria-hidden="true">↗</span></Link></div></div></section>

    <section className="storytelling" aria-labelledby="story-title" data-story>
      <div className="story-sticky">
        <div className="story-progress" aria-hidden="true"><i/></div>
        <div className="story-mark" aria-hidden="true"><span className="story-thread thread-one"/><span className="story-thread thread-two"/><span className="story-thread thread-three"/><img src="/Logo.png" alt="" width="641" height="456"/></div>
        <div className="story-copy">
          <article className="story-panel story-panel-one"><p>01 / Find the thread</p><h2 id="story-title">Start with what matters.</h2><span>We make the real problem visible before we make anything else.</span></article>
          <article className="story-panel story-panel-two"><p>02 / Weave the system</p><h2>Make every part belong.</h2><span>Words, interactions and engineering pull in the same direction.</span></article>
          <article className="story-panel story-panel-three"><p>03 / Put it to work</p><h2>Leave with something clear.</h2><span>A considered website your team can use, change and grow.</span></article>
        </div>
        <div className="story-count" aria-hidden="true"><span>01</span><span>02</span><span>03</span></div>
      </div>
    </section>

    <section className="section shell"><div className="section-head" data-reveal><div><Eyebrow>Services</Eyebrow><h2>What we do.</h2></div><p className="section-note">Seven ways we help good ideas show up well.</p></div><ServiceAccordion/></section>

    <section className="band lavender"><div className="shell approach"><div className="approach-art" aria-hidden="true" data-logo-stop><div className="logo-orbit"><span/><span/><span/></div></div><div className="approach-copy" data-reveal><Eyebrow>Our approach</Eyebrow><h2>Good work starts with good questions.</h2><p>We ask first, design second. Then we build it properly.</p><Link className="text-link" href="/process/">See how we work <span aria-hidden="true">↗</span></Link></div></div></section>

    <section className="band blue"><div className="shell why"><div className="why-head" data-reveal><Eyebrow>Why WEAVR</Eyebrow><h2>Care in the<br/>details.</h2></div><dl className="principles" data-stagger>{principles.map(([title,copy])=><div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}</dl></div></section>

    <section className="section shell"><div className="section-head" data-reveal><div><Eyebrow>Process</Eyebrow><h2>From first call to launch.</h2></div><Link className="button outline" href="/process/">Explore the process <span className="arrow" aria-hidden="true">↗</span></Link></div><ol className="steps-preview">{steps.map((step,i)=><li key={step.name}><Link href={'/process/#step-'+(i+1)}><small>0{i+1}</small><span>{step.name}</span><span className="step-arrow" aria-hidden="true">↗</span></Link></li>)}</ol></section>

    <Closing/>
  </>;
}
