# WEAVR

A six-page creative studio site built with the Next.js App Router, TypeScript and Tailwind CSS. The hero includes an original studio render and an optional interactive React Three Fiber sculpture. GSAP and Lenis enhance scrolling when motion is enabled.

Run `npm ci`, then `npm run dev`. Create the static export with `npm run build`.

Copy `.env.example` to `.env.local` and set the site origin, Calendly URL, email address and international WhatsApp number before building. With email configured, the inquiry form opens a populated email draft. Without email, the visitor can download a plain-text brief locally. The site does not collect form data on a server. Direct delivery can be added through a server-side provider once a destination and credentials are available.
