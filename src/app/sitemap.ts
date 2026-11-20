import {siteOrigin,navigation} from '../content';
export const dynamic='force-static';
export default function sitemap(){return siteOrigin?navigation.map(([,path])=>({url:new URL(path,siteOrigin).href})):[]}
