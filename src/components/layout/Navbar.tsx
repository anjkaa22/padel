import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, CalendarDays } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courts', path: '/courts' },
    { name: 'My Bookings', path: '/bookings' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50 relative group">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/20 group-hover:scale-105 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.92993 4.92993L9.16993 9.16993" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.8301 14.8301L19.0701 19.0701" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.92993 19.0701L9.16993 14.8301" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.8301 9.16993L19.0701 4.92993" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={cn("font-display font-bold text-xl tracking-tight", isScrolled ? "text-[var(--color-text)]" : "text-[var(--color-text)] lg:text-white")}>
            Padel<span className="text-[var(--color-primary)]">Match</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-[var(--color-primary)]',
                location.pathname === link.path
                  ? 'text-[var(--color-primary)]'
                  : isScrolled ? 'text-[var(--color-muted)]' : 'text-white/80'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 pl-8 border-l border-[var(--color-border)]/30">
            <Button variant="ghost" size="sm" className={cn("gap-2", isScrolled ? "text-[var(--color-text)]" : "text-white hover:text-[var(--color-text)]")}>
              <User size={18} />
              <span>Sign In</span>
            </Button>
            <Link to="/courts">
              <Button size="sm" className="gap-2 shadow-lg shadow-[var(--color-primary)]/20">
                <CalendarDays size={18} />
                <span>Book Court</span>
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn("lg:hidden relative z-50 p-2 -mr-2", isScrolled || mobileMenuOpen ? "text-[var(--color-text)]" : "text-white")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-[var(--color-surface)] z-40 lg:hidden flex flex-col pt-24 px-6 transition-transform duration-300 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'py-3 border-b border-[var(--color-border)] transition-colors',
                location.pathname === link.path ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="mt-auto pb-12 flex flex-col gap-4">
          <Button variant="outline" className="w-full justify-center gap-2">
            <User size={20} />
            <span>Sign In</span>
          </Button>
          <Link to="/courts" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full justify-center gap-2">
              <CalendarDays size={20} />
              <span>Book Court</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
