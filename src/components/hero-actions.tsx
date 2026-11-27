'use client';

import Link from 'next/link';
import {contact} from '../content';
import StarBorder from './StarBorder';

const starBorderAnimation = {
  theme: 'light',
  radius: 999,
  color: '#ac83d7',
  trailColor: '#7550a2',
  thickness: 1.75,
  duration: 4.8,
  glow: 0.32,
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
