# WEAVR

A six-page creative studio site built with the Next.js App Router, TypeScript and Tailwind CSS. The hero includes an original studio render and an optional interactive React Three Fiber sculpture. GSAP and Lenis enhance scrolling when motion is enabled.

Run `npm ci`, then `npm run dev`. Create the static export with `npm run build`.

Copy `.env.example` to `.env.local` and set the site origin, booking URL, email address and international WhatsApp number before building.

For direct enquiries, create a [Formspree form](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax), configure its notification recipient for Weavr, and set `NEXT_PUBLIC_FORMSPREE_FORM_ID` to the form ID before rebuilding the static export. The form ID is public. Do not put a secret API key in this variable. With no form ID, visitors can still reach Weavr through the email link.
