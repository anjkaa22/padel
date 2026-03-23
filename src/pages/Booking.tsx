import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { Button } from '../components/ui/Button';
import { ChevronLeft, Calendar as CalendarIcon, Clock, User, CheckCircle2 } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { generateSlots } from '../utils/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

export const Booking = () => {
  const navigate = useNavigate();
  const {
    step,
    setStep,
    selectedCourt,
    selectedDate,
    selectDate,
    selectedSlot,
    selectSlot,
    duration,
    setDuration,
    playerName,
    playerEmail,
    playerPhone,
    setPlayerDetails,
    resetBooking
  } = useBookingStore();

  useEffect(() => {
    if (!selectedCourt) {
      navigate('/courts');
    }
  }, [selectedCourt, navigate]);

  if (!selectedCourt) return null;

  const dates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));
  const slots = selectedDate ? generateSlots(selectedDate) : [];

  const handleNext = () => {
    if (step < 4) setStep((step + 1) as any);
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as any);
    else navigate('/courts');
  };

  const handleConfirm = () => {
    // Simulate API call
    setTimeout(() => {
      setStep(4);
    }, 1000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300",
              step === s
                ? "bg-[var(--color-primary)] text-white ring-4 ring-[var(--color-primary)]/20"
                : step > s
                ? "bg-[var(--color-success)] text-white"
                : "bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-muted)]"
            )}
          >
            {step > s ? <CheckCircle2 size={20} /> : s}
          </div>
          {s < 3 && (
            <div
              className={cn(
                "w-16 h-1 mx-2 rounded-full transition-colors duration-300",
                step > s ? "bg-[var(--color-success)]" : "bg-[var(--color-border)]"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-8 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {step < 4 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-8"
          >
            <ChevronLeft size={20} />
            Back
          </button>
        )}

        {step < 4 && renderStepIndicator()}

        <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] shadow-sm overflow-hidden">
          
          {/* Header Info */}
          {step < 4 && (
            <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-background)]/50 flex items-center gap-4">
              <img src={selectedCourt.image} alt={selectedCourt.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text)] font-display">{selectedCourt.name}</h2>
                <p className="text-[var(--color-muted)] text-sm">{selectedCourt.location}</p>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Date & Time */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                      <CalendarIcon className="text-[var(--color-primary)]" />
                      Select Date
                    </h3>
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-4 snap-x">
                      {dates.map((date) => {
                        const isSelected = selectedDate && isSameDay(date, selectedDate);
                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => selectDate(date)}
                            className={cn(
                              "snap-start shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-2xl border-2 transition-all duration-200",
                              isSelected
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)]/50"
                            )}
                          >
                            <span className="text-xs font-medium uppercase mb-1">{format(date, 'EEE')}</span>
                            <span className="text-2xl font-bold font-display">{format(date, 'd')}</span>
                            <span className="text-xs font-medium">{format(date, 'MMM')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
                          <Clock className="text-[var(--color-primary)]" />
                          Select Time
                        </h3>
                        <div className="flex items-center gap-2 bg-[var(--color-background)] p-1 rounded-lg border border-[var(--color-border)]">
                          <button
                            onClick={() => setDuration(60)}
                            className={cn(
                              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                              duration === 60 ? "bg-[var(--color-surface)] shadow-sm text-[var(--color-text)]" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                            )}
                          >
                            60 min
                          </button>
                          <button
                            onClick={() => setDuration(90)}
                            className={cn(
                              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                              duration === 90 ? "bg-[var(--color-surface)] shadow-sm text-[var(--color-text)]" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                            )}
                          >
                            90 min
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {slots.map((slot) => {
                          const isSelected = selectedSlot?.id === slot.id;
                          return (
                            <button
                              key={slot.id}
                              disabled={!slot.isAvailable}
                              onClick={() => selectSlot(slot)}
                              className={cn(
                                "py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 relative",
                                !slot.isAvailable
                                  ? "bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-muted)] opacity-50 cursor-not-allowed"
                                  : isSelected
                                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md"
                                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)]/50"
                              )}
                            >
                              {slot.time}
                              {slot.priceModifier && slot.priceModifier < 1 && slot.isAvailable && !isSelected && (
                                <span className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                  -{Math.round((1 - slot.priceModifier) * 100)}%
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-6 border-t border-[var(--color-border)] flex justify-end">
                    <Button
                      disabled={!selectedDate || !selectedSlot}
                      onClick={handleNext}
                      className="w-full sm:w-auto"
                    >
                      Continue to Details
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Player Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
                    <User className="text-[var(--color-primary)]" />
                    Player Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerDetails({ name: e.target.value, email: playerEmail, phone: playerPhone })}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Email Address</label>
                      <input
                        type="email"
                        value={playerEmail}
                        onChange={(e) => setPlayerDetails({ name: playerName, email: e.target.value, phone: playerPhone })}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={playerPhone}
                        onChange={(e) => setPlayerDetails({ name: playerName, email: playerEmail, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-border)] flex justify-end">
                    <Button
                      disabled={!playerName || !playerEmail || !playerPhone}
                      onClick={handleNext}
                      className="w-full sm:w-auto"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment & Summary */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-6">Booking Summary</h3>
                  
                  <div className="bg-[var(--color-background)] rounded-2xl p-6 border border-[var(--color-border)] space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border)]">
                      <div>
                        <p className="text-sm text-[var(--color-muted)] font-medium">Date & Time</p>
                        <p className="font-bold text-[var(--color-text)]">
                          {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                        </p>
                        <p className="text-[var(--color-text)]">{selectedSlot?.time} ({duration} mins)</p>
                      </div>
                      <button onClick={() => setStep(1)} className="text-[var(--color-primary)] text-sm font-medium hover:underline">Edit</button>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border)]">
                      <div>
                        <p className="text-sm text-[var(--color-muted)] font-medium">Player Details</p>
                        <p className="font-bold text-[var(--color-text)]">{playerName}</p>
                        <p className="text-[var(--color-text)] text-sm">{playerEmail}</p>
                      </div>
                      <button onClick={() => setStep(2)} className="text-[var(--color-primary)] text-sm font-medium hover:underline">Edit</button>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[var(--color-muted)]">Court Fee ({duration} mins)</span>
                        <span className="font-medium text-[var(--color-text)]">
                          ${(selectedCourt.pricePerHour * (duration / 60)).toFixed(2)}
                        </span>
                      </div>
                      {selectedSlot?.priceModifier && selectedSlot.priceModifier < 1 && (
                        <div className="flex justify-between items-center mb-2 text-amber-600 dark:text-amber-400">
                          <span>Off-peak Discount</span>
                          <span>-${(selectedCourt.pricePerHour * (duration / 60) * (1 - selectedSlot.priceModifier)).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--color-border)]">
                        <span className="text-lg font-bold text-[var(--color-text)]">Total</span>
                        <span className="text-2xl font-bold text-[var(--color-primary)]">
                          ${(selectedCourt.pricePerHour * (duration / 60) * (selectedSlot?.priceModifier || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-border)] flex justify-end">
                    <Button
                      onClick={handleConfirm}
                      className="w-full sm:w-auto"
                    >
                      Confirm & Pay
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-[var(--color-text)] mb-4">Booking Confirmed!</h2>
                  <p className="text-[var(--color-muted)] text-lg mb-8 max-w-md mx-auto">
                    Your court has been successfully booked. We've sent a confirmation email to <span className="font-medium text-[var(--color-text)]">{playerEmail}</span>.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => { resetBooking(); navigate('/bookings'); }}>
                      View My Bookings
                    </Button>
                    <Button variant="secondary" onClick={() => { resetBooking(); navigate('/courts'); }}>
                      Book Another Court
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
