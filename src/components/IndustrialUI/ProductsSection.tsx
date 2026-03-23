import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion } from 'motion/react';

const PRODUCTS = [
  {
    id: 'pro-racket',
    name: 'Carbon Pro Padel Racket',
    category: 'Rackets',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80',
    desc: '100% Carbon fiber frame with EVA soft core for maximum power and control.',
    bestseller: true,
  },
  {
    id: 'elite-balls',
    name: 'Elite Tour Balls (3-Pack)',
    category: 'Balls',
    image: 'https://images.unsplash.com/photo-1589801258579-18e091f4ca26?auto=format&fit=crop&q=80',
    desc: 'High-durability pressurized balls designed for professional tournament play.',
  },
  {
    id: 'tour-bag',
    name: 'Tour Padel Bag',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553152531-ee9ea338eb22?auto=format&fit=crop&q=80',
    desc: 'Thermal compartments for up to 4 rackets, ventilated shoe pocket, and waterproof exterior.',
  },
  {
    id: 'grip-tape',
    name: 'Pro Overgrip (10-Pack)',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce156d?auto=format&fit=crop&q=80',
    desc: 'Maximum sweat absorption and tackiness for the perfect grip in any condition.',
  }
];

const CATEGORIES = ['All', 'Rackets', 'Balls', 'Accessories'];

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut",
    }
  })
};

export const ProductsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const openModal = (productName: string) => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct('');
  };

  const handleWhatsApp = (productName: string) => {
    const message = encodeURIComponent(`Hi, I would like to enquire about the ${productName}.`);
    window.open(`https://wa.me/971502895251?text=${message}`, '_blank');
  };

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-32 bg-[#131313] text-white relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-6">
              Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-400">Gear</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-lg">
              Professional grade equipment for players who demand the best.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === category 
                    ? 'bg-[#E85D04] border-[#E85D04] text-white' 
                    : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ 
                  y: -10, 
                  borderColor: '#E85D04',
                  boxShadow: '0 20px 40px rgba(232, 93, 4, 0.15)',
                  scale: 1.02
                }}
                className="bg-[#1A1A1A] border border-gray-800 group transition-all duration-300 flex flex-col relative"
              >
              {product.bestseller && (
                <div className="absolute top-4 left-4 z-10 bg-[#E85D04] text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                  Bestseller
                </div>
              )}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-[#E85D04] font-bold uppercase tracking-widest mb-2">{product.category}</div>
                <h3 className="font-display font-bold text-xl uppercase tracking-tight mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{product.desc}</p>
                
                <div className="space-y-3 mt-auto">
                  <button 
                    onClick={() => openModal(product.name)}
                    className="w-full btn-primary py-3 text-sm"
                  >
                    Enquire Now
                  </button>
                  <button 
                    onClick={() => handleWhatsApp(product.name)}
                    className="w-full btn-secondary py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Us
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-gray-800 w-full max-w-md p-8 relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="font-display font-bold text-2xl uppercase tracking-tight mb-6 text-[#E85D04]">
              Enquire About Product
            </h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
              <div>
                <label htmlFor="product" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product</label>
                <input 
                  type="text" 
                  id="product" 
                  value={selectedProduct} 
                  readOnly 
                  className="w-full bg-[#111111] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#E85D04]"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  className="w-full bg-[#111111] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#E85D04]"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  required 
                  className="w-full bg-[#111111] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#E85D04]"
                />
              </div>
              <button type="submit" className="w-full btn-primary mt-4">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
