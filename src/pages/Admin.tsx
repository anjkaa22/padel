import React, { useState } from 'react';
import { MOCK_BOOKINGS, MOCK_COURTS } from '../utils/mockData';
import { format } from 'date-fns';
import { Settings, Users, Calendar, DollarSign, TrendingUp, Search, Filter } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const totalRevenue = MOCK_BOOKINGS.reduce((sum, b) => sum + b.price, 0);
  const totalBookings = MOCK_BOOKINGS.length;

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] hidden md:flex flex-col">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-display font-bold text-[var(--color-text)]">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp size={20} /> },
            { id: 'bookings', label: 'Bookings', icon: <Calendar size={20} /> },
            { id: 'courts', label: 'Courts', icon: <Settings size={20} /> },
            { id: 'users', label: 'Users', icon: <Users size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-display font-bold text-[var(--color-text)]">Dashboard Overview</h1>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-muted)]">Total Revenue</p>
                    <p className="text-2xl font-bold text-[var(--color-text)]">${totalRevenue}</p>
                  </div>
                </div>
                <div className="text-sm text-[var(--color-success)] flex items-center gap-1">
                  <TrendingUp size={16} />
                  <span>+12.5% from last month</span>
                </div>
              </div>

              <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-muted)]">Total Bookings</p>
                    <p className="text-2xl font-bold text-[var(--color-text)]">{totalBookings}</p>
                  </div>
                </div>
                <div className="text-sm text-[var(--color-success)] flex items-center gap-1">
                  <TrendingUp size={16} />
                  <span>+5.2% from last month</span>
                </div>
              </div>

              <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
                    <Settings size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-muted)]">Active Courts</p>
                    <p className="text-2xl font-bold text-[var(--color-text)]">{MOCK_COURTS.length}</p>
                  </div>
                </div>
                <div className="text-sm text-[var(--color-muted)]">
                  All courts operational
                </div>
              </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center">
                <h2 className="text-xl font-bold text-[var(--color-text)]">Recent Bookings</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-background)] border-b border-[var(--color-border)]">
                      <th className="p-4 text-sm font-semibold text-[var(--color-muted)]">ID</th>
                      <th className="p-4 text-sm font-semibold text-[var(--color-muted)]">Court</th>
                      <th className="p-4 text-sm font-semibold text-[var(--color-muted)]">Date & Time</th>
                      <th className="p-4 text-sm font-semibold text-[var(--color-muted)]">Status</th>
                      <th className="p-4 text-sm font-semibold text-[var(--color-muted)]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_BOOKINGS.map((booking) => (
                      <tr key={booking.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors">
                        <td className="p-4 text-sm font-medium text-[var(--color-text)]">#{booking.id}</td>
                        <td className="p-4 text-sm text-[var(--color-muted)]">{MOCK_COURTS.find(c => c.id === booking.courtId)?.name}</td>
                        <td className="p-4 text-sm text-[var(--color-muted)]">{format(booking.date, 'MMM d')} at {booking.time}</td>
                        <td className="p-4">
                          <Badge variant={booking.status === 'Confirmed' ? 'success' : 'default'}>{booking.status}</Badge>
                        </td>
                        <td className="p-4 text-sm font-medium text-[var(--color-text)]">${booking.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'dashboard' && (
          <div className="flex items-center justify-center h-full text-[var(--color-muted)]">
            <p>This section is under construction.</p>
          </div>
        )}
      </main>
    </div>
  );
};
