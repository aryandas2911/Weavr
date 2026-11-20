'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef} from 'react';
import {navigation,contact} from '../content';

export function Wordmark(){return <Link className="wordmark" href="/" aria-label="WEAVR home"><img src="/Logo.png" alt="" width="641" height="456" fetchPriority="high"/><span className="wordmark-type">WEAVR<span>.</span></span></Link>}
export function BrandMark(){return <img src="/Logo.png" alt="WEAVR" width="641" height="456"/>}
export function BookingLink({className='button'}:{className?:string}){return <Link className={className} href={contact.booking || '/contact/#booking'}>Book a discovery call</Link>}

export function Header(){
  const pathname=usePathname();
  const menu=useRef<HTMLDialogElement>(null);
  useEffect(()=>{menu.current?.close()},[pathname]);
  const closeMenu=()=>{if(menu.current?.open)menu.current.close()};
  const makeLinks=()=>navigation.map(([name,href])=><Link key={href} href={href} aria-current={pathname.replace(/\/$/,'')===href.replace(/\/$/,'')?'page':undefined} onClick={closeMenu}>{name}</Link>);
  return <header className="top"><div className="shell top-inner"><Wordmark/><nav className="desktop-nav" aria-label="Main navigation">{makeLinks()}</nav><div className="desktop-book"><BookingLink/></div><button type="button" className="button menu-open" aria-haspopup="dialog" aria-controls="mobile-menu" onClick={()=>menu.current?.showModal()}>Menu <span aria-hidden="true">+</span></button><dialog ref={menu} id="mobile-menu" aria-label="Main navigation"><button type="button" className="button" onClick={()=>menu.current?.close()} autoFocus>Close</button><nav aria-label="Mobile navigation">{makeLinks()}</nav><Link className="button" href={contact.booking || '/contact/#booking'} onClick={()=>menu.current?.close()}>Book a discovery call</Link></dialog></div></header>
}
export function Footer(){return <footer><div className="shell footer"><Wordmark/><nav aria-label="Footer navigation">{navigation.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</nav><small>Independent creative development studio</small></div></footer>}
