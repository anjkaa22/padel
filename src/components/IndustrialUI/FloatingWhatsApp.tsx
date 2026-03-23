import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/971502895251"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-[#E85D04] text-white rounded-full shadow-lg animate-pulse-orange hover:scale-110 transition-transform duration-300 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="hidden md:block absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
        Chat with us!
      </span>
    </a>
  );
};
