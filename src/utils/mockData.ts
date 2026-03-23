import { Court, TimeSlot } from '../store/useBookingStore';
import { addDays, format, isBefore, startOfDay } from 'date-fns';

export const MOCK_COURTS: Court[] = [
  {
    id: 'c1',
    name: 'Center Court Pro',
    location: 'Downtown Arena',
    pricePerHour: 120,
    type: 'indoor',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80',
    amenities: ['Air Conditioning', 'Showers', 'Pro Shop', 'Cafe'],
    dimensions: '20m x 10m',
  },
  {
    id: 'c2',
    name: 'Sunset Glass Court',
    location: 'Marina Beach',
    pricePerHour: 150,
    type: 'glass',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80', // Replace with better image
    amenities: ['Ocean View', 'Parking', 'Showers'],
    dimensions: '20m x 10m',
  },
  {
    id: 'c3',
    name: 'Community Court A',
    location: 'Sports Complex',
    pricePerHour: 80,
    type: 'outdoor',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80',
    amenities: ['Floodlights', 'Free Parking'],
    dimensions: '20m x 10m',
  },
  {
    id: 'c4',
    name: 'Community Court B',
    location: 'Sports Complex',
    pricePerHour: 80,
    type: 'outdoor',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80',
    amenities: ['Floodlights', 'Free Parking'],
    dimensions: '20m x 10m',
  },
];

// Generate slots for a specific date
export const generateSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 7; // 7 AM
  const endHour = 23; // 11 PM
  
  // Random seed based on date string to keep it consistent for the same day
  const seedStr = format(date, 'yyyy-MM-dd');
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed += seedStr.charCodeAt(i);
  }

  for (let hour = startHour; hour < endHour; hour++) {
    for (let min of [0, 30]) {
      const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      
      // Pseudo-random availability
      const isAvailable = ((seed + hour * 60 + min) % 10) > 3; // ~60% available
      
      // Off-peak discount before 10 AM and after 2 PM before 5 PM
      const isOffPeak = hour < 10 || (hour >= 14 && hour < 17);
      
      slots.push({
        id: `slot-${timeString}`,
        time: timeString,
        isAvailable,
        priceModifier: isOffPeak ? 0.8 : 1, // 20% off
      });
    }
  }
  
  return slots;
};

export const MOCK_BOOKINGS = [
  {
    id: 'b1',
    courtId: 'c1',
    date: addDays(new Date(), 2),
    time: '18:00',
    duration: 90,
    status: 'Confirmed',
    price: 180,
  },
  {
    id: 'b2',
    courtId: 'c2',
    date: addDays(new Date(), -5),
    time: '09:00',
    duration: 60,
    status: 'Completed',
    price: 120, // 150 * 0.8
  }
];
