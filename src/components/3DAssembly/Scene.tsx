import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, Sparkles } from '@react-three/drei';
import { CourtModel } from './CourtModel';
import { ArrowDown } from 'lucide-react';

const Scene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-screen bg-transparent touch-action-pan-y" style={{ touchAction: 'pan-y' }}>
      <Canvas 
        className={isMobile ? "pointer-events-none" : "pointer-events-auto"}
        camera={{ 
          position: isMobile ? [12, 9, 12] : [18, 14, 18], 
          fov: isMobile ? 60 : 45 
        }} 
        gl={{ 
          alpha: true,
          antialias: false, // Disable antialiasing for performance
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Limit pixel ratio
      >
        <fog attach="fog" args={['#050200', 30, 80]} />
        
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[15, 30, 15]} 
          intensity={2} 
          castShadow 
          shadow-mapSize={[1024, 1024]} // Reduced from 2048
          shadow-bias={-0.0001}
        />
        <spotLight
          position={[0, 40, 0]}
          intensity={5}
          angle={0.6}
          penumbra={0.5}
          castShadow
          shadow-mapSize={[512, 512]}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>

        <Suspense fallback={null}>
          <CourtModel />
          
          {/* Dust particles for realism - Disabled on mobile */}
          {!isMobile && (
            <Sparkles count={150} scale={30} size={2} speed={0.2} opacity={0.1} color="#ffffff" />
          )}

          {/* Contact shadows - Disabled on mobile as they are very expensive */}
          {!isMobile && (
            <ContactShadows 
              position={[0, -0.04, 0]} 
              opacity={0.8} 
              scale={50} 
              blur={2.5} 
              far={10} 
              resolution={512} 
              color="#000000" 
            />
          )}
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={!isMobile} maxPolarAngle={Math.PI / 2 - 0.05} />
      </Canvas>
      
      {/* Hero Content - Split into Top and Bottom for separate animations */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between items-center pt-24 pb-24 md:pt-40 md:pb-48 z-10">
        {/* Top Section: Heading */}
        <div id="hero-top" className="flex flex-col items-center text-white px-6 md:px-8">
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[3.8vw] font-black uppercase tracking-tighter text-center leading-[1.1] drop-shadow-2xl mb-4 max-w-4xl">
            Elevate Your Game. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-500">Build Your Dream Court.</span>
          </h1>
        </div>

        {/* Bottom Section: Subtext & Buttons */}
        <div id="hero-bottom" className="flex flex-col items-center gap-6 sm:gap-8 pointer-events-auto w-full max-w-none justify-center px-4">
          <p className="text-center text-gray-400 max-w-2xl text-sm md:text-2xl font-light tracking-wide drop-shadow-md px-4">
            Premium Gear. Elite Performance. Delivered Across the UAE.
          </p>
          <div className="flex flex-row gap-2 sm:gap-4">
            <a href="#calculator" onClick={(e) => { e.preventDefault(); document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary text-center text-[10px] sm:text-base px-3 sm:px-6 whitespace-nowrap">
              Assemble Your Court
            </a>
            <a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary text-center text-[10px] sm:text-base px-3 sm:px-6 whitespace-nowrap">
              Shop Gear
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div id="scroll-indicator" className="absolute bottom-8 md:bottom-12 left-0 right-0 pointer-events-none flex flex-col items-center animate-bounce z-20">
        <p className="mb-2 text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-medium text-center mr-[-0.3em]">
          Scroll to Assemble
        </p>
        <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-[#FF6B00]" />
      </div>
    </div>
  );
};

export default Scene;
