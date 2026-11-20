'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef} from 'react';
import {navigation,contact} from '../content';

export function Wordmark(){return <Link className="wordmark" href="/" aria-label="WEAVR home"><BrandMark/>WEAVR<span>.</span></Link>}
export function BrandMark(){return <svg aria-hidden="true" width="31" height="30" viewBox="0 0 32 30" fill="none"><path d="M2 6 9 24l7-17 7 17 7-18M7 5l6 15m6-9 6 14" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}
export function BookingLink({className='button'}:{className?:string}){return <Link className={className} href={contact.booking || '/contact/#booking'}>Book a discovery call</Link>}

export function Header(){
  const pathname=usePathname();
  const menu=useRef<HTMLDialogElement>(null);
  useEffect(()=>{menu.current?.close()},[pathname]);
  const links=navigation.map(([name,href])=><Link key={href} href={href} aria-current={pathname.replace(/\/$/,'')===href.replace(/\/$/,'')?'page':undefined} onClick={()=>menu.current?.close()}>{name}</Link>);
  return <header className="top"><div className="shell top-inner"><Wordmark/><nav className="desktop-nav" aria-label="Main navigation">{links}</nav><div className="desktop-book"><BookingLink/></div><button className="button menu-open" aria-haspopup="dialog" aria-controls="mobile-menu" onClick={()=>menu.current?.showModal()}>Menu</button><dialog ref={menu} id="mobile-menu" aria-label="Main navigation"><button className="button" onClick={()=>menu.current?.close()} autoFocus>Close</button><nav aria-label="Mobile navigation">{links}</nav><Link className="button" href={contact.booking || '/contact/#booking'} onClick={()=>menu.current?.close()}>Book a discovery call</Link></dialog></div></header>
}
export function Footer(){return <footer><div className="shell footer"><Wordmark/><nav aria-label="Footer navigation">{navigation.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</nav><small>Independent creative development studio</small></div></footer>}
