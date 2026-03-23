import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-[#0A0A0A] text-white relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-6">
                Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-400">Touch</span>
              </h2>
              <p className="text-gray-400 max-w-md text-lg mb-12">
                Ready to build your dream court or need premium gear? Contact our team of experts today.
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] border border-gray-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#E85D04]" />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase tracking-wider mb-1">Call Us</h4>
                  <a href="tel:+971502895251" className="block text-gray-400 hover:text-[#E85D04] transition-colors">+971 50 289 5251</a>
                  <a href="tel:+971522204181" className="block text-gray-400 hover:text-[#E85D04] transition-colors">+971 52 220 4181</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] border border-gray-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#E85D04]" />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase tracking-wider mb-1">Email Us</h4>
                  <a href="mailto:info@padelzone.ae" className="text-gray-400 hover:text-[#E85D04] transition-colors">info@padelzone.ae</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] border border-gray-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#E85D04]" />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-gray-400">Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-gray-800 p-8 md:p-12 relative">
            {/* Toasts */}
            {status === 'success' && (
              <div className="absolute top-4 right-4 left-4 bg-[#E85D04] text-white p-4 flex items-center gap-3 shadow-lg z-50 animate-fade-in">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-bold uppercase tracking-wider">Message sent successfully!</p>
              </div>
            )}
            {status === 'error' && (
              <div className="absolute top-4 right-4 left-4 bg-red-600 text-white p-4 flex items-center gap-3 shadow-lg z-50 animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-bold uppercase tracking-wider">Please fill all fields correctly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Name</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-gray-800 p-4 text-white focus:outline-none focus:border-[#E85D04] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone</label>
                  <input 
                    type="tel" 
                    id="contact-phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-gray-800 p-4 text-white focus:outline-none focus:border-[#E85D04] transition-colors"
                    placeholder="+971 50 000 0000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-gray-800 p-4 text-white focus:outline-none focus:border-[#E85D04] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  id="contact-message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#1A1A1A] border border-gray-800 p-4 text-white focus:outline-none focus:border-[#E85D04] transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full btn-primary py-4 text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
