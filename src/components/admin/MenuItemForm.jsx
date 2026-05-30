import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuItemForm({ isOpen, onClose, editingItem, onSave, addToast }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Pizza');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  // Sync edits
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || '');
      setCategory(editingItem.category || 'Pizza');
      setPrice(editingItem.price || '');
      setImageUrl(editingItem.image_url || '');
      setDescription(editingItem.description || '');
      setIsAvailable(editingItem.is_available ?? true);
    } else {
      setName('');
      setCategory('Pizza');
      setPrice('');
      setImageUrl('');
      setDescription('');
      setIsAvailable(true);
    }
  }, [editingItem, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      addToast('Item name and price are required!', 'warning');
      return;
    }

    const payload = {
      name,
      category,
      price: Number(price),
      image_url: imageUrl,
      description,
      is_available: isAvailable
    };

    if (editingItem) {
      payload.id = editingItem.id;
    }

    onSave(payload);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs z-55 transition-opacity"
          />

          {/* Modal frame */}
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-neutral-850 max-w-lg w-full rounded-[2rem] border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-850 rounded-xl text-neutral-500"
              >
                <X size={18} />
              </button>

              <h3 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white mb-6">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Spicy Momo Platter"
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-850 dark:text-neutral-100 text-sm font-semibold focus:ring-1 focus:ring-brand focus:border-brand"
                  />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Price (Rs.) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 350"
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-850 dark:text-neutral-100 text-sm font-semibold focus:ring-1 focus:ring-brand focus:border-brand no-spin"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-850 dark:text-neutral-100 text-sm font-semibold focus:ring-1 focus:ring-brand focus:border-brand cursor-pointer"
                    >
                      {['Momo', 'Snacks', 'Noodles', 'Biriyani', 'Burgers & Rolls', 'Pizza', 'Rice & Roti', 'Khaja & Curry', 'Special Items'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Image URL</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-850 dark:text-neutral-100 text-sm font-semibold focus:ring-1 focus:ring-brand focus:border-brand"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description of taste, portions, or key ingredients..."
                    rows="3"
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-850 dark:text-neutral-100 text-sm font-medium focus:ring-1 focus:ring-brand focus:border-brand"
                  />
                </div>

                {/* Available toggle */}
                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="modal-item-available"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="h-4.5 w-4.5 text-brand rounded border-neutral-300 focus:ring-brand cursor-pointer"
                  />
                  <label htmlFor="modal-item-available" className="text-sm font-bold text-neutral-700 dark:text-neutral-200 cursor-pointer">
                    Mark as Available (Customers can add to cart)
                  </label>
                </div>

                {/* Actions row */}
                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-750 dark:text-neutral-200 font-bold rounded-xl text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-brand hover:bg-brand-600 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  >
                    Save changes
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
