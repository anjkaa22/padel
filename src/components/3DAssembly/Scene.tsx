import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, Sparkles } from '@react-three/drei';
import { CourtModel } from './CourtModel';
import { ArrowDown } from 'lucide-react';

export const Scene = () => {
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
    <div className="w-full h-screen sticky top-0 bg-transparent overflow-hidden">
      <Canvas camera={{ position: [18, 14, 18], fov: 45 }} gl={{ alpha: true }}>
        <fog attach="fog" args={['#050200', 20, 60]} />
        
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[15, 30, 15]} 
          intensity={2} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
          shadow-bias={-0.0001}
        />
        <spotLight
          position={[0, 40, 0]}
          intensity={5}
          angle={0.6}
          penumbra={0.5}
          castShadow
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <CourtModel />
          <Environment preset="city" />
          
          {/* Dust particles for realism */}
          <Sparkles count={200} scale={30} size={2} speed={0.2} opacity={0.1} color="#ffffff" />

          <ContactShadows position={[0, -0.04, 0]} opacity={0.8} scale={50} blur={2} far={10} color="#000000" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={!isMobile} maxPolarAngle={Math.PI / 2 - 0.05} />
      </Canvas>
      
      {/* Overlay Text - Hidden initially, animated in later */}
      <div id="hero-text" className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-white z-10 px-4 opacity-0 scale-95 translate-y-10">
        <h1 className="font-display text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter text-center leading-[0.85] drop-shadow-2xl mb-4">
          Elevate Your Game.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-500">Build Your Dream Court.</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl text-lg md:text-2xl font-light tracking-wide mb-8 drop-shadow-md">
          Premium Gear. Elite Performance. Delivered Across the UAE.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <a href="#assembly" onClick={(e) => { e.preventDefault(); document.getElementById('assembly')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
            Assemble Your Court
          </a>
          <a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
            Shop Gear
          </a>
        </div>
      </div>

      {/* Skip Animation Button */}
      <button 
        onClick={() => {
          const el = document.getElementById('materials');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 right-4 md:right-8 z-20 text-[10px] md:text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-gray-800 hover:border-gray-600 rounded-full px-3 md:px-4 py-2 bg-black/50 backdrop-blur-sm pointer-events-auto"
      >
        Skip Animation
      </button>

      {/* Scroll Indicator */}
      <div id="scroll-indicator" className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center animate-bounce">
        <p className="mb-2 text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-medium">
          Scroll to Assemble
        </p>
        <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-[#FF6B00]" />
      </div>
    </div>
  );
};
