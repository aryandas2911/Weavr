'use client';
import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';

export function Motion(){
  const pathname=usePathname();
  const traveler=useRef<HTMLImageElement>(null);
  const progress=useRef<HTMLElement>(null);
  useEffect(()=>{
    const image=traveler.current;
    const bar=progress.current;
    const header=document.querySelector<HTMLElement>('[data-header]');
    const media=matchMedia('(prefers-reduced-motion: no-preference)');
    let frame=0;
    const update=()=>{
      frame=0;
      const scroll=window.scrollY, height=innerHeight, width=innerWidth;
      const max=Math.max(1,document.documentElement.scrollHeight-height);
      if(bar)bar.style.transform=`scaleX(${Math.min(1,scroll/max)})`;
      header?.classList.toggle('is-scrolled',scroll>24);
      if(!image||!media.matches)return;
      const stops=[...document.querySelectorAll<HTMLElement>('[data-logo-stop]')];
      const finalRect=stops.at(-1)?.getBoundingClientRect();
      const end=finalRect?Math.max(1,finalRect.top+scroll+finalRect.height/2-height/2):max;
      if(finalRect&&scroll>=end){
        image.style.opacity='1';
        image.style.width=`${finalRect.width*.68}px`;
        image.style.transform=`translate3d(${finalRect.left+finalRect.width/2-width/2}px,0,0) translate(-50%,-50%)`;
        return;
      }
      const t=Math.min(scroll,end)/end;
      let x=width/2+Math.sin(t*Math.PI*4)*width*.28;
      let y=height/2+Math.cos(t*Math.PI*3)*height*.22;
      let rotation=t*720, opacity=.18, size=Math.min(width*.24,200);
      for(const stop of stops){
        const rect=stop.getBoundingClientRect();
        const distance=height/2-rect.top-rect.height/2;
        const weight=Math.exp(-Math.pow(distance/(height*.38),2));
        if(weight<.02)continue;
        x=x*(1-weight)+(rect.left+rect.width/2)*weight;
        y=y*(1-weight)+(rect.top+rect.height/2)*weight;
        rotation*=1-weight;
        opacity=Math.max(opacity,.18+.82*weight);
        size=size*(1-weight)+rect.width*(stop.classList.contains('hero-art-mark')?1:.68)*weight;
      }
      image.style.opacity=String(opacity);
      image.style.width=`${size}px`;
      image.style.transform=`translate3d(${x-width/2}px,${y-height/2}px,0) translate(-50%,-50%) rotate(${rotation}deg)`;
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    schedule();
    let disposed=false, cleanup=()=>{};
    async function animate(){
      if(!media.matches)return;
      const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);
      if(disposed||!media.matches)return;
      gsap.registerPlugin(ScrollTrigger);
      document.documentElement.classList.add('motion');
      const context=gsap.context(()=>{
        gsap.from('.hero-line',{yPercent:65,opacity:0,duration:.85,stagger:.1,ease:'power3.out'});
        gsap.from('[data-split]',{y:22,opacity:0,duration:.75,ease:'power2.out'});
        const story=document.querySelector<HTMLElement>('[data-story]');
        if(story){
          const panels=gsap.utils.toArray<HTMLElement>('.story-panel',story);
          const threads=gsap.utils.toArray<HTMLElement>('.story-thread',story);
          const marks=gsap.utils.toArray<HTMLElement>('.story-count span',story);
          const mark=story.querySelector<HTMLElement>('.story-mark');
          const timeline=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:story,start:'top top',end:'bottom bottom',scrub:.7,invalidateOnRefresh:true}});
          timeline
            .to(panels[0],{autoAlpha:0,yPercent:-18,duration:1})
            .to(threads[0],{xPercent:22,yPercent:-30,rotation:28,duration:1},0)
            .to(threads[1],{xPercent:-17,yPercent:20,rotation:-24,duration:1},0)
            .to(threads[2],{xPercent:14,yPercent:29,rotation:18,duration:1},0)
            .to(mark,{rotation:135,scale:1.08,duration:1},0)
            .to(panels[1],{autoAlpha:1,yPercent:0,duration:.8},.72)
            .to(marks[0],{color:'rgba(252,230,224,.45)',duration:.2},.72)
            .to(marks[1],{color:'#fce6e0',duration:.2},.72)
            .to(panels[1],{autoAlpha:0,yPercent:-18,duration:1},1.85)
            .to(threads[0],{xPercent:-15,yPercent:42,rotation:64,duration:1},1.85)
            .to(threads[1],{xPercent:24,yPercent:-32,rotation:-58,duration:1},1.85)
            .to(threads[2],{xPercent:-21,yPercent:-16,rotation:42,duration:1},1.85)
            .to(mark,{rotation:360,scale:1,duration:1},1.85)
            .to(panels[2],{autoAlpha:1,yPercent:0,duration:.8},2.55)
            .to(marks[1],{color:'rgba(252,230,224,.45)',duration:.2},2.55)
            .to(marks[2],{color:'#fce6e0',duration:.2},2.55);
        }
      });
      cleanup=()=>{context.revert();document.documentElement.classList.remove('motion')};
    }
    const preference=()=>{cleanup();cleanup=()=>{};schedule();void animate()};
    media.addEventListener('change',preference);
    void animate();
    return ()=>{disposed=true;cleanup();media.removeEventListener('change',preference);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);cancelAnimationFrame(frame)};
  },[pathname]);
  return <><div className="scroll-progress" aria-hidden="true"><i ref={progress}/></div>{pathname==='/'?<img ref={traveler} className="scrolling-logo" src="/Logo.png" alt="" width="641" height="456" aria-hidden="true"/>:null}</>;
}
