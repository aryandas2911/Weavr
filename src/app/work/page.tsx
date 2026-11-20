import {PageIntro,Closing,ConceptCard,pageMetadata} from '../../components/editorial';
import {concepts} from '../../content';
export const metadata=pageMetadata('Work and Explorations','Explore speculative marketing, retail and application concepts from WEAVR.','/work/');
export default function Work(){return <>
  <PageIntro label="Work / Explorations" title="Ideas in working form."><p>Three self-initiated design studies explore how a clear idea can shape the way a website looks, feels and works. Each is a speculative studio demonstration.</p></PageIntro>
  <section className="shell work-gallery" aria-label="Concept explorations">{concepts.map(concept=><ConceptCard key={concept.id} concept={concept} full/>)}</section>
  <Closing title="Let’s make the first real thing together."/>
</>}
