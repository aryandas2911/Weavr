import type {Metadata} from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/space-grotesk';
import './styles.css';
import {Header,Footer} from '../components/navigation';
import {Motion} from '../components/motion';
import {siteOrigin} from '../content';
export const metadata:Metadata={
  title:{default:'WEAVR | Independent Creative Development Studio',template:'%s | WEAVR'},
  description:'WEAVR designs and builds distinctive websites and web applications for ambitious brands.',
  metadataBase:siteOrigin?new URL(siteOrigin):undefined,
  openGraph:{siteName:'WEAVR',type:'website',locale:'en_US'},
  icons:{icon:'/mark.svg'},
};
export default function Layout({children}:{children:React.ReactNode}){
  const organization=JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'WEAVR',url:siteOrigin || undefined});
  return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><Motion/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:organization.replace(/</g,'\\u003c')}}/></body></html>
}
