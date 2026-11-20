'use client';
import dynamic from 'next/dynamic';
import {Component,useState} from 'react';
const Scene=dynamic(()=>import('./scene'),{ssr:false});
class SceneBoundary extends Component<{children:React.ReactNode},{failed:boolean}>{
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true}}
  render(){return this.state.failed ? <p className="scene-note" role="status">Interactive view is unavailable on this device.</p> : this.props.children}
}
export function Sculpture({interactive=false}:{interactive?:boolean}){
  const [live,setLive]=useState(false);
  return <figure className="sculpture">
    <div className="art-image" data-parallax><img src="/sculpture.webp" srcSet="/sculpture-small.webp 640w, /sculpture.webp 1254w" sizes="(max-width: 680px) 94vw, 45vw" width="1254" height="1254" alt="Lilac, coral and blue ceramic loops interlocking in a sculptural form" fetchPriority={interactive?'high':'auto'} loading={interactive?'eager':'lazy'}/></div>
    {live&&<SceneBoundary><Scene/></SceneBoundary>}
    {interactive&&<button className="art-toggle" aria-pressed={live} onClick={()=>setLive(!live)}>{live?'Show still':'Explore in 3D'}</button>}
  </figure>
}
