import {contact} from '../content';
import {Eyebrow} from './editorial';
import {Inquiry} from './inquiry';
import SlicedWaves from './SlicedWaves';
import './contact-section.css';

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__waves" aria-hidden="true">
        <SlicedWaves
          color1="#f9bfb8"
          color2="#ac90cc"
          color3="#629bd0"
          spacing={24}
          ribbonHeight={0.33}
          spread={0.18}
          amplitude={0.15}
          speed={0.46}
          rotation={-12}
          position={0.68}
          brightness={1.45}
          lightMode
          grain={0}
          fade={0.14}
          opacity={0.66}
          dpr={1}
          mouseInteraction={false}
        />
      </div>
      <div className="shell contact-section__layout">
        <div className="contact-section__copy" data-reveal>
          <Eyebrow>Let's work together</Eyebrow>
          <h2 id="contact-title">Ready to build something better?</h2>
          <p className="contact-section__lead">Whether you're launching a website, building a custom application or exploring AI automation, let's find the right solution for your business.</p>
          <p>Tell us what you have in mind. We'll discuss your goals, requirements and potential next steps.</p>
          <a className="contact-section__email" href={`mailto:${contact.enquiryEmail}`}>
            Prefer email? Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-section__form" data-reveal><Inquiry/></div>
      </div>
    </section>
  );
}
