import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '../components/menu/MenuCard';
import { useCart } from '../hooks/useCart';

export default function Menu({ menuItems, addToast }) {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Pizza', 'Burgers', 'Momo', 'Nepali Foods', 'Drinks', 'Desserts'];

  // Filter logic
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchTerm, activeCategory]);

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      
      {/* Title Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="font-display font-bold uppercase tracking-wider text-xs text-brand">
          Explore Our Kitchen
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-900 dark:text-white">
          Our Handcrafted Menu
        </h2>
        <div className="h-1.5 w-16 bg-brand mx-auto rounded-full" />
      </div>

      {/* Control bar */}
      <div className="space-y-6 mb-12">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search pizza, burger, momos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent font-medium shadow-sm transition-all duration-200 text-neutral-800 dark:text-neutral-100"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-neutral-400 hover:text-brand"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories sliding tabs */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none justify-start md:justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide flex-shrink-0 transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand text-white shadow-md shadow-brand/20 scale-[1.02]'
                  : 'bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border border-neutral-100 dark:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid mapping */}
      <AnimatePresence mode="popLayout">
        {filteredItems.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                addToCart={addToCart} 
                addToast={addToast} 
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 space-y-4 max-w-sm mx-auto"
          >
            <div className="bg-neutral-100 dark:bg-neutral-800 p-5 rounded-full inline-block text-neutral-400">
              <ShoppingBag size={40} />
            </div>
            <h3 className="font-display font-bold text-xl text-neutral-700 dark:text-neutral-300">No Food Items Found</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Try adjusting your search criteria or look under other category tabs!
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="text-brand font-bold text-sm hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
