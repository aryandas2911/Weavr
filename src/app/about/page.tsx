import {Sculpture} from '../../components/sculpture';
import {PageIntro,Closing,Eyebrow,principles,pageMetadata} from '../../components/editorial';
export const metadata=pageMetadata('About','Meet WEAVR, an independent creative development studio.','/about/');
export default function About(){return <>
  <PageIntro label="About WEAVR" title="Small studio thinking. Big attention to detail."><p>WEAVR is an independent creative development studio for startups, small businesses, e-commerce brands and agencies that care how their work shows up online.</p></PageIntro>
  <section className="shell about-grid"><Sculpture/><div data-reveal><Eyebrow>What we believe</Eyebrow><h2>Design and code belong in the same conversation.</h2><p>Good design makes choices clearer. Good engineering makes those choices work on a slow connection, a small screen, or a keyboard. We bring both into the project early, so the idea can hold up outside the mockup.</p><p>Expect candid conversations, work you can see and respond to, and a handover that gives your team control.</p></div></section>
  <section className="band lavender"><div className="shell editorial-grid"><div><Eyebrow>Working together</Eyebrow><h2>What we bring.</h2></div><dl className="principles">{principles.map(([title,copy])=><div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}</dl></div></section><Closing/>
</>}
