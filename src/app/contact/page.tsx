import {PageIntro,pageMetadata} from '../../components/editorial';
export const metadata=pageMetadata('Contact','Talk to Weavr about a website, SEO improvement, workflow or custom application for your business.','/contact/');
export default function Contact(){return <>
  <PageIntro label="Contact" title="Tell us what your business needs."><p>Share your goals, budget and timeline. We?ll suggest a practical next step.</p></PageIntro>
  <section className="shell team-contact" id="booking" aria-label="WEAVR team contacts">
    <article><h2>Aryan Das</h2><dl><div><dt>Email</dt><dd><a href="mailto:aryandas2911@gmail.com">aryandas2911@gmail.com</a></dd></div><div><dt>Phone</dt><dd><a href="tel:+917303025751">+91 73030 25751</a></dd></div></dl></article>
    <article><h2>Sandra Rosa Prince</h2><dl><div><dt>Email</dt><dd><a href="mailto:sandrarosaprince@gmail.com">sandrarosaprince@gmail.com</a></dd></div><div><dt>Phone</dt><dd><a href="tel:+918130225400">+91 81302 25400</a></dd></div></dl></article>
  </section>
</>}
