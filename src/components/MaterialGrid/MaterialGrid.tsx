import React, { useEffect, useRef } from 'react';
import { Shield, Zap, Droplets, Wind } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MATERIALS = [
  {
    title: 'Tempered Glass',
    spec: '12mm / 10mm',
    desc: 'High-impact resistance, CE certified panoramic viewing panels.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Steel Structure',
    spec: '100x50x2mm',
    desc: 'Galvanized steel profiles with anti-corrosion zinc coating.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Artificial Turf',
    spec: 'Texturized Monofilament',
    desc: 'FIP approved, optimal ball bounce and joint protection.',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1589801258579-18e091f4ca26?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'LED Lighting',
    spec: '200W / 8 Poles',
    desc: 'Asymmetrical floodlights ensuring zero glare for players.',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1563245159-f793f19d8c37?q=80&w=800&auto=format&fit=crop'
  }
];

export const MaterialGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.material-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 bg-[#131313] text-white relative overflow-hidden" id="materials">
      {/* Background wireframe accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-24">
          <h2 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            Industrial <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-400">Grade</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
            Engineered for the extreme Middle Eastern climate. Our courts combine structural integrity with aesthetic perfection.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MATERIALS.map((mat, idx) => (
            <div key={idx} className="material-card group relative bg-[#1A1A1A] border border-gray-800 overflow-hidden hover:border-[#FF6B00] transition-colors duration-500 magnetic view-project cursor-pointer">
              <div className="h-56 overflow-hidden">
                <img 
                  src={mat.image} 
                  alt={mat.title} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="p-8 relative">
                <div className="absolute -top-8 right-8 w-16 h-16 bg-[#FF6B00] flex items-center justify-center rounded-sm shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                  <mat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-2">{mat.title}</h3>
                <p className="text-[#FF6B00] font-mono text-sm mb-4 tracking-wider">{mat.spec}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{mat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
