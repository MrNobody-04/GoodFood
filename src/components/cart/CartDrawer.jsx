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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50"
          >
            <div className="w-screen max-w-md bg-white dark:bg-neutral-900 shadow-2xl flex flex-col justify-between border-l border-neutral-100 dark:border-neutral-800">
              
              {/* Header */}
              <div className="p-6 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="text-brand" size={22} />
                  <h2 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white">Your Cart</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between border border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-850/50 gap-4"
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-850 flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-neutral-800 dark:text-neutral-150 truncate text-base">{item.name}</h4>
                        <p className="text-sm font-semibold text-brand mt-0.5">Rs. {item.price}</p>
                        
                        {/* Quantity switches */}
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-md border border-neutral-200 dark:border-neutral-700"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-bold text-sm px-2 text-neutral-700 dark:text-neutral-200">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-md border border-neutral-200 dark:border-neutral-700"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 space-y-4 text-neutral-400 dark:text-neutral-500 max-w-[280px] mx-auto">
                    <ShoppingBag size={48} className="mx-auto text-neutral-300 dark:text-neutral-750 animate-pulse" />
                    <div>
                      <p className="font-bold text-neutral-700 dark:text-neutral-355 text-base">Your cart is empty</p>
                      <p className="text-xs text-neutral-400 mt-1 leading-normal">
                        Browse our dishes and add some mouthwatering meals to your tray!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Forms & Checkout Actions */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-4">
                  <form onSubmit={handleWhatsAppOrder} className="space-y-3">
                    <h3 className="font-bold text-sm text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                      Delivery Details
                    </h3>
                    
                    {/* User Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <UserIcon size={15} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand text-neutral-850 dark:text-neutral-100 font-semibold"
                      />
                    </div>

                    {/* User Address */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <MapPin size={15} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Delivery Address (e.g. Lazimpat, Kathmandu)"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand text-neutral-850 dark:text-neutral-100 font-semibold"
                      />
                    </div>

                    {/* Subtotal summary */}
                    <div className="pt-2 flex justify-between items-center text-neutral-900 dark:text-white font-display">
                      <span className="font-semibold text-neutral-500">Order Total:</span>
                      <span className="font-extrabold text-2xl text-brand">Rs. {totalPrice}</span>
                    </div>

                    {/* WhatsApp Action Button */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                    >
                      <Send size={18} />
                      <span>Place Order on WhatsApp</span>
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
