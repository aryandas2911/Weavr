export const navigation = [
  ['Home','/'], ['Services','/services/'], ['About','/about/'], ['Process','/process/'], ['Contact','/contact/'],
] as const;

export const services = [
  {id:'websites', name:'Website Design', title:'A site that earns the visit.', detail:'A clear, mobile friendly site designed around your customers, services and budget.', includes:'Strategy, design, responsive build, CMS.', fit:'Local businesses, growing teams and service providers.', deliver:'A tested site, editable content, handover.'},
  {id:'landing-pages', name:'Landing Pages', title:'One page. One clear action.', detail:'A focused destination built around a single, unmistakable next step.', includes:'Message, design, build, conversion tracking.', fit:'Launches, waitlists and paid campaigns.', deliver:'A responsive page, event plan, test notes.'},
  {id:'web-apps', name:'Web Applications', title:'Complex work, made simple.', detail:'We build practical browser tools that reduce repetitive work and fit your existing workflow.', includes:'Workflow mapping, prototyping, frontend build.', fit:'Portals, internal tools and products.', deliver:'A tested app, component library, handover.'},
  {id:'ui-ux', name:'UI/UX Design', title:'Every screen with a job.', detail:'We map the journey, then refine every screen around it.', includes:'Architecture, wireframes, interaction, accessibility.', fit:'Early products and teams sharpening an interface.', deliver:'Prototypes, responsive screens, specs.'},
  {id:'redesign', name:'Website Redesign', title:'Keep the good. Fix the friction.', detail:'An audit-led rebuild of what works and what gets in the way.', includes:'Audit, visual redesign, migration planning.', fit:'Outdated sites and confusing navigation.', deliver:'A replacement site, content plan, redirects.'},
  {id:'performance', name:'SEO & Performance', title:'Fast. Findable. Dependable.', detail:'Technical fixes for pages that should load quickly and rank well.', includes:'Core Web Vitals, metadata, crawlability, assets.', fit:'Slow sites, migrations and launch prep.', deliver:'A prioritized audit and agreed fixes.'},
  {id:'branding', name:'Branding', title:'Look like yourself, everywhere.', detail:'A visual system that carries from your site to everywhere else.', includes:'Direction, type, color, wordmark, guidelines.', fit:'New ventures and refreshed identities.', deliver:'Identity assets and a practical style guide.'},
];

export const steps = [
  {name:'Discover', description:'How the business works, who it serves, what’s missing.', outcome:'A shared brief.'},
  {name:'Define', description:'Scope, priorities and direction agreed before design.', outcome:'A clear roadmap.'},
  {name:'Design', description:'Visual direction and a responsive prototype tested in context.', outcome:'An approved direction.'},
  {name:'Develop', description:'The approved experience, built and connected.', outcome:'A working build.'},
  {name:'Test & Launch', description:'Accessibility, speed and function checked, then shipped.', outcome:'A live site and handover.'},
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
