import React from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] bg-[#050200] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Website Branding */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-16"
      >
        <div className="w-12 h-12 bg-[#E85D04] flex items-center justify-center font-bold text-white text-3xl font-display">P</div>
        <span className="text-white font-bold text-3xl tracking-widest uppercase font-display">Zone</span>
      </motion.div>

      {/* Progress Container */}
      <div className="relative w-64 md:w-80">
        {/* Loading Line */}
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#E85D04]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Moving Padel Ball */}
        <motion.div 
          className="absolute -top-6 left-0 -ml-4 w-8 h-8 bg-[#D4F000] rounded-full shadow-lg flex items-center justify-center"
          style={{ left: `${progress}%` }}
          animate={{
            y: [0, -15, 0],
            rotate: progress * 3.6 // Rotate as it moves
          }}
          transition={{
            y: {
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 0.1,
              ease: "linear"
            }
          }}
        >
          {/* Ball Seams */}
          <div className="absolute inset-0 border border-white/30 rounded-full rotate-45 scale-90"></div>
          <div className="absolute inset-0 border border-white/30 rounded-full -rotate-45 scale-90"></div>
        </motion.div>

        {/* Percentage Text */}
        <div className="mt-8 flex flex-col items-center">
          <span className="text-[#FF6B00] font-mono text-sm font-bold tracking-widest">
            {Math.round(progress)}%
          </span>
          <motion.p 
            className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mt-2 font-medium"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing Elite Courts
          </motion.p>
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>
    </motion.div>
  );
};
