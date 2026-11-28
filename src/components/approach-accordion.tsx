'use client';

import {useId, useRef, useState} from 'react';
import Link from 'next/link';
import {Eyebrow} from './editorial';
import GradientBlinds from './GradientBlinds';
import './approach-accordion.css';

const stages = [
  {
    label: '01 / DISCOVER',
    heading: 'Understand your business.',
    description: 'We get to know your goals, customers and challenges to define what your business really needs.',
    colors: ['#0a4076', '#98cef3', '#c9b6df', '#f9bfb8'],
  },
  {
    label: '02 / DESIGN & BUILD',
    heading: 'Create with purpose.',
    description: 'We turn your requirements into intuitive websites, custom applications and intelligent solutions tailored to your business.',
    colors: ['#173f76', '#a0baf0', '#bfa4dd', '#fbd0bd'],
  },
  {
    label: '03 / LAUNCH & GROW',
    heading: 'Deliver lasting value.',
    description: 'We test, refine and launch your solution, with performance, reliability and future growth in mind.',
    colors: ['#124970', '#9dd4ec', '#d3bfe7', '#f7c0c5'],
  },
];

export function ApproachAccordion() {
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState({index: 0, open: true});

  const toggleStage = (index: number) => {
    setStage(current => ({index, open: current.index !== index || !current.open}));
  };

  return (
    <section ref={sectionRef} className="band approach-stages" aria-labelledby={`${id}-title`}>
      <div className="shell approach-stages__layout">
        <div className="approach-stages__content" data-reveal>
          <Eyebrow>Our approach</Eyebrow>
          <h2 id={`${id}-title`}>From idea to impact.</h2>
          <div className="approach-stages__list">
            {stages.map(({label, heading, description}, index) => {
              const buttonId = `${id}-stage-${index}`;
              const panelId = `${buttonId}-description`;
              const expanded = stage.open && index === stage.index;

              return (
                <div className="approach-stages__item" key={label}>
                  <h3>
                    <button
                      className="approach-stages__trigger"
                      type="button"
                      id={buttonId}
                      aria-controls={panelId}
                      aria-expanded={expanded}
                      onClick={() => toggleStage(index)}
                    >
                      <span>
                        <span className="approach-stages__label">{label}</span>
                        <span className="approach-stages__heading">{heading}</span>
                      </span>
                      <span className="approach-stages__indicator" aria-hidden="true"/>
                    </button>
                  </h3>
                  <div
                    className="approach-stages__panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!expanded}
                    data-expanded={expanded}
                  >
                    <div className="approach-stages__panel-inner"><p>{description}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link className="button approach-stages__cta" href="/contact/#booking">Let's Build Something Together</Link>
        </div>
      </div>
      <div className="approach-stages__visual" aria-hidden="true">
        <div className="approach-stages__fallback">
          {stages.map(({label, colors}, index) => (
            <span
              key={label}
              data-active={index === stage.index}
              style={{backgroundImage: `linear-gradient(125deg, ${colors.join(', ')})`}}
            />
          ))}
        </div>
        <GradientBlinds
          interactionRef={sectionRef}
          gradientColors={stages[stage.index].colors}
          angle={8}
          dpr={1.15}
          noise={0}
          blindCount={32}
          blindMinWidth={30}
          spotlightOpacity={0.34}
          spotlightRadius={0.66}
          pointerGlow={0.95}
          lightColor="#ffe9e2"
          hoverTilt={0.65}
          sway={0.22}
          speed={0.65}
          clickEffect="ripple"
          intro={false}
          mixBlendMode="normal"
        />
      </div>
    </section>
  );
}
