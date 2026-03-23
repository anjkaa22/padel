import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-[var(--color-text)]">
                Padel<span className="text-[var(--color-primary)]">Match</span>
              </span>
            </Link>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-xs">
              The premier platform for booking padel courts instantly. Find, book, and play at the best courts near you.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-[var(--color-text)] mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/courts" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Book a Court</Link></li>
              <li><Link to="/bookings" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">My Bookings</Link></li>
              <li><Link to="/pricing" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Pricing & Memberships</Link></li>
              <li><Link to="/locations" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Our Locations</Link></li>
              <li><Link to="/faq" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-[var(--color-text)] mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/cancellation" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Cancellation Policy</Link></li>
              <li><Link to="/cookies" className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-[var(--color-text)] mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[var(--color-muted)] text-sm">
                <MapPin size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                <span>123 Padel Avenue, Sports District, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-muted)] text-sm">
                <Phone size={18} className="text-[var(--color-primary)] shrink-0" />
                <a href="tel:+971500000000" className="hover:text-[var(--color-primary)] transition-colors">+971 50 000 0000</a>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-muted)] text-sm">
                <Mail size={18} className="text-[var(--color-primary)] shrink-0" />
                <a href="mailto:hello@padelmatch.com" className="hover:text-[var(--color-primary)] transition-colors">hello@padelmatch.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-muted)] text-sm">
            &copy; {new Date().getFullYear()} PadelMatch. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[var(--color-muted)] text-sm">
            <span>Made with precision</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
            <span>For the love of the game</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
