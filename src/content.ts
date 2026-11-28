export const navigation = [
  ['Home','/'], ['Services','/services/'], ['About','/about/'], ['Process','/process/'], ['Contact','/contact/'],
] as const;

export const services = [
  {
    id: "websites",
    name: "Website Development",
    title: "A site that earns the visit.",
    detail: "Build credibility and turn online visitors into customers with a fast, responsive website tailored to your business.",
    includes: "Custom design, development, CMS, on-page SEO",
    fit: "Businesses building their online presence",
    deliver: "A tested site, editable content, handover.",
  },
  {
    id: "landing-pages",
    name: "Landing Pages",
    title: "One page. One clear action.",
    detail: "Turn campaign traffic into enquiries, sign-ups and sales with conversion-focused landing pages.",
    includes: "Responsive design, strategic CTAs, lead forms, analytics integration",
    fit: "Marketing campaigns and product launches",
    deliver: "A responsive page, event plan, test notes.",
  },
  {
    id: "web-apps",
    name: "Custom Web Applications",
    title: "Complex work, made simple.",
    detail: "Simplify operations with scalable web applications built around your business requirements.",
    includes: "Dashboards, portals, databases, API integrations",
    fit: "Businesses with unique operational needs",
    deliver: "A tested app, component library, handover.",
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    title: "Every screen with a job.",
    detail: "Make your digital products easier to navigate, more engaging and more intuitive for your customers.",
    includes: "User research, wireframes, prototypes, design systems",
    fit: "New and existing digital products",
    deliver: "Prototypes, responsive screens, specs.",
  },
  {
    id: "redesign",
    name: "Website Redesign",
    title: "Keep the good. Fix the friction.",
    detail: "Transform your existing website into a modern, high-performing experience that supports your business goals.",
    includes: "UX audit, visual redesign, performance optimization",
    fit: "Businesses with outdated or underperforming websites",
    deliver: "A replacement site, content plan, redirects.",
  },
  {
    id: "automation",
    name: "AI & Workflow Automation",
    title: "Make more time for meaningful work.",
    detail: "Reduce repetitive work and free up your team's time through intelligent, automated workflows.",
    includes: "AI agents, workflow automation, third-party integrations",
    fit: "Teams looking to improve operational efficiency",
    deliver: "Tested workflows and a handover guide.",
  },
  {
    id: "custom-ai-ml",
    name: "Custom AI/ML Solutions",
    title: "Put your data to work.",
    detail: "Put your business data to work with intelligent applications designed around your specific challenges.",
    includes: "AI assistants, ML models, knowledge systems, custom integrations",
    fit: "Businesses seeking tailored AI capabilities",
    deliver: "A tested solution and guidance for your team.",
  },
];

export function enquiryHref(serviceId?: string) {
  return serviceId ? `/contact/?service=${encodeURIComponent(serviceId)}#inquiry` : '/contact/#inquiry';
}

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
