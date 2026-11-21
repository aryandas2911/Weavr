'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
export function Motion(){
  const pathname=usePathname();
  useEffect(()=>{
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
    return ()=>{cancelled=true;media.removeEventListener('change',preference);dispose()};
  },[pathname]);
  return null;
}
