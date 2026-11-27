import {PageIntro,Closing,Eyebrow,pageMetadata} from '../../components/editorial';
import {steps} from '../../content';
export const metadata=pageMetadata('Our Process','A clear, collaborative process for building websites and web applications for small and medium businesses.','/process/');
export default function Process(){return <>
  <PageIntro label="Our process" title="Good work takes shape."><p>A straightforward five step process keeps scope, decisions and delivery clear from first conversation to launch.</p></PageIntro>
  <section className="shell process-grid" aria-label="Project stages"><aside><nav aria-label="Jump to a stage">{steps.map((step,i)=><a key={step.name} href={'#step-'+(i+1)}>0{i+1} / {step.name}</a>)}</nav><div className="process-logo" aria-hidden="true"><img src="/Logo.png" alt=""/></div></aside><ol>{steps.map((step,i)=><li key={step.name} id={'step-'+(i+1)} data-reveal><Eyebrow>Stage 0{i+1}</Eyebrow><h2>{step.name}</h2><p>{step.description}</p><p><strong>{step.outcome}</strong></p></li>)}</ol></section>
  <Closing/>
</>}
