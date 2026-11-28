'use client';

import Link from 'next/link';
import {contact} from '../content';
import StarBorder from './StarBorder';

const starBorderAnimation = {
  theme: 'light',
  radius: 999,
  color: '#a16bd1',
  trailColor: '#8660b4',
  thickness: 2.15,
  duration: 4.8,
  trailLength: 0.36,
  glow: 0.78,
  sparkle: true,
  hover: 'brighten',
  clickPulse: false,
} as const;

export function HeroActions(){
  return (
    <div className="actions">
      <StarBorder
        {...starBorderAnimation}
        as={Link}
        href={contact.booking || '/contact/#booking'}
        className="hero-booking"
        backgroundColor="#0a4076"
        textColor="#ffffff"
        borderColor="#bd9dcd"
      >
        Discuss your project
      </StarBorder>
      <StarBorder
        {...starBorderAnimation}
        as={Link}
        href="/services/"
        className="hero-services"
        backgroundColor="#fdeee8"
        textColor="#0a4076"
        borderColor="#bd9dcd"
      >
        Explore services
      </StarBorder>
    </div>
  );
}
