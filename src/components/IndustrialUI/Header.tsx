import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTargetElement(document.getElementById('assembly-container'));
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetElement ? { current: targetElement } : undefined,
    offset: ["start start", "end start"]
  });

  // Sync with the assembly animation: 
  // The assembly finishes and hero text appears towards the end of the pinned section.
  // We'll fade the header to orange as the assembly completes (between 60% and 90% of the section scroll)
  const headerBg = useTransform(
    scrollYProgress,
    [0.6, 0.9],
    ['rgba(232, 93, 4, 0)', 'rgba(232, 93, 4, 1)']
  );
  
  const headerPadding = useTransform(scrollYProgress, [0.6, 0.9], ['24px', '16px']);
  const headerShadow = useTransform(
    scrollYProgress,
    [0.6, 0.9],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 10px 30px rgba(0,0,0,0.2)']
  );

  // Text and logo colors
  const logoBg = useTransform(scrollYProgress, [0.6, 0.9], ['#E85D04', '#000000']);
  const brandText = useTransform(scrollYProgress, [0.6, 0.9], ['#FFFFFF', '#000000']);
  const navTextColor = useTransform(scrollYProgress, [0.6, 0.9], ['#D1D5DB', '#FFFFFF']);

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
    <motion.header 
      style={{ 
        backgroundColor: headerBg,
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
        boxShadow: headerShadow
      }}
      className="fixed top-0 w-full z-40 transition-all duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 magnetic cursor-pointer relative z-50">
          <motion.div 
            style={{ backgroundColor: logoBg }}
            className="w-8 h-8 flex items-center justify-center font-bold text-xl font-display text-white"
          >
            P
          </motion.div>
          <motion.span 
            style={{ color: brandText }}
            className="font-bold text-xl tracking-widest uppercase font-display"
          >
            Zone
          </motion.span>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {['Assembly', 'Materials', 'Products', 'Calculator', 'Contact'].map((item) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              style={{ 
                color: activeSection === item.toLowerCase() 
                  ? (brandText.get() === '#000000' ? '#000000' : '#E85D04') 
                  : navTextColor 
              }}
              className={`text-sm font-medium uppercase tracking-wider transition-colors magnetic ${
                activeSection === item.toLowerCase() 
                  ? 'font-bold border-b-2 border-current' 
                  : 'hover:text-black'
              }`}
            >
              {item}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-8 transition-colors duration-300">
            <motion.a 
              href="tel:+971502895251" 
              style={{ color: navTextColor }}
              className="flex items-center gap-2 text-sm font-medium hover:text-black transition-colors magnetic"
            >
              <Phone size={16} />
              +971 50 289 5251
            </motion.a>
            <motion.a 
              href="tel:+971522204181" 
              style={{ color: navTextColor }}
              className="flex items-center gap-2 text-sm font-medium hover:text-black transition-colors magnetic"
            >
              <Phone size={16} />
              +971 52 220 4181
            </motion.a>
          </div>

          <motion.button 
            style={{ color: navTextColor }}
            className="flex items-center gap-2 text-sm font-medium hover:text-black transition-colors magnetic ml-4" 
            aria-label="Toggle Language"
          >
            <Globe size={16} />
            EN | عربي
          </motion.button>
          
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-primary py-2 px-4 text-xs ml-2 bg-black text-white hover:bg-gray-900 border-none">
            Book a Court
          </a>
        </nav>

        <button className="lg:hidden relative z-50 magnetic text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
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
    </motion.header>
  );
};
