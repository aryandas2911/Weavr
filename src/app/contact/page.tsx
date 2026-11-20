import {PageIntro,pageMetadata} from '../../components/editorial';
import {Inquiry} from '../../components/inquiry';
import {contact,services} from '../../content';
export const metadata=pageMetadata('Contact','Prepare a project inquiry or get in touch with WEAVR.','/contact/');
const channels=[
  {id:'booking',name:'Discovery call',url:contact.booking,label:'Choose a time',setup:'Online booking is currently unavailable.'},
  {id:'email',name:'Email',url:contact.email?'mailto:'+contact.email:'',label:contact.email,setup:'An email address has yet to be configured.'},
  {id:'whatsapp',name:'WhatsApp',url:contact.whatsapp,label:'Open WhatsApp',setup:'WhatsApp has yet to be configured.'},
];
export default function Contact(){return <>
  <PageIntro label="Contact" title="Let’s make something worth looking at."><p>Tell us what you’re building. We’ll take it from there.</p></PageIntro>
  <div className="shell contact-grid">{services.map(service=><span className="contact-anchor" id={service.id} key={service.id}/>)}<Inquiry/>
    <aside aria-label="Ways to get in touch">{channels.map(channel=><section key={channel.id} id={channel.id}><h2>{channel.name}</h2>{channel.url?<a className="text-link" href={channel.url}>{channel.label}</a>:<p>{channel.setup}</p>}</section>)}</aside>
  </div>
</>}
