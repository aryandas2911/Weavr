import {Sculpture} from '../../components/sculpture';
import {PageIntro,Closing,Eyebrow,principles,pageMetadata} from '../../components/editorial';
export const metadata=pageMetadata('About','Meet Weavr, a web development studio serving small and medium businesses.','/about/');
export default function About(){return <>
  <PageIntro label="About WEAVR" title="A practical web partner for your business."><p>We design and build websites and web tools for small and medium businesses across India, shaped around your customers, goals and budget.</p></PageIntro>
  <section className="shell about-grid"><Sculpture/><div data-reveal><Eyebrow>What we believe</Eyebrow><h2>Design and code belong in the same conversation.</h2><p>Clear ideas, considered design and careful engineering. Built to work beautifully on every screen.</p><p>We share work early and give your team control after launch.</p></div></section>
  <section className="band lavender"><div className="shell editorial-grid"><div><Eyebrow>Working together</Eyebrow><h2>What we bring.</h2></div><dl className="principles">{principles.map(([title,copy])=><div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}</dl></div></section><Closing/>
</>}
