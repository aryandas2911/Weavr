'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {RoundedBox} from '@react-three/drei';
import {useEffect,useRef,useState} from 'react';
import {Curve,Group,Vector3,MathUtils} from 'three';
class Loop extends Curve<Vector3>{
  constructor(){super()}
  getPoint(t:number){const a=t*2*Math.PI;const x=Math.cos(a),y=Math.sin(a);return new Vector3(Math.sign(x)*Math.abs(x)**.55,Math.sign(y)*Math.abs(y)**.55,0)}
}
const loop=new Loop();
const colors=['#B989BB','#F9BFB8','#378EC4'];
function Forms({moving}:{moving:boolean}){
  const group=useRef<Group>(null);
  useFrame(({pointer},delta)=>{
    if(!group.current||!moving)return;
    group.current.rotation.x=MathUtils.damp(group.current.rotation.x,pointer.y*.26+window.scrollY*.0003,5,delta);
    group.current.rotation.y=MathUtils.damp(group.current.rotation.y,pointer.x*.36,5,delta);
  });
  return <group ref={group} rotation={[-.05,0,-.3]}>
    {colors.map((color,i)=><mesh key={color} position={[(i-1)*.67,(1-i)*.64,(i-1)*.16]} rotation={[.16+i*.45,i*.86-.65,-.2+i*.65]}>
      <tubeGeometry args={[loop,96,.26,14,true]}/><meshStandardMaterial color={color} roughness={.42}/>
    </mesh>)}
    <RoundedBox args={[3.9,.12,2.9]} radius={.055} position={[0,-1.68,-.25]}><meshStandardMaterial color="#98CEF3" roughness={.8}/></RoundedBox>
  </group>
}
export default function Scene(){
  const holder=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(true);
  const [moving,setMoving]=useState(false);
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: no-preference)');
    const update=()=>setMoving(media.matches);
    update();
    media.addEventListener('change',update);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));
    if(holder.current)observer.observe(holder.current);
    return ()=>{observer.disconnect();media.removeEventListener('change',update)};
  },[]);
  return <div className="live-scene" ref={holder} aria-hidden="true"><Canvas camera={{position:[.1,.3,7],fov:39}} dpr={[1,1.6]} frameloop={visible&&moving?'always':'demand'} fallback={<span/>}>
    <color attach="background" args={['#98CEF3']}/><hemisphereLight args={['#FCE6E0','#3B5870',2.2]}/><directionalLight position={[-4,5,5]} color="#FCE6E0" intensity={2.8}/><Forms moving={moving}/>
  </Canvas></div>
}
