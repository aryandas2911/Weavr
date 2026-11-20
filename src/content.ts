export const navigation = [
  ['Home','/'], ['Services','/services/'], ['About','/about/'], ['Process','/process/'], ['Contact','/contact/'],
] as const;

export const services = [
  {id:'websites', name:'Website Design & Development', title:'Make the first visit count.', detail:'A responsive website that makes your offer clear, gives your brand a distinct voice, and helps visitors find their next step.', includes:'Site architecture, custom visual design, responsive development and CMS setup.', fit:'New brands, established businesses and agency partnerships.', deliver:'A tested website, editable content and a handover guide.'},
  {id:'landing-pages', name:'Landing Pages', title:'One page. One clear action.', detail:'Give a campaign or product launch a focused destination with a message people can act on.', includes:'Message hierarchy, page design, build and conversion tracking setup.', fit:'Product launches, waitlists and paid campaigns.', deliver:'A responsive landing page, event plan and testing notes.'},
  {id:'web-apps', name:'Web Applications', title:'Make complex work feel simple.', detail:'We turn repeated tasks and complicated workflows into clear, dependable browser experiences.', includes:'Workflow mapping, prototyping and frontend development with scoped integrations.', fit:'Customer portals, internal tools and interactive products.', deliver:'A tested application, component library and technical handover.'},
  {id:'ui-ux', name:'UI/UX Design', title:'Give every screen a job.', detail:'We design how people move through a product, then refine the interface around those decisions.', includes:'Information architecture, wireframes, interaction design and accessibility review.', fit:'Early products, feature launches and teams refining an existing interface.', deliver:'Interactive prototypes, responsive screens and component specifications.'},
  {id:'redesign', name:'Website Redesign', title:'Keep what works. Fix what gets in the way.', detail:'Review the current site, identify where visitors struggle, and rebuild the parts that matter.', includes:'Content and usability audit, visual redesign and migration planning.', fit:'Outdated sites, changed business offerings and confusing navigation.', deliver:'A replacement site, content plan and redirects where needed.'},
  {id:'performance', name:'SEO & Performance Optimization', title:'Make the site easier to find and use.', detail:'Fix the technical issues that slow pages down or make them harder to discover.', includes:'Core Web Vitals review, structured metadata, crawlability and asset optimization.', fit:'Slow sites, migrations and teams preparing for launch.', deliver:'A prioritized audit, agreed fixes and a follow-up measurement plan.'},
  {id:'branding', name:'Branding & Visual Identity', title:'Look like yourself everywhere.', detail:'Build a visual identity that carries from a homepage to the rest of your digital presence.', includes:'Creative direction, typography, color, wordmark and visual guidelines.', fit:'New ventures, launches and businesses updating their identity.', deliver:'Identity assets, digital examples and a practical style guide.'},
];

export const steps = [
  {name:'Discover', description:'We learn how your business works, who you need to reach, and where the current experience falls short.', outcome:'A shared brief with goals, audiences and open questions.'},
  {name:'Define', description:'We agree on scope, priorities, deliverables and the creative direction before we start designing.', outcome:'A project roadmap and a structure for the site or application.'},
  {name:'Design', description:'We explore visual directions, prototype the experience and resolve what happens on screens of different sizes.', outcome:'An approved visual direction and responsive prototype.'},
  {name:'Develop', description:'We build the approved experience, connect agreed integrations and give your team a working preview for feedback.', outcome:'A working build with editable content where needed.'},
  {name:'Test & Launch', description:'We review accessibility, responsiveness, performance and functionality, then help with deployment and handover.', outcome:'A live site and a handover guide. Post-launch support can be scoped separately.'},
];

function httpsUrl(value?: string) {
  try { const url = new URL(value ?? ''); return url.protocol === 'https:' ? url.href : ''; }
  catch { return ''; }
}
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? '';
const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? '';
export const contact = {
  booking: httpsUrl(process.env.NEXT_PUBLIC_BOOKING_URL),
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '',
  whatsapp: /^\+?[1-9]\d{6,14}$/.test(phone) ? 'https://wa.me/' + phone.replace('+','') : '',
};
export const siteOrigin = httpsUrl(process.env.NEXT_PUBLIC_SITE_URL);
