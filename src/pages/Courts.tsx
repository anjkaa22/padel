import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Filter, Star, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MOCK_COURTS } from '../utils/mockData';
import { useBookingStore } from '../store/useBookingStore';
import { useNavigate } from 'react-router-dom';

export const Courts = () => {
  const [filter, setFilter] = useState('all');
  const selectCourt = useBookingStore((state) => state.selectCourt);
  const navigate = useNavigate();

  const handleBook = (court: any) => {
    selectCourt(court);
    navigate('/book');
  };

  const filteredCourts = MOCK_COURTS.filter(court => {
    if (filter === 'all') return true;
    return court.type === filter;
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Header */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold text-[var(--color-text)] mb-4">Find a Court</h1>
          <p className="text-[var(--color-muted)] text-lg max-w-2xl mb-8">
            Browse our selection of premium padel courts. Filter by location, type, or availability to find your perfect match.
          </p>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[var(--color-muted)]" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-[var(--color-border)] rounded-xl leading-5 bg-[var(--color-background)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm transition-shadow"
                placeholder="Search by location or court name..."
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar pb-2 md:pb-0">
              {['all', 'indoor', 'outdoor', 'glass'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === type
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Courts
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourts.map((court, idx) => (
            <motion.div
              key={court.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={court.type === 'indoor' ? 'info' : court.type === 'glass' ? 'warning' : 'success'} className="shadow-sm backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
                    {court.type.toUpperCase()}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-[var(--color-text)] shadow-sm flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  4.9
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[var(--color-text)] font-display">{court.name}</h3>
                  <span className="text-lg font-bold text-[var(--color-primary)]">${court.pricePerHour}<span className="text-sm text-[var(--color-muted)] font-normal">/hr</span></span>
                </div>
                
                <div className="flex items-center gap-2 text-[var(--color-muted)] text-sm mb-4">
                  <MapPin size={16} />
                  <span>{court.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {court.amenities.slice(0, 3).map((amenity, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-[var(--color-background)] rounded-md text-[var(--color-muted)] border border-[var(--color-border)]">
                      {amenity}
                    </span>
                  ))}
                  {court.amenities.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-[var(--color-background)] rounded-md text-[var(--color-muted)] border border-[var(--color-border)]">
                      +{court.amenities.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-[var(--color-success)] font-medium">
                    <Clock size={16} />
                    <span>Available Today</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => navigate(`/courts/${court.id}`)}>
                      Details
                    </Button>
                    <Button onClick={() => handleBook(court)}>
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
