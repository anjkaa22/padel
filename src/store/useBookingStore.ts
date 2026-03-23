import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Court = {
  id: string;
  name: string;
  location: string;
  pricePerHour: number;
  type: 'indoor' | 'outdoor' | 'glass';
  image: string;
  amenities: string[];
  dimensions: string;
};

export type TimeSlot = {
  id: string;
  time: string;
  isAvailable: boolean;
  priceModifier?: number; // e.g., 0.8 for 20% off
};

export type BookingStep = 1 | 2 | 3 | 4;

interface BookingState {
  step: BookingStep;
  selectedCourt: Court | null;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  duration: 60 | 90;
  playerName: string;
  playerEmail: string;
  playerPhone: string;
  
  // Actions
  setStep: (step: BookingStep) => void;
  selectCourt: (court: Court) => void;
  selectDate: (date: Date) => void;
  selectSlot: (slot: TimeSlot) => void;
  setDuration: (duration: 60 | 90) => void;
  setPlayerDetails: (details: { name: string; email: string; phone: string }) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      step: 1,
      selectedCourt: null,
      selectedDate: null,
      selectedSlot: null,
      duration: 60,
      playerName: '',
      playerEmail: '',
      playerPhone: '',

      setStep: (step) => set({ step }),
      selectCourt: (court) => set({ selectedCourt: court, step: 1 }),
      selectDate: (date) => set({ selectedDate: date }),
      selectSlot: (slot) => set({ selectedSlot: slot }),
      setDuration: (duration) => set({ duration }),
      setPlayerDetails: (details) => set({ 
        playerName: details.name, 
        playerEmail: details.email, 
        playerPhone: details.phone 
      }),
      resetBooking: () => set({
        step: 1,
        selectedCourt: null,
        selectedDate: null,
        selectedSlot: null,
        duration: 60,
        playerName: '',
        playerEmail: '',
        playerPhone: '',
      }),
    }),
    {
      name: 'padel-booking-storage',
      partialize: (state) => ({
        selectedCourt: state.selectedCourt,
        selectedDate: state.selectedDate,
        selectedSlot: state.selectedSlot,
        duration: state.duration,
        playerName: state.playerName,
        playerEmail: state.playerEmail,
        playerPhone: state.playerPhone,
      }),
    }
  )
);
