import {siteOrigin} from '../content';
export const dynamic='force-static';
export default function robots(){return {rules:{userAgent:'*',allow:'/'},sitemap:siteOrigin?new URL('/sitemap.xml',siteOrigin).href:undefined}}
