import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COURTS } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MapPin, Star, Users, Wind, Sun, Shield, Check } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';

export const CourtDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectCourt = useBookingStore((state) => state.selectCourt);
  
  const court = MOCK_COURTS.find(c => c.id === id);

  if (!court) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Court not found</h2>
          <Button onClick={() => navigate('/courts')}>Back to Courts</Button>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    selectCourt(court);
    navigate('/book');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Hero Image */}
      <div className="h-[40vh] md:h-[50vh] relative">
        <img src={court.image} alt={court.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-[var(--color-surface)] rounded-3xl p-8 border border-[var(--color-border)] shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={court.type === 'indoor' ? 'info' : court.type === 'glass' ? 'warning' : 'success'}>
                  {court.type.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-amber-500 font-medium text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  4.9 (128 reviews)
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text)] mb-4">{court.name}</h1>
              <div className="flex items-center gap-2 text-[var(--color-muted)] text-lg">
                <MapPin size={20} />
                <span>{court.location}</span>
              </div>
            </div>
            
            <div className="bg-[var(--color-background)] p-6 rounded-2xl border border-[var(--color-border)] min-w-[250px] text-center">
              <p className="text-[var(--color-muted)] text-sm font-medium mb-1">Price per hour</p>
              <p className="text-4xl font-bold text-[var(--color-primary)] mb-6">${court.pricePerHour}</p>
              <Button className="w-full" size="lg" onClick={handleBook}>Book Now</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">About this court</h2>
                <p className="text-[var(--color-muted)] leading-relaxed text-lg">
                  Experience premium padel on our state-of-the-art {court.type} court. 
                  Designed for optimal performance and safety, this court features professional-grade 
                  turf and anti-glare lighting. Perfect for both casual matches and competitive play.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {court.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[var(--color-text)]">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                        <Check size={16} />
                      </div>
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--color-background)] p-6 rounded-2xl border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text)] mb-4">Specifications</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-[var(--color-muted)]">
                    <Shield size={20} className="text-[var(--color-primary)]" />
                    <span>Dimensions: {court.dimensions}</span>
                  </li>
                  <li className="flex items-center gap-3 text-[var(--color-muted)]">
                    <Users size={20} className="text-[var(--color-primary)]" />
                    <span>Max Players: 4</span>
                  </li>
                  <li className="flex items-center gap-3 text-[var(--color-muted)]">
                    <Sun size={20} className="text-[var(--color-primary)]" />
                    <span>Lighting: LED Anti-glare</span>
                  </li>
                  <li className="flex items-center gap-3 text-[var(--color-muted)]">
                    <Wind size={20} className="text-[var(--color-primary)]" />
                    <span>Surface: Pro Turf</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
