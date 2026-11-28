'use client';
import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';

const storyLayout = '(min-width: 681px) and (min-height: 560px)';
const revealSelector = [
  '[data-reveal]', '[data-stagger] > *',
  '.ticker-track > *', '.studio-grid > *', '.section-head',
  '.steps-preview > *', '.page-intro > *', '.about-grid > *',
  '.editorial-grid > :first-child', '.editorial-grid .principles > *',
  '.service-detail > dl', '.process-grid aside > nav', '.team-contact > article',
  '.closing-copy', '.footer > *',
].join(', ');

const parallaxLayerSelector = [
  '.ticker-track', '.section-head', '.approach-art', '.why-head', '.closing-copy',
  '.page-intro > h1', '.about-grid .hero-art-glow', '.editorial-grid > :first-child',
  '.service-detail > dl', '.process-logo', '.team-contact > article:last-child',
  '.footer > small',
].join(', ');

export function Motion(){
  const pathname=usePathname();
  const progress=useRef<HTMLElement>(null);
  useEffect(()=>{
    const bar=progress.current;
    const media=matchMedia('(prefers-reduced-motion: no-preference)');
    let frame=0;
    const update=()=>{
      frame=0;
      const scroll=window.scrollY, height=innerHeight;
      const max=Math.max(1,document.documentElement.scrollHeight-height);
      if(bar)bar.style.transform=`scaleX(${Math.min(1,scroll/max)})`;
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    schedule();
    let disposed=false, cleanup=()=>{}, animationRun=0;
    async function animate(){
      const run = ++animationRun;
      if(!media.matches)return;
      const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);
      if(disposed||run!==animationRun||!media.matches)return;
      gsap.registerPlugin(ScrollTrigger);
      document.documentElement.classList.add('motion');
      const layouts = gsap.matchMedia();
      const context=gsap.context(()=>{
        const driftLayers = new Set<HTMLElement>();
        const drift = (section: HTMLElement, layer: HTMLElement, distance: number) => {
          driftLayers.add(layer);
          layer.setAttribute('data-scroll-drift', '');
          gsap.fromTo(layer, {'--scroll-drift-y': `${-distance}px`}, {
            '--scroll-drift-y': `${distance}px`,
            ease: 'none',
            scrollTrigger: {trigger: section, start: 'top bottom', end: 'bottom top', scrub: .7},
          });
        };

        const hero = document.querySelector<HTMLElement>('.hero');
        if (hero && hero.getBoundingClientRect().bottom > 0) {
          gsap.from(hero.querySelectorAll('.hero-line, .hero-tagline, .actions'), {
            y: 28, opacity: 0, duration: 1.35, stagger: .16, ease: 'power2.out', clearProps: 'opacity,transform',
          });
        }

        const reveal = (elements: Iterable<HTMLElement>) => {
          for (const target of elements) {
            if (target.getBoundingClientRect().top < innerHeight * .92) continue;
            gsap.from(target, {
              y: 24, opacity: .12, duration: 1.15, ease: 'power2.out', clearProps: 'opacity,transform',
              scrollTrigger: {trigger: target, start: 'clamp(top 92%)', once: true},
            });
          }
        };
        reveal(document.querySelectorAll<HTMLElement>(revealSelector));

        if (hero) {
          gsap.to('.hero-visual', {
            y: () => Math.min(hero.offsetHeight * .12, 92),
            ease: 'none',
            scrollTrigger: {trigger: hero, start: 'top top', end: 'bottom top', scrub: .7, invalidateOnRefresh: true},
          });
          const floats = hero.querySelector<HTMLElement>('.hero-floats');
          if (floats) drift(hero, floats, 22);
        }
        const studio = document.querySelector<HTMLElement>('.studio-band');
        if (studio) {
          gsap.fromTo(studio, {'--studio-parallax': '-36px'}, {
            '--studio-parallax': '36px', ease: 'none',
            scrollTrigger: {trigger: studio, start: 'top bottom', end: 'bottom top', scrub: .7},
          });
          const studioHead = studio.querySelector<HTMLElement>('.studio-head');
          if (studioHead) drift(studio, studioHead, 18);
        }
        const sections = document.querySelectorAll<HTMLElement>(
          'main section:not(.hero, .studio-band, [data-story]), main > .ticker, .footer-wrap',
        );
        for (const section of sections) {
          const layer = section.querySelector<HTMLElement>(parallaxLayerSelector);
          if (!layer) continue;
          const distance = section.classList.contains('ticker') ? 5 : 20;
          drift(section, layer, distance);
        }

        const story=document.querySelector<HTMLElement>('[data-story]');
        if(story){
          layouts.add({pinned: storyLayout, all: 'all'}, ({conditions}) => {
            const panels=gsap.utils.toArray<HTMLElement>('.story-panel',story);
            if (!conditions?.pinned) {
              reveal(story.querySelectorAll<HTMLElement>('.story-mark, .story-panel'));
              const thread = story.querySelector<HTMLElement>('.story-thread');
              if (thread) {
                gsap.fromTo(thread, {y: -18}, {
                  y: 18, ease: 'none',
                  scrollTrigger: {trigger: story, start: 'top bottom', end: 'bottom top', scrub: .7},
                });
              }
              return;
            }
            const threads=gsap.utils.toArray<HTMLElement>('.story-thread',story);
            const marks=gsap.utils.toArray<HTMLElement>('.story-count span',story);
            const mark=story.querySelector<HTMLElement>('.story-mark');
            const timeline=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:story,start:'top top',end:'bottom bottom',scrub:.75,invalidateOnRefresh:true}});
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
          });
        }
        return () => {
          for (const layer of driftLayers) layer.removeAttribute('data-scroll-drift');
        };
      });
      cleanup=()=>{layouts.revert();context.revert();document.documentElement.classList.remove('motion')};
    }
    const preference=()=>{cleanup();cleanup=()=>{};schedule();void animate()};
    media.addEventListener('change',preference);
    void animate();
    return ()=>{disposed=true;cleanup();media.removeEventListener('change',preference);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);cancelAnimationFrame(frame)};
  },[pathname]);
  return <div className="scroll-progress" aria-hidden="true"><i ref={progress}/></div>;
}
