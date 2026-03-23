import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Zap, Shield, Users, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80" 
            alt="Padel Court" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
                </span>
                142 Bookings Today
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6">
                Book Your Court <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-emerald-300">
                  in Seconds.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                The fastest way to find and book premium padel courts near you. Real-time availability, instant confirmation, zero hassle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/courts">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 shadow-lg shadow-[var(--color-primary)]/20">
                    <Calendar size={20} />
                    Find a Court
                  </Button>
                </Link>
                <Link to="/courts">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                    <Zap size={20} className="text-amber-400" />
                    Quick Book
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="User" 
                      className="w-10 h-10 rounded-full border-2 border-slate-900"
                    />
                  ))}
                </div>
                <div className="text-sm text-slate-300">
                  <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="fill-current" />)}
                  </div>
                  <span className="font-medium text-white">4.9/5</span> from over 2,000 players
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Book Section */}
      <section className="py-12 bg-[var(--color-surface)] border-b border-[var(--color-border)] relative z-20 -mt-8 mx-4 sm:mx-6 lg:mx-8 rounded-2xl shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[var(--color-muted)] mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] w-5 h-5" />
                <select className="w-full pl-10 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none appearance-none">
                  <option>Any Location</option>
                  <option>Downtown Arena</option>
                  <option>Marina Beach</option>
                  <option>Sports Complex</option>
                </select>
              </div>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[var(--color-muted)] mb-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] w-5 h-5" />
                <input type="date" className="w-full pl-10 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none" />
              </div>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-[var(--color-muted)] mb-1">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] w-5 h-5" />
                <select className="w-full pl-10 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none appearance-none">
                  <option>Any Time</option>
                  <option>Morning (6AM - 12PM)</option>
                  <option>Afternoon (12PM - 5PM)</option>
                  <option>Evening (5PM - 11PM)</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-auto md:pt-6">
              <Link to="/courts">
                <Button size="lg" className="w-full">Search Courts</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text)] mb-4">Why Choose PadelMatch?</h2>
            <p className="text-[var(--color-muted)] text-lg">We've simplified the booking process so you can focus on your game.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-6 h-6 text-[var(--color-primary)]" />,
                title: "Real-Time Availability",
                desc: "See live court availability. No more calling or waiting for confirmation."
              },
              {
                icon: <Shield className="w-6 h-6 text-[var(--color-primary)]" />,
                title: "Instant Confirmation",
                desc: "Secure your slot instantly with our seamless booking and payment system."
              },
              {
                icon: <Users className="w-6 h-6 text-[var(--color-primary)]" />,
                title: "Split Payments",
                desc: "Book now and easily split the cost with your playing partners later."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[var(--color-surface)] p-8 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">{feature.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
