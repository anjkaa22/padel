import React from 'react';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-gray-900 pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E85D04] opacity-[0.03] blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E85D04] flex items-center justify-center font-bold text-xl font-display text-white">
                P
              </div>
              <span className="font-bold text-xl tracking-widest uppercase font-display text-white">
                Zone
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The premier destination for professional padel court construction and premium sports equipment in the UAE.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-none bg-[#111111] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#E85D04] hover:border-[#E85D04] transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-widest text-white mb-8 text-sm">Navigation</h3>
            <ul className="space-y-4">
              {['Assembly', 'Materials', 'Products', 'Calculator', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    onClick={(e) => scrollToSection(e, item.toLowerCase())}
                    className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#E85D04] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-widest text-white mb-8 text-sm">Our Expertise</h3>
            <ul className="space-y-4">
              {['Court Construction', 'Premium Turf', 'Glass Installation', 'Lighting Systems', 'Maintenance'].map((item) => (
                <li key={item} className="text-gray-400 text-sm uppercase tracking-wider flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-800 mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-widest text-white mb-8 text-sm">Connect</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-[#E85D04] shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">Dubai, United Arab Emirates</span>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Phone size={18} className="text-[#E85D04] shrink-0" />
                  <a href="tel:+971502895251" className="text-gray-400 hover:text-white transition-colors text-sm">+971 50 289 5251</a>
                </div>
                <div className="flex items-center gap-4 ml-8">
                  <a href="tel:+971522204181" className="text-gray-400 hover:text-white transition-colors text-sm">+971 52 220 4181</a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-[#E85D04] shrink-0" />
                <a href="mailto:info@padelzone.ae" className="text-gray-400 hover:text-white transition-colors text-sm">info@padelzone.ae</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-[0.2em]">
            <span>&copy; {currentYear} PADEL ZONE</span>
            <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-500 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">Terms of Service</a>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#E85D04] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Back to top</span>
            <div className="w-10 h-10 border border-gray-800 flex items-center justify-center group-hover:border-[#E85D04] transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
