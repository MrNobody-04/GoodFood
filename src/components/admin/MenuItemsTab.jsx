import React from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

export default function MenuItemsTab({ menuItems, openModal, onDeleteMenuItem, onToggleAvailability }) {
  
  const stats = {
    totalItems: menuItems.length,
    activeItems: menuItems.filter(i => i.is_available).length,
    soldOutItems: menuItems.filter(i => !i.is_available).length,
  };

  return (
    <div className="space-y-6">
      {/* Mini Stats Summary card row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Items', val: stats.totalItems, color: 'text-neutral-800 dark:text-white' },
          { label: 'Available', val: stats.activeItems, color: 'text-green-500' },
          { label: 'Sold Out', val: stats.soldOutItems, color: 'text-brand' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-neutral-850 p-4.5 rounded-2.5xl border border-neutral-100 dark:border-neutral-800 text-center">
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{stat.label}</p>
            <p className={`font-display font-extrabold text-2xl mt-1.5 ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Heading & Add CTA */}
      <div className="flex justify-between items-center bg-white dark:bg-neutral-850 p-4.5 rounded-2.5xl border border-neutral-100 dark:border-neutral-800">
        <span className="font-bold text-neutral-800 dark:text-neutral-200">Total Dishes ({menuItems.length})</span>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-1.5 bg-brand hover:bg-brand-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-xs"
        >
          <Plus size={16} />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Table Data */}
      <div className="bg-white dark:bg-neutral-850 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-800 text-xs font-bold text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Item Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                  
                  {/* Photo & Name */}
                  <td className="px-6 py-4.5 flex items-center space-x-3 min-w-[220px]">
                    <img 
                      src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=80&h=80'} 
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded-xl bg-neutral-100 dark:bg-neutral-900 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-neutral-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate max-w-[150px]">{item.description}</p>
                    </div>
                  </td>

                  {/* Category tag */}
                  <td className="px-6 py-4.5">
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4.5 font-bold text-neutral-900 dark:text-white">
                    Rs. {item.price}
                  </td>

                  {/* Available status button toggle */}
                  <td className="px-6 py-4.5">
                    <button
                      onClick={() => onToggleAvailability(item)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        item.is_available
                          ? 'bg-green-50 dark:bg-green-950/20 text-green-600 hover:bg-green-100'
                          : 'bg-red-50 dark:bg-red-950/20 text-brand hover:bg-red-100'
                      }`}
                    >
                      {item.is_available ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span>{item.is_available ? 'Available' : 'Sold Out'}</span>
                    </button>
                  </td>

                  {/* Editing CTA actions */}
                  <td className="px-6 py-4.5 text-right space-x-2">
                    <button
                      onClick={() => openModal(item)}
                      className="p-2 text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      aria-label="Edit dish"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteMenuItem(item.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      aria-label="Delete dish"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
