import React from 'react';
import { MOCK_BOOKINGS, MOCK_COURTS } from '../utils/mockData';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const MyBookings = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-[var(--color-text)] mb-8">My Bookings</h1>

        {MOCK_BOOKINGS.length === 0 ? (
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-12 text-center">
            <div className="w-16 h-16 bg-[var(--color-background)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--color-muted)]">
              <Calendar size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">No bookings yet</h2>
            <p className="text-[var(--color-muted)] mb-6">You haven't made any court bookings yet.</p>
            <Button onClick={() => window.location.href = '/courts'}>Book a Court</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {MOCK_BOOKINGS.map((booking) => {
              const court = MOCK_COURTS.find(c => c.id === booking.courtId);
              if (!court) return null;

              const isUpcoming = booking.date > new Date();

              return (
                <div key={booking.id} className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <img src={court.image} alt={court.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge variant={isUpcoming ? 'success' : 'default'} className="shadow-sm backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
                        {booking.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-[var(--color-text)] font-display">{court.name}</h3>
                        <span className="text-xl font-bold text-[var(--color-primary)]">${booking.price}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-[var(--color-muted)]">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-primary)]">
                            <Calendar size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider">Date</p>
                            <p className="font-medium text-[var(--color-text)]">{format(booking.date, 'MMM d, yyyy')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--color-muted)]">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-primary)]">
                            <Clock size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider">Time</p>
                            <p className="font-medium text-[var(--color-text)]">{booking.time} ({booking.duration}m)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--color-muted)] sm:col-span-2">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-primary)]">
                            <MapPin size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider">Location</p>
                            <p className="font-medium text-[var(--color-text)]">{court.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isUpcoming && (
                      <div className="flex gap-4 pt-6 border-t border-[var(--color-border)]">
                        <Button variant="outline" className="flex-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-900/20">
                          Cancel Booking
                        </Button>
                        <Button className="flex-1">
                          Reschedule
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
