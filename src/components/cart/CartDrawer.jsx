import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Send, ShoppingBag, MapPin, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  whatsappNumber,
  triggerConfetti,
  addToast
}) {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim() || !deliveryAddress.trim()) {
      addToast('Please provide your name and delivery address first!', 'warning');
      return;
    }

    // Build the EXACT WhatsApp Message Template requested
    let message = `Hello Good Food 🍴\n\n`;
    message += `I would like to place an order:\n\n`;
    message += `━━━━━━━━━━━━━━\n`;
    message += `ORDER DETAILS\n`;
    message += `━━━━━━━━━━━━━━\n\n`;
    
    cart.forEach(item => {
      const lineCost = item.price * item.quantity;
      message += `• ${item.name} × ${item.quantity} = Rs. ${lineCost}\n`;
    });

    message += `\n━━━━━━━━━━━━━━\n`;
    message += `TOTAL: Rs. ${totalPrice}\n`;
    message += `━━━━━━━━━━━━━━\n\n`;
    message += `Delivery Type: Home Delivery\n`;
    message += `Customer Name: ${customerName.trim()}\n`;
    message += `Delivery Address: ${deliveryAddress.trim()}\n\n`;
    message += `Please confirm my order.\n`;
    message += `Thank you ❤️`;

    // Target WhatsApp Phone: ensure it has the 977 prefix
    let targetPhone = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, '') : '9779811117891';
    if (!targetPhone.startsWith('977') && (targetPhone.startsWith('98') || targetPhone.startsWith('97')) && (targetPhone.length === 9 || targetPhone.length === 10)) {
      targetPhone = '977' + targetPhone;
    }

    // Encode text
    const encodedText = encodeURIComponent(message);
    const waUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

    // Celebration
    if (triggerConfetti) triggerConfetti();
    addToast('Redirecting to WhatsApp...', 'success');

    // Redirect
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
          />

          {/* Sliding drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 z-50"
          >
            <div className="w-screen max-w-md bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-2xl flex flex-col justify-between border-l border-neutral-100 dark:border-neutral-800">
              
              {/* Header */}
              <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xs">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-brand/10 rounded-xl text-brand">
                    <ShoppingBag size={20} />
                  </div>
                  <h2 className="font-display font-extrabold text-xl text-neutral-900 dark:text-white">Your Tray</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="flex items-center justify-between border border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl bg-neutral-50/30 dark:bg-neutral-850/30 hover:bg-neutral-50/80 dark:hover:bg-neutral-850/80 hover:shadow-xs transition-all duration-300 gap-4"
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/20 shadow-xs flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-neutral-800 dark:text-neutral-100 truncate text-sm leading-tight">{item.name}</h4>
                        <p className="text-xs font-extrabold text-brand mt-1">Rs. {item.price}</p>
                        
                        {/* Quantity switches */}
                        <div className="flex items-center space-x-2 mt-2 bg-neutral-100/80 dark:bg-neutral-800/80 p-1 rounded-lg w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-650 text-neutral-500 dark:text-neutral-200 rounded-md shadow-2xs transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-display font-bold text-xs px-2 text-neutral-700 dark:text-neutral-200">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-650 text-neutral-500 dark:text-neutral-200 rounded-md shadow-2xs transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 px-4 space-y-5 text-neutral-400 dark:text-neutral-500 max-w-[280px] mx-auto flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-brand/10 dark:bg-brand/20 text-brand flex items-center justify-center shadow-lg shadow-brand/5">
                      <ShoppingBag size={28} className="animate-pulse" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-neutral-700 dark:text-neutral-200 text-base">Your tray is empty</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2 leading-relaxed">
                        Browse our fresh food catalog and add some delicious homemade delicacies to your cart.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="bg-brand hover:bg-brand-600 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-brand/10"
                    >
                      Start Ordering
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Forms & Checkout Actions */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-4">
                  <form onSubmit={handleWhatsAppOrder} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-display font-bold text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                        Delivery Details
                      </h3>
                    </div>
                    
                    {/* User Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <UserIcon size={14} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-750 rounded-xl text-xs focus:ring-1 focus:ring-brand focus:border-brand text-neutral-800 dark:text-neutral-100 font-semibold shadow-2xs"
                      />
                    </div>

                    {/* User Address */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <MapPin size={14} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Delivery Location (e.g. Bharatpur, Nepal)"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-750 rounded-xl text-xs focus:ring-1 focus:ring-brand focus:border-brand text-neutral-800 dark:text-neutral-100 font-semibold shadow-2xs"
                      />
                    </div>

                    {/* Subtotal summary */}
                    <div className="pt-2 flex justify-between items-center text-neutral-900 dark:text-white font-display">
                      <span className="font-bold text-neutral-500 text-xs uppercase tracking-wide">Grand Total:</span>
                      <span className="font-black text-2xl text-brand">Rs. {totalPrice}</span>
                    </div>

                    {/* WhatsApp Action Button */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-display font-bold py-4 px-4 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.015] active:scale-[0.985] transition-all duration-200 text-sm tracking-wide"
                    >
                      <Send size={15} />
                      <span>Order on WhatsApp (Home Delivery)</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
