import {PageIntro,Closing,Eyebrow,pageMetadata} from '../../components/editorial';
import {steps} from '../../content';
export const metadata=pageMetadata('Our Process','See how WEAVR takes a project from discovery through design, development, testing and launch.','/process/');
export default function Process(){return <>
  <PageIntro label="Our process" title="Good work takes shape."><p>Five stages give your project a clear path and give you a say in the decisions that shape it.</p></PageIntro>
  <section className="shell process-grid" aria-label="Project stages"><aside><nav aria-label="Jump to a stage">{steps.map((step,i)=><a key={step.name} href={'#step-'+(i+1)}>0{i+1} / {step.name}</a>)}</nav><div className="logo-orbit process-logo" aria-hidden="true" data-parallax><span/><span/><span/><img src="/Logo.png" alt=""/></div></aside><ol>{steps.map((step,i)=><li key={step.name} id={'step-'+(i+1)} data-reveal><Eyebrow>Stage 0{i+1}</Eyebrow><h2>{step.name}</h2><p>{step.description}</p><p><strong>{step.outcome}</strong></p></li>)}</ol></section>
  <Closing/>
</>}
