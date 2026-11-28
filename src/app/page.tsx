import {ApproachAccordion} from '../components/approach-accordion';
import ColorBends from '../components/ColorBends';
import {Eyebrow,pageMetadata} from '../components/editorial';
import {ContactSection} from '../components/contact-section';
import {HeroActions} from '../components/hero-actions';
import {HeroAtmosphere} from '../components/hero-atmosphere';
import {BookingLink} from '../components/navigation';
import {ServiceAccordion} from '../components/service-accordion';
import {ServiceCta} from '../components/service-cta';
import {enquiryHref} from '../content';

export const metadata={...pageMetadata('Web Design & Development for Growing Businesses','Fast, affordable websites, SEO and custom web applications for Indian small and medium businesses.','/'),title:{absolute:'Weavr | Web Design & Development for Growing Businesses'}};

const tickerWords=['Strategy','Design','Development','Automation'];
const studioColors=['#8cb9ea','#baa7e4','#f2c4d2'];

export default function Home(){
  return <>
    <section className="hero">
      <div className="hero-copy">
        <h1 aria-label="Websites built for your business.">
          <span><b className="hero-line">Websites built for</b></span>
          <span><b className="hero-line">your <em>business.</em></b></span>
        </h1>
        <p className="hero-tagline">Fast, affordable websites and web apps, tailored to how your business works. Design, development, SEO and automation for growing businesses.</p>
        <HeroActions/>
      </div>
      <HeroAtmosphere/>
    </section>

    <div className="ticker" aria-label="WEAVR disciplines"><div className="ticker-track">{tickerWords.map((word)=><span key={word}>{word}<i aria-hidden="true"/></span>)}</div></div>

    <section className="band blue studio-band" id="studio">
      <div className="studio-color-bends" aria-hidden="true">
        <ColorBends
          colors={studioColors}
          pointerTargetSelector=".studio-band"
          rotation={28}
          speed={0.16}
          scale={1.15}
          frequency={1.28}
          mouseInfluence={0.45}
          parallax={0.25}
          noise={0}
          intensity={0.92}
          bandWidth={5}
        />
      </div>
      <div className="shell studio-grid">
        <div className="studio-head">
          <Eyebrow>Built for growing businesses</Eyebrow>
          <h2>Digital solutions that move your business forward.</h2>
        </div>
        <div className="studio-copy">
          <p>We build websites, landing pages and custom applications around your customers, budget and day-to-day needs. One team from first brief to launch.</p>
          <ul className="studio-visual" aria-label="Studio services">
            <li>Website &amp; Apps</li>
            <li>Digital Design</li>
            <li>AI &amp; Automation</li>
          </ul>
          <BookingLink className="text-link" label="Let's Discuss Your Project" showArrow={false}/>
        </div>
      </div>
    </section>

    <ApproachAccordion/>

    <section className="services-showcase" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="services-showcase__head" data-reveal>
          <div>
            <Eyebrow>What we can do for you</Eyebrow>
            <h2 id="services-title">Digital solutions. Real business impact.</h2>
          </div>
          <p>From your first website to intelligent business automation, we build digital solutions that help you attract customers, work smarter and grow.</p>
        </div>
        <ServiceAccordion/>
        <div className="services-showcase__foot" data-reveal>
          <ServiceCta href={enquiryHref(undefined, '/')}>Have a project in mind? Let's talk</ServiceCta>
        </div>
      </div>
    </section>

    <ContactSection/>
  </>;
}
