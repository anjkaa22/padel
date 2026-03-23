import React, { useEffect, Suspense, lazy } from 'react';
import { MaterialGrid } from './components/MaterialGrid/MaterialGrid';
import { CostCalculator } from './components/IndustrialUI/CostCalculator';
import { ProductsSection } from './components/IndustrialUI/ProductsSection';
import { ContactSection } from './components/IndustrialUI/ContactSection';
import { Header } from './components/IndustrialUI/Header';
import { Footer } from './components/IndustrialUI/Footer';
import { LoadingScreen } from './components/IndustrialUI/LoadingScreen';
import { MagneticCursor } from './components/IndustrialUI/MagneticCursor';
import { FloatingWhatsApp } from './components/IndustrialUI/FloatingWhatsApp';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

import Scene from './components/3DAssembly/Scene';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const { scrollYProgress } = useScroll();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const yBg = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '20%']);

  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [isLoading]);

  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    
    // Loading Progress Logic
    let progressInterval: any;
    const startTime = Date.now();
    const minDuration = 2500; // 2.5s minimum for the vibe
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / minDuration) * 100, 99);
      setLoadingProgress(progress);
      
      if (progress < 99) {
        progressInterval = setTimeout(updateProgress, 50);
      }
    };

    updateProgress();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => setIsLoading(false), 500);
      }, remaining);
    };

    // Safety fallback: Force load after 6 seconds if something hangs
    const safetyTimeout = setTimeout(handleLoad, 6000);

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // On mobile, we still want ScrollTrigger to work well
    if (isMobile) {
      ScrollTrigger.config({ limitCallbacks: true });
      ScrollTrigger.normalizeScroll(true);
      ScrollTrigger.refresh();
      
      return () => {
        window.removeEventListener('load', handleLoad);
        if (progressInterval) clearTimeout(progressInterval);
        clearTimeout(safetyTimeout);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
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
      window.removeEventListener('load', handleLoad);
      if (progressInterval) clearTimeout(progressInterval);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <div className="bg-[#000000] min-h-screen w-full text-white font-sans selection:bg-[#E85D04] selection:text-white md:cursor-none cursor-auto relative">
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000]"
          >
            <LoadingScreen progress={loadingProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#E85D04] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Premium Animated Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep radial base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a0b00] via-[#050200] to-[#000000]"></div>
        
        {/* Subtle noise/grain texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* Animated glowing orbs - Hidden on mobile for performance */}
        <div className="hidden md:block absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#E85D04] opacity-[0.04] blur-[120px] animate-float"></div>
        <div className="hidden md:block absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E85D04] opacity-[0.03] blur-[150px] animate-float-delayed"></div>
        <div className="hidden md:block absolute top-[40%] left-[60%] w-[40vw] h-[40vw] rounded-full bg-[#ffaa00] opacity-[0.02] blur-[100px] animate-float"></div>
      </div>

      {/* Grid overlay with radial fade mask */}
      <motion.div 
        className="fixed inset-[-10%] md:inset-[-20%] pointer-events-none z-0 opacity-20" 
        style={{ 
          y: yBg,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', 
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
          willChange: 'transform'
        }}
      ></motion.div>

      <MagneticCursor />
      <FloatingWhatsApp />
      
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Header />
        
        <main>
          {/* 3D Assembly Section - Needs a tall container for scroll scrubbing */}
          <section id="assembly" className="relative">
            <div id="assembly-container" className="w-full h-screen">
              <Suspense fallback={
                <div className="w-full h-screen flex items-center justify-center bg-[#050200]">
                  <div className="w-16 h-16 border-4 border-[#E85D04] border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <Scene />
              </Suspense>
            </div>
          </section>

          {/* Individual sections with their own animations */}
          <MaterialGrid />
          <ProductsSection />
          <CostCalculator />
          <ContactSection />
        </main>

        <Footer />
      </motion.div>
    </div>
  );
}
