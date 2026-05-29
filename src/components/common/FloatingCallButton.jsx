import React, { useState } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';

export default function FloatingCallButton({ whatsappNumber }) {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+9779848962315"; // Owner phone target

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end space-y-3">
      {/* Expanded support widgets */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-3 animate-fade-in mb-1">
          {/* Direct Telephone link */}
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white py-2.5 px-4 rounded-xl shadow-lg border border-neutral-800 dark:border-neutral-700 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="text-xs font-bold font-display">Call Kitchen</span>
            <div className="bg-brand text-white p-1 rounded-lg">
              <Phone size={14} />
            </div>
          </a>

          {/* Direct WhatsApp link */}
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Good%20Food!%20I%2520have%2520a%2520question%2520about%2520my%2520order.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="text-xs font-bold font-display">Chat Support</span>
            <div className="bg-white text-green-500 p-1 rounded-lg">
              <MessageSquare size={14} />
            </div>
          </a>
        </div>
      )}

      {/* Main trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl text-white hover:scale-105 active:scale-95 transition-all duration-300 ${
          isOpen ? 'bg-neutral-800 dark:bg-neutral-700 rotate-45' : 'bg-brand animate-pulse-slow'
        }`}
        aria-label="Contact support info"
      >
        {isOpen ? <X size={24} /> : <Phone size={24} />}
      </button>
    </div>
  );
}
