import React from 'react';
import { Utensils, Settings, BarChart3, ClipboardList } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'orders', label: 'Active Orders', icon: <ClipboardList size={18} /> },
    { id: 'menu', label: 'Menu Items', icon: <Utensils size={18} /> },
    { id: 'settings', label: 'Order Settings', icon: <Settings size={18} /> },
    { id: 'analytics', label: 'Kitchen Analytics', icon: <BarChart3 size={18} /> }
  ];

  return (
    <div className="space-y-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all ${
            activeTab === tab.id
              ? 'bg-brand text-white shadow-md shadow-brand/10'
              : 'bg-white hover:bg-neutral-50 dark:bg-neutral-850 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-100/50 dark:border-neutral-800'
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
