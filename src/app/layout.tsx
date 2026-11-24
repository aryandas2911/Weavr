import type {Metadata} from 'next';
import '@fontsource/manjari/latin-400.css';
import '@fontsource/manjari/latin-700.css';
import './styles.css';
import './revamp.css';
import {Header,Footer} from '../components/navigation';
import {Motion} from '../components/motion';
import {siteOrigin} from '../content';
export const metadata:Metadata={
  title:{default:'WEAVR | Independent Creative Development Studio',template:'%s | WEAVR'},
  description:'WEAVR designs and builds distinctive websites and web applications for ambitious brands.',
  metadataBase:siteOrigin?new URL(siteOrigin):undefined,
  openGraph:{siteName:'WEAVR',type:'website',locale:'en_US'},
  icons:{icon:'/Logo.png'},
  other:{'page-type':'service','site-kind':'other'},
};
export default function Layout({children}:{children:React.ReactNode}){
  const organization=JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'WEAVR',url:siteOrigin || undefined});
  return <html lang="en" data-type="service" data-radius="soft" data-buttons="solid" data-motion="quiet"><body><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><Motion/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:organization.replace(/</g,'\\u003c')}}/></body></html>
}
