import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[#131313]/90 backdrop-blur-md border-b border-gray-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 magnetic cursor-pointer z-50">
          <div className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center font-bold text-white text-xl font-display">P</div>
          <span className="text-white font-bold text-xl tracking-widest uppercase font-display">Zone</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Assembly', 'Materials', 'Calculator'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-[#FF6B00] uppercase tracking-wider transition-colors magnetic">
              {item}
            </a>
          ))}
          <button className="px-6 py-2 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors uppercase text-sm font-bold tracking-wider magnetic">
            Get Quote
          </button>
        </nav>

        <button className="md:hidden text-white z-50 magnetic" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-[#131313] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {['Assembly', 'Materials', 'Calculator'].map((item, i) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-3xl font-display font-bold text-white hover:text-[#FF6B00] uppercase tracking-widest transition-colors"
            style={{ transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: mobileMenuOpen ? 1 : 0, transitionDelay: `${i * 100}ms` }}
          >
            {item}
          </a>
        ))}
        <button 
          className="mt-8 px-8 py-4 bg-[#FF6B00] text-white uppercase text-lg font-bold tracking-wider"
          style={{ transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: mobileMenuOpen ? 1 : 0, transitionDelay: '300ms' }}
        >
          Get Quote
        </button>
      </div>
    </header>
  );
};
