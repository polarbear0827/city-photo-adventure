import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface SlotSpinnerProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isSpinning: boolean;
  onSpinEnd: (selectedItem: T) => void;
  height?: number;
}

export function SlotSpinner<T>({ items, renderItem, isSpinning, onSpinEnd, height = 80 }: SlotSpinnerProps<T>) {
  const controls = useAnimation();
  
  // We need enough copies so that animation has enough items to scroll through seamlessly
  // For a 3 second spin, depending on height, 5-10 copies usually suffice.
  // Assuming about 20-30 items, 5 copies = 100-150 items.
  const displayItems = [...items, ...items, ...items, ...items, ...items];
  
  const onSpinEndRef = React.useRef(onSpinEnd);
  
  useEffect(() => {
    onSpinEndRef.current = onSpinEnd;
  }, [onSpinEnd]);

  useEffect(() => {
    if (isSpinning && items.length > 0) {
      // Target in the 4th copy block to allow enough spin distance
      const baseIndex = items.length * 3; 
      const rIndex = Math.floor(Math.random() * items.length);
      const target = baseIndex + rIndex;
      
      controls.start({
        y: -target * height,
        transition: {
          duration: 3 + Math.random() * 1.5, // 3 to 4.5 seconds
          ease: [0.15, 0.9, 0.25, 1], // Custom slow down ease
        }
      }).then(() => {
        // Instantly reset position to the first block representing the exact same item
        // This avoids running out of items if user spins over and over without remounting
        controls.set({ y: -rIndex * height });
        if (onSpinEndRef.current) {
          onSpinEndRef.current(items[rIndex]);
        }
      });
    }
  }, [isSpinning, controls, items, height]);

  return (
    <div 
      className="relative overflow-hidden bg-surface rounded-2xl border border-white/5 shadow-2xl"
      style={{ height, width: '100%' }}
    >
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.8),inset_0_-20px_20px_-10px_rgba(0,0,0,0.8)]" />
      <motion.div animate={controls} initial={{ y: 0 }}>
        {displayItems.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center font-bold text-xl md:text-3xl w-full select-none"
            style={{ height }}
          >
            {renderItem(item)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
