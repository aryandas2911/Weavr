'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {useRef} from 'react';
export function Motion(){
  const pathname=usePathname();
  const traveler=useRef<HTMLImageElement>(null);
  useEffect(()=>{
    const image=traveler.current;
    if(pathname!=='/'){
      if(image)image.style.display='none';
      return;
    }
    if(image)image.style.display='';
    let frame=0;
    const updateTraveler=()=>{
      frame=0;
      if(!image)return;
      const scroll=window.scrollY;
      const endMarker=document.querySelector<HTMLElement>('.closing-logo-stop');
      const endRect=endMarker?.getBoundingClientRect();
      const endScroll=endRect?Math.max(0,endRect.top+scroll-innerHeight*.5):Math.max(1,document.documentElement.scrollHeight-innerHeight);
      const progress=Math.min(scroll, endScroll)/Math.max(1,endScroll);
      const width=innerWidth;
      const height=innerHeight;
      let x=width/2+Math.sin(progress*Math.PI*5)*width*.3;
      let y=height/2+Math.cos(progress*Math.PI*4)*height*.28;
      let rotation=progress*1080+Math.sin(progress*Math.PI*6)*28;
      let opacity=.2;
      let size=Math.min(width*.3,220);
      const targets=[...document.querySelectorAll<HTMLElement>('.logo-hero,[data-logo-stop]')];
      for(const target of targets){
        const rect=target.getBoundingClientRect();
        const targetDocY=rect.top+scroll+rect.height/2;
        const distance=scroll+height*.5-targetDocY;
        const weight=Math.exp(-Math.pow(distance/(height*.42),2));
        if(weight>.02){
          x=x*(1-weight)+(rect.left+rect.width/2)*weight;
          y=y*(1-weight)+(rect.top+rect.height/2)*weight;
          rotation*=1-weight;
          opacity=Math.max(opacity,.2+.8*weight);
          size=size*(1-weight)+rect.width*.68*weight;
        }
      }
      image.style.opacity=String(opacity);
      image.style.width=`${size}px`;
      image.style.transform=`translate3d(${x-width/2}px,${y-height/2}px,0) translate(-50%,-50%) rotate(${rotation}deg)`;
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(updateTraveler)};
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    updateTraveler();
    let dispose=()=>{};
    let cancelled=false;
    const media=matchMedia('(prefers-reduced-motion: no-preference)');
    async function start(){
      if(!media.matches)return;
      const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);
      if(cancelled || !media.matches)return;
      gsap.registerPlugin(ScrollTrigger);
      const context=gsap.context(()=>{
        gsap.from('.hero-line',{yPercent:105,duration:.85,stagger:.12,ease:'power3.out',clearProps:'transform'});
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element=>{
          if(element.getBoundingClientRect().top<innerHeight*.8)return;
          gsap.from(element,{y:28,opacity:.45,duration:.75,ease:'power2.out',clearProps:'transform,opacity',scrollTrigger:{trigger:element,start:'top 90%',once:true}});
        });
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element,index)=>gsap.to(element,{yPercent:index%2?9:-7,rotation:index%2?2:-2,ease:'none',scrollTrigger:{trigger:element.parentElement,start:'top bottom',end:'bottom top',scrub:2}}));
        gsap.utils.toArray<HTMLElement>('.service-item').forEach((element,index)=>gsap.from(element,{x:index%2?24:-24,opacity:.25,duration:.7,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 92%',once:true}}));
      });
      ScrollTrigger.refresh();
      dispose=()=>{context.revert();ScrollTrigger.getAll().forEach(trigger=>trigger.kill())};
    }
    function preference(){dispose();void start()}
    media.addEventListener('change',preference);
    void start();
    return ()=>{cancelled=true;media.removeEventListener('change',preference);dispose();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(frame)};
  },[pathname]);
  return pathname==='/'?<img ref={traveler} className="scrolling-logo" src="/Logo.png" alt="" aria-hidden="true"/>:null;
}
