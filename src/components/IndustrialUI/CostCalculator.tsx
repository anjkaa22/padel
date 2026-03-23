import React, { useState } from 'react';
import { Settings2, Check } from 'lucide-react';

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
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16">
          <div className="w-16 h-16 bg-[#1A1A1A] border border-gray-800 flex items-center justify-center">
            <Settings2 className="w-8 h-8 text-[#FF6B00]" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">Court <br className="hidden md:block"/>Configurator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            {/* Court Type */}
            <div>
              <h3 className="text-sm font-bold mb-8 text-[#FF6B00] uppercase tracking-[0.2em]">01. Select Court Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COURT_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`p-8 border text-left transition-all duration-300 magnetic ${
                      selectedType.id === type.id 
                        ? 'border-[#FF6B00] bg-[#FF6B00]/5' 
                        : 'border-gray-800 hover:border-gray-600 bg-[#111111]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-2xl font-display font-bold uppercase tracking-tight">{type.name}</h4>
                      {selectedType.id === type.id && <Check className="w-6 h-6 text-[#FF6B00]" />}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h3 className="text-sm font-bold mb-8 text-[#FF6B00] uppercase tracking-[0.2em]">02. Select Add-ons</h3>
              <div className="space-y-4">
                {ADDONS.map(addon => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full p-6 border flex items-center justify-between transition-all duration-300 magnetic ${
                      selectedAddons.includes(addon.id)
                        ? 'border-[#FF6B00] bg-[#FF6B00]/5'
                        : 'border-gray-800 hover:border-gray-600 bg-[#111111]'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${
                        selectedAddons.includes(addon.id) ? 'border-[#FF6B00] bg-[#FF6B00]' : 'border-gray-600'
                      }`}>
                        {selectedAddons.includes(addon.id) && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-bold font-display text-lg uppercase tracking-wide">{addon.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-10 border border-gray-800 bg-[#111111]">
              <h3 className="text-2xl font-display font-black mb-8 uppercase tracking-tighter border-b border-gray-800 pb-6">Configuration Summary</h3>
              
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
                          <div className="w-1.5 h-1.5 bg-[#FF6B00]" />
                          <span className="text-gray-300 font-medium text-sm uppercase tracking-wide">{addon.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button className="w-full py-5 bg-[#FF6B00] text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-[#e66000] transition-colors magnetic mt-4">
                Request Formal Quote
              </button>
              <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
                * Our team will contact you within 24 hours to discuss your project requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
