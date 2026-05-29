import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: {
      bg: 'bg-green-50 dark:bg-green-950/90 border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950/90 border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: <XCircle className="text-red-500 flex-shrink-0" size={18} />
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/90 border-amber-200 dark:border-amber-800',
      text: 'text-amber-800 dark:text-amber-200',
      icon: <AlertTriangle className="text-amber-500 flex-shrink-0" size={18} />
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/90 border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: <Info className="text-blue-500 flex-shrink-0" size={18} />
    }
  }[toast.type || 'info'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -5 }}
      className={`pointer-events-auto border rounded-2xl p-4 shadow-lg flex items-center justify-between space-x-3 w-full ${config.bg}`}
    >
      <div className="flex items-center space-x-3 min-w-0">
        {config.icon}
        <span className={`text-sm font-semibold truncate ${config.text}`}>
          {toast.message}
        </span>
      </div>
      
      <button 
        onClick={onClose}
        className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
