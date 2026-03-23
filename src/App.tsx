import React, { useEffect, Suspense, lazy } from 'react';
import { MaterialGrid } from './components/MaterialGrid/MaterialGrid';
import { CostCalculator } from './components/IndustrialUI/CostCalculator';
import { ProductsSection } from './components/IndustrialUI/ProductsSection';
import { ContactSection } from './components/IndustrialUI/ContactSection';
import { Header } from './components/IndustrialUI/Header';
import { Footer } from './components/IndustrialUI/Footer';
import { MagneticCursor } from './components/IndustrialUI/MagneticCursor';
import { FloatingWhatsApp } from './components/IndustrialUI/FloatingWhatsApp';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'motion/react';

const Scene = lazy(() => import('./components/3DAssembly/Scene').then(module => ({ default: module.Scene })));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    // Smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <div className="bg-[#000000] min-h-screen text-white font-sans selection:bg-[#E85D04] selection:text-white cursor-none relative">
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#E85D04] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Premium Animated Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep radial base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a0b00] via-[#050200] to-[#000000]"></div>
        
        {/* Animated glowing orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#E85D04] opacity-[0.04] blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E85D04] opacity-[0.03] blur-[150px] animate-float-delayed"></div>
        <div className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw] rounded-full bg-[#ffaa00] opacity-[0.02] blur-[100px] animate-float"></div>
      </div>

      {/* Noise overlay for texture */}
      <motion.div className="fixed inset-[-20%] pointer-events-none z-0 opacity-[0.03] mix-blend-overlay" style={{ y: yBg, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></motion.div>
      
      {/* Grid overlay with radial fade mask */}
      <motion.div className="fixed inset-[-20%] pointer-events-none z-0 opacity-20" style={{ 
        y: yBg,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', 
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
      }}></motion.div>

      <MagneticCursor />
      <FloatingWhatsApp />
      
      <div className="relative z-10">
        <Header />
        
        <main>
          {/* 3D Assembly Section - Needs a tall container for scroll scrubbing */}
          <section id="assembly" className="relative">
            <div id="assembly-container" className="h-[300vh]">
              <Suspense fallback={
                <div className="w-full h-screen flex items-center justify-center bg-[#050200]">
                  <div className="w-16 h-16 border-4 border-[#E85D04] border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <Scene />
              </Suspense>
            </div>
          </section>

          <MaterialGrid />
          <ProductsSection />
          <CostCalculator />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
