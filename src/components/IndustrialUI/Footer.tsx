import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#131313] border-t border-gray-800 py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center font-bold text-white text-xl font-display">P</div>
            <span className="text-white font-bold text-xl tracking-widest uppercase font-display">Zone</span>
          </div>
          <p className="text-gray-400 max-w-md leading-relaxed">
            The premier Padel Courts Manufacturer in the Middle East. Delivering world-class, industrial-grade courts across the UAE and beyond.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold uppercase tracking-wider mb-6 text-[#FF6B00]">Contact</h4>
          <ul className="space-y-4 text-gray-400">
            <li>Dubai, UAE</li>
            <li>info@padelzone.ae</li>
            <li>
              <a href="tel:+971502895251" className="hover:text-white transition-colors block magnetic inline-block">+971 50 289 5251</a>
            </li>
            <li>
              <a href="tel:+971522204181" className="hover:text-white transition-colors block magnetic inline-block">+971 52 220 4181</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase tracking-wider mb-6 text-[#FF6B00]">Legal</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors magnetic inline-block">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors magnetic inline-block">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors magnetic inline-block">Warranty Info</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Padel Zone. All rights reserved.
      </div>
    </footer>
  );
};
