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
      const [{gsap},{ScrollTrigger},{default:Lenis}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger'),import('lenis')]);
      if(cancelled || !media.matches)return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis=new Lenis({anchors:true,smoothWheel:true});
      const tick=(time:number)=>lenis.raf(time*1000);
      gsap.ticker.add(tick);
      lenis.on('scroll',ScrollTrigger.update);
      const context=gsap.context(()=>{
        gsap.from('.hero-line',{yPercent:105,duration:.85,stagger:.12,ease:'power3.out',clearProps:'transform'});
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element=>{
          if(element.getBoundingClientRect().top<innerHeight*.8)return;
          gsap.from(element,{y:28,opacity:.45,duration:.75,ease:'power2.out',clearProps:'transform,opacity',scrollTrigger:{trigger:element,start:'top 90%',once:true}});
        });
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(element=>gsap.to(element,{yPercent:8,ease:'none',scrollTrigger:{trigger:element.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
      });
      dispose=()=>{context.revert();gsap.ticker.remove(tick);lenis.destroy()};
    }
    function preference(){dispose();void start()}
    media.addEventListener('change',preference);
    void start();
    return ()=>{cancelled=true;media.removeEventListener('change',preference);dispose()};
  },[pathname]);
  return null;
}
