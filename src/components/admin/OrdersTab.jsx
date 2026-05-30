import React, { useState } from 'react';
import { Clock, MapPin, User, CheckCircle2, ChevronRight, RefreshCw, XCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrdersTab({ orders, onUpdateStatus, isLoading, onRefresh }) {
  const [filter, setFilter] = useState('All');

  const filteredOrders = orders.filter(order => {
    if (filter === 'All') return true;
    return order.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'preparing':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getFormattedTime = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (' + date.toLocaleDateString() + ')';
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Mini Stats Summary card row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', val: orders.length, color: 'text-neutral-800 dark:text-white' },
          { label: 'Pending', val: orders.filter(o => o.status === 'Pending').length, color: 'text-blue-500' },
          { label: 'Preparing', val: orders.filter(o => o.status === 'Preparing').length, color: 'text-amber-500' },
          { label: 'Completed', val: orders.filter(o => o.status === 'Completed').length, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-neutral-850 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 text-center shadow-2xs">
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{stat.label}</p>
            <p className={`font-display font-extrabold text-xl mt-1 ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Filter and Refresh Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-neutral-850 p-4 rounded-2.5xl border border-neutral-100 dark:border-neutral-800 gap-4">
        {/* Status filtering tabs */}
        <div className="flex overflow-x-auto pb-1 -mx-2 px-2 scrollbar-none gap-1.5 w-full sm:w-auto">
          {['All', 'Pending', 'Preparing', 'Completed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                filter === tab
                  ? 'bg-brand text-white shadow-sm shadow-brand/10'
                  : 'bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center space-x-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 font-bold px-4 py-2.5 rounded-xl text-xs disabled:opacity-50 transition-colors w-full sm:w-auto justify-center"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Orders List Container */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white dark:bg-neutral-850 p-12 rounded-3xl border border-neutral-100 dark:border-neutral-800 text-center">
            <RefreshCw size={24} className="animate-spin text-brand mx-auto mb-3" />
            <p className="text-sm font-semibold text-neutral-500">Loading order log...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="bg-white dark:bg-neutral-850 rounded-3xl border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 space-y-6"
              >
                {/* Top Info Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-100 dark:border-neutral-800 pb-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-black text-lg text-neutral-900 dark:text-white">
                        Order #{order.order_number}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-450 dark:text-neutral-550 font-medium">
                      <Clock size={12} />
                      <span>{getFormattedTime(order.created_at)}</span>
                    </div>
                  </div>

                  {/* Actions for Status updates */}
                  <div className="flex flex-wrap gap-2">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => onUpdateStatus(order.id, 'Preparing')}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                      >
                        Start Preparing
                      </button>
                    )}
                    {(order.status === 'Pending' || order.status === 'Preparing') && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(order.id, 'Completed')}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition-colors"
                        >
                          <CheckCircle2 size={13} />
                          <span>Mark Delivered</span>
                        </button>
                        <button
                          onClick={() => onUpdateStatus(order.id, 'Cancelled')}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition-colors border border-red-500/20"
                        >
                          <XCircle size={13} />
                          <span>Cancel</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Main section content (details & items list) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Customer details */}
                  <div className="md:col-span-4 space-y-4">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Customer Info</h4>
                    <div className="space-y-3 font-medium text-sm text-neutral-600 dark:text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <User size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                        <span className="font-bold text-neutral-800 dark:text-neutral-100">{order.customer_name}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin size={15} className="text-brand shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{order.delivery_address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Order Items */}
                  <div className="md:col-span-8 space-y-3">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Items Ordered</h4>
                    <div className="divide-y divide-neutral-100 dark:divide-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 border border-neutral-100 dark:border-neutral-800/80 rounded-2xl overflow-hidden">
                      {Array.isArray(order.items) ? (
                        order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 text-xs sm:text-sm">
                            <div className="flex items-center gap-3">
                              {item.image_url && (
                                <img src={item.image_url} alt={item.name} className="w-8 h-8 rounded-lg object-cover bg-neutral-200" />
                              )}
                              <div>
                                <p className="font-bold text-neutral-800 dark:text-neutral-150">{item.name}</p>
                                <p className="text-[10px] text-neutral-450 dark:text-neutral-500 font-semibold mt-0.5">Rs. {item.price} each</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-neutral-800 dark:text-neutral-150">Qty: {item.quantity}</p>
                              <p className="text-xs font-extrabold text-brand mt-0.5">Rs. {item.price * item.quantity}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="p-3 text-xs text-neutral-400">Unable to load ordered items.</p>
                      )}
                    </div>

                    {/* Total summary */}
                    <div className="flex justify-end items-center gap-2.5 pt-3 font-display">
                      <span className="font-bold text-xs text-neutral-400 uppercase tracking-wider">Total Received:</span>
                      <span className="font-black text-lg text-brand">Rs. {order.total_price}</span>
                    </div>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="bg-white dark:bg-neutral-850 p-16 rounded-3xl border border-neutral-100 dark:border-neutral-800 text-center max-w-md mx-auto space-y-4">
            <div className="bg-neutral-55 dark:bg-neutral-800 p-5 rounded-full inline-block text-neutral-400">
              <ShoppingBag size={36} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-neutral-800 dark:text-neutral-200">No Orders Here</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                There are currently no orders in the queue that match your filter status tab.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
