import React from 'react';
import { Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react';

// Custom TikTok Icon since it's not in lucide-react by default
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050200] border-t border-gray-900 py-16 text-white relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#E85D04] flex items-center justify-center font-bold text-white text-xl font-display">P</div>
            <span className="text-white font-bold text-xl tracking-widest uppercase font-display">Zone</span>
          </div>
          <p className="text-gray-400 max-w-md leading-relaxed mb-8">
            The premier Padel Courts Manufacturer in the Middle East. Delivering world-class, industrial-grade courts across the UAE and beyond.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-[#E85D04] transition-colors magnetic" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#E85D04] transition-colors magnetic" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#E85D04] transition-colors magnetic" aria-label="YouTube">
              <Youtube size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#E85D04] transition-colors magnetic" aria-label="TikTok">
              <TikTokIcon size={24} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-display font-bold uppercase tracking-wider mb-6 text-[#E85D04]">Contact</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-[#E85D04]" />
              <span>Dubai, UAE</span>
            </li>
            <li>
              <a href="mailto:info@padelzone.ae" className="flex items-center gap-3 hover:text-[#E85D04] transition-colors magnetic">
                <Mail size={18} className="text-[#E85D04]" />
                info@padelzone.ae
              </a>
            </li>
            <li>
              <a href="tel:+971502895251" className="flex items-center gap-3 hover:text-[#E85D04] transition-colors magnetic">
                <Phone size={18} className="text-[#E85D04]" />
                +971 50 289 5251
              </a>
            </li>
            <li>
              <a href="tel:+971522204181" className="flex items-center gap-3 hover:text-[#E85D04] transition-colors magnetic">
                <Phone size={18} className="text-[#E85D04]" />
                +971 52 220 4181
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase tracking-wider mb-6 text-[#E85D04]">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#assembly" onClick={(e) => handleNavClick(e, 'assembly')} className="hover:text-[#E85D04] hover:underline transition-all magnetic inline-block">Assembly</a></li>
            <li><a href="#materials" onClick={(e) => handleNavClick(e, 'materials')} className="hover:text-[#E85D04] hover:underline transition-all magnetic inline-block">Materials</a></li>
            <li><a href="#calculator" onClick={(e) => handleNavClick(e, 'calculator')} className="hover:text-[#E85D04] hover:underline transition-all magnetic inline-block">Calculator</a></li>
            <li><a href="#" className="hover:text-[#E85D04] hover:underline transition-all magnetic inline-block">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#E85D04] hover:underline transition-all magnetic inline-block">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm gap-6">
        <p>&copy; {new Date().getFullYear()} Padel Zone. All rights reserved.</p>
        
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-gray-600 font-bold">Accepted Payments</span>
          <div className="flex gap-2">
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black font-bold text-[10px]">VISA</div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black font-bold text-[10px]">MC</div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black font-bold text-[10px]">PAY</div>
          </div>
        </div>

        <p className="font-medium">Proudly Based in the UAE 🇦🇪</p>
      </div>
    </footer>
  );
};
