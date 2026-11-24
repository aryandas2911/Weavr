'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef} from 'react';
import {navigation,contact} from '../content';

const Arrow=({className='arrow'}:{className?:string})=><svg className={className} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 13 13 3M5.5 3H13v7.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export function Wordmark({large=false}:{large?:boolean}){return <Link className={`wordmark${large?' wordmark-large':''}`} href="/" aria-label="WEAVR home"><img src="/Logo.png" alt="" width="641" height="456" fetchPriority="high"/><span className="wordmark-type">WEAVR<span>.</span></span></Link>}
export function BrandMark(){return <img src="/Logo.png" alt="WEAVR" width="641" height="456"/>}
export function BookingLink({className='button',label='Start a project'}:{className?:string;label?:string}){
  return <Link className={className} href={contact.booking || '/contact/#booking'} data-magnetic>{label}<Arrow/></Link>;
}

export function Header(){
  const pathname=usePathname();
  const menu=useRef<HTMLDialogElement>(null);
  useEffect(()=>{menu.current?.close()},[pathname]);
  const closeMenu=()=>{if(menu.current?.open)menu.current.close()};
  const active=(href:string)=>pathname.replace(/\/$/,'')===href.replace(/\/$/,'');
  const makeLinks=()=>navigation.map(([name,href])=><Link key={href} href={href} aria-current={active(href)?'page':undefined} onClick={closeMenu}>{name}</Link>);
  return <header className="top" data-header><div className="shell top-inner"><Wordmark/><nav className="desktop-nav" aria-label="Main navigation">{makeLinks()}</nav><div className="desktop-book"><BookingLink/></div><button type="button" className="menu-open" aria-haspopup="dialog" aria-controls="mobile-menu" onClick={()=>menu.current?.showModal()} aria-label="Open menu"><span aria-hidden="true"/><span aria-hidden="true"/></button><dialog ref={menu} id="mobile-menu" aria-label="Main navigation"><div className="dialog-head"><span className="wordmark-type">WEAVR<span>.</span></span><button type="button" className="menu-close" onClick={()=>menu.current?.close()} autoFocus aria-label="Close menu"><span aria-hidden="true"/><span aria-hidden="true"/></button></div><nav aria-label="Mobile navigation">{makeLinks()}</nav><Link className="button" href={contact.booking || '/contact/#booking'} onClick={closeMenu}>Start a project<Arrow/></Link></dialog></div></header>
}
export function Footer(){
  const pathname=usePathname();
  if(pathname==='/')return null;
  return <footer className="footer-wrap"><div className="shell footer"><Wordmark/><nav aria-label="Footer navigation">{navigation.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</nav><small>Independent creative studio</small></div></footer>;
}
