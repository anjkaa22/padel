import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Courts } from './pages/Courts';
import { Booking } from './pages/Booking';
import { MyBookings } from './pages/MyBookings';
import { Admin } from './pages/Admin';
import { CourtDetails } from './pages/CourtDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courts" element={<Courts />} />
          <Route path="courts/:id" element={<CourtDetails />} />
          <Route path="book" element={<Booking />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
