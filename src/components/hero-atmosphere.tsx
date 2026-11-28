import WebThreads from './WebThreads';

export function HeroAtmosphere(){
  return (
    <div className="hero-visual" aria-hidden="true">
      <WebThreads
        colors={['#cb86b6','#a489dd','#d8b9ee','#b294df','#8f96d4']}
        lightMode
        threadCount={8}
        taper={5 / 7}
        speed={0.2}
        thickness={1.65}
        glow={0.019}
        opacity={0.51}
        grain={0}
        intro
        mouseInteraction={false}
        pulseOnClick={false}
      />
      <div className="hero-floats">
        <span className="hero-orb"/>
        <span className="hero-ring"/>
        <span className="hero-orb"/>
        <span className="hero-ring"/>
        <span className="hero-ring"/>
        <span className="hero-orb"/>
        <span className="hero-orb"/>
        <span className="hero-orb"/>
        <span className="hero-orb"/>
        <span className="hero-orb"/>
      </div>
    </div>
  );
}
