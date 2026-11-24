export function Sculpture(){
  return <figure className="hero-art" data-tilt>
    <span className="hero-art-glow" aria-hidden="true"/>
    <span className="hero-art-ring hero-art-ring-one" aria-hidden="true"/>
    <span className="hero-art-ring hero-art-ring-two" aria-hidden="true"/>
    <span className="hero-art-ring hero-art-ring-three" aria-hidden="true"/>
    <span className="hero-art-mark" data-logo-stop aria-hidden="true"><img src="/Logo.png" alt="" width="641" height="456" fetchPriority="high"/></span>
    <figcaption className="hero-orbit-caption">Ideas, interwoven.</figcaption>
  </figure>
}
