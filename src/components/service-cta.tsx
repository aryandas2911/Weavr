import type {ReactNode} from 'react';
import Link from 'next/link';

export function ServiceCta({href, children, outline = false}: {
  href: string;
  children: ReactNode;
  outline?: boolean;
}) {
  return (
    <Link className={outline ? 'services-cta services-cta--outline' : 'services-cta'} href={href}>
      {children}
      <span className="services-cta__arrow" aria-hidden="true">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
          <path d="M5.5 14.5 14 6m-6.5 0H14v6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </Link>
  );
}
