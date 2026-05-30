import React from 'react';
import { ShoppingCart, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MenuCard({ item, addToCart, addToast }) {
  const handleAdd = () => {
    addToCart(item);
    if (addToast) {
      addToast(`Added ${item.name} to cart!`, 'success');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`group flex flex-col justify-between bg-white dark:bg-neutral-850 rounded-3xl border border-neutral-100 dark:border-neutral-800/80 overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 ${
        !item.is_available ? 'opacity-75' : ''
      }`}
    >
      {/* Food Image */}
      <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img
          src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Category tag */}
        <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
          {item.category}
        </span>

        {/* Unavailable overlay mask */}
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex flex-col items-center justify-center text-white">
            <EyeOff size={28} className="mb-1 text-neutral-300 animate-pulse" />
            <span className="font-display font-black uppercase text-xs tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-display font-extrabold text-lg text-neutral-950 dark:text-neutral-50 group-hover:text-brand transition-colors duration-205 truncate">
              {item.name}
            </h3>
            <span className="font-display font-black text-base text-brand whitespace-nowrap">
              Rs. {item.price}
            </span>
          </div>
          
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed font-medium">
            {item.description || 'Homemade delicious recipe prepared with premium fresh ingredients.'}
          </p>
        </div>

        {/* Button action */}
        <div>
          {item.is_available ? (
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center space-x-2 bg-brand hover:bg-brand-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-brand/10 hover:shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-xs tracking-wider uppercase"
            >
              <ShoppingCart size={14} />
              <span>Add to Tray</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center space-x-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-450 dark:text-neutral-505 font-bold py-3.5 px-4 rounded-xl cursor-not-allowed text-xs uppercase"
            >
              <span>Sold Out</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
