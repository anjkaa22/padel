import React, { useState } from 'react';
import { Settings2, Check } from 'lucide-react';
import { motion } from 'motion/react';

const COURT_TYPES = [
  { id: 'classic', name: 'Classic Court', desc: 'Standard pillar structure with robust steel frames.' },
  { id: 'panoramic', name: 'Panoramic Court', desc: 'Seamless glass backwalls for unobstructed viewing.' },
];

const ADDONS = [
  { id: 'led', name: '200W LED Lighting System' },
  { id: 'turf', name: 'Premium Monofilament Turf' },
  { id: 'branding', name: 'Custom Club Branding' },
];

export const CostCalculator = () => {
  const [selectedType, setSelectedType] = useState(COURT_TYPES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-32 bg-[#0A0A0A] text-white border-t border-gray-900" id="calculator">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-center gap-6 mb-16"
        >
          <div className="w-16 h-16 bg-[#1A1A1A] border border-gray-800 flex items-center justify-center">
            <Settings2 className="w-8 h-8 text-[#E85D04]" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">Court <br className="hidden sm:block"/>Configurator</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2 space-y-16"
          >
            {/* Court Type */}
            <div>
              <h3 className="text-sm font-bold mb-8 text-[#E85D04] uppercase tracking-[0.2em]">01. Select Court Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COURT_TYPES.map(type => (
                  <motion.button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: '#E85D04',
                      boxShadow: '0 10px 30px rgba(232, 93, 4, 0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-8 border text-left transition-all duration-300 magnetic ${
                      selectedType.id === type.id 
                        ? 'border-[#E85D04] bg-[#E85D04]/5' 
                        : 'border-gray-800 hover:border-gray-600 bg-[#111111]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-2xl font-display font-bold uppercase tracking-tight">{type.name}</h4>
                      {selectedType.id === type.id && <Check className="w-6 h-6 text-[#E85D04]" />}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{type.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h3 className="text-sm font-bold mb-8 text-[#E85D04] uppercase tracking-[0.2em]">02. Select Add-ons</h3>
              <div className="space-y-4">
                {ADDONS.map(addon => (
                  <motion.button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    whileHover={{ 
                      x: 10, 
                      borderColor: '#E85D04',
                      boxShadow: '0 5px 15px rgba(232, 93, 4, 0.05)'
                    }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full p-6 border flex items-center justify-between transition-all duration-300 magnetic ${
                      selectedAddons.includes(addon.id)
                        ? 'border-[#E85D04] bg-[#E85D04]/5'
                        : 'border-gray-800 hover:border-gray-600 bg-[#111111]'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${
                        selectedAddons.includes(addon.id) ? 'border-[#E85D04] bg-[#E85D04]' : 'border-gray-600'
                      }`}>
                        {selectedAddons.includes(addon.id) && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-bold font-display text-lg uppercase tracking-wide">{addon.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-1"
          >
            <div className="sticky top-32 p-6 md:p-10 border border-gray-800 bg-[#111111]">
              <h3 className="text-xl md:text-2xl font-display font-black mb-6 md:mb-8 uppercase tracking-tighter border-b border-gray-800 pb-4 md:pb-6">Configuration Summary</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em]">Base Structure</span>
                  <span className="font-bold text-xl text-white font-display uppercase tracking-tight">{selectedType.name}</span>
                </div>
                
                {selectedAddons.length > 0 && (
                  <div className="flex flex-col gap-4 pt-6 border-t border-gray-800/50">
                    <span className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em]">Selected Upgrades</span>
                    {selectedAddons.map(id => {
                      const addon = ADDONS.find(a => a.id === id)!;
                      return (
                        <div key={id} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-[#E85D04]" />
                          <span className="text-gray-300 font-medium text-sm uppercase tracking-wide">{addon.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button className="w-full py-5 bg-[#E85D04] text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-[#e66000] transition-colors magnetic">
                  Request Formal Quote
                </button>
                <button className="w-full py-4 bg-transparent border border-gray-700 text-gray-300 font-bold uppercase tracking-[0.2em] text-xs hover:border-white hover:text-white transition-colors magnetic">
                  Download PDF Quote
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
                * Prices are estimates and subject to site inspection.<br/>
                Our team will contact you within 24 hours to discuss your project requirements.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
