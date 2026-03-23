import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[#131313]/90 backdrop-blur-md border-b border-gray-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 magnetic cursor-pointer z-50">
          <div className="w-8 h-8 bg-[#E85D04] flex items-center justify-center font-bold text-white text-xl font-display">P</div>
          <span className="text-white font-bold text-xl tracking-widest uppercase font-display">Zone</span>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {['Assembly', 'Materials', 'Products', 'Calculator', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className={`text-sm font-medium uppercase tracking-wider transition-colors magnetic ${activeSection === item.toLowerCase() ? 'text-[#E85D04]' : 'text-gray-300 hover:text-[#E85D04]'}`}
            >
              {item}
            </a>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l border-gray-700 pl-8">
            <a href="tel:+971502895251" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[#E85D04] transition-colors magnetic">
              <Phone size={16} />
              +971 50 289 5251
            </a>
            <a href="tel:+971522204181" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[#E85D04] transition-colors magnetic">
              <Phone size={16} />
              +971 52 220 4181
            </a>
          </div>

          <button className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[#E85D04] transition-colors magnetic ml-4" aria-label="Toggle Language">
            <Globe size={16} />
            EN | عربي
          </button>
          
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-primary py-2 px-4 text-xs ml-2">
            Book a Court
          </a>
        </nav>

        <button className="lg:hidden text-white z-50 magnetic" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-[#131313] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {['Assembly', 'Materials', 'Products', 'Calculator', 'Contact'].map((item, i) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            onClick={(e) => handleNavClick(e, item.toLowerCase())}
            className={`text-3xl font-display font-bold uppercase tracking-widest transition-colors ${activeSection === item.toLowerCase() ? 'text-[#E85D04]' : 'text-white hover:text-[#E85D04]'}`}
            style={{ transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: mobileMenuOpen ? 1 : 0, transitionDelay: `${i * 100}ms` }}
          >
            {item}
          </a>
        ))}
        
        <div className="flex flex-col items-center gap-4 mt-8" style={{ transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: mobileMenuOpen ? 1 : 0, transitionDelay: '300ms' }}>
          <a href="tel:+971502895251" className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-[#E85D04] transition-colors">
            <Phone size={20} />
            +971 50 289 5251
          </a>
          <a href="tel:+971522204181" className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-[#E85D04] transition-colors">
            <Phone size={20} />
            +971 52 220 4181
          </a>
          <button className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-[#E85D04] transition-colors mt-4" aria-label="Toggle Language">
            <Globe size={20} />
            EN | عربي
          </button>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-primary w-full mt-4 text-center">
            Book a Court
          </a>
        </div>
      </div>
    </header>
  );
};
