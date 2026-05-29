import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AdminSidebar from '../components/admin/AdminSidebar';
import MenuItemsTab from '../components/admin/MenuItemsTab';
import SettingsTab from '../components/admin/SettingsTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';
import MenuItemForm from '../components/admin/MenuItemForm';

export default function Admin({
  menuItems,
  settings,
  onSaveMenuItem,
  onDeleteMenuItem,
  onUpdateSetting,
  addToast
}) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu'); // menu, settings, analytics
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Authenticate check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully.', 'info');
    navigate('/login');
  };

  const openFormModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveForm = async (payload) => {
    const saved = await onSaveMenuItem(payload);
    if (saved) {
      setIsModalOpen(false);
      addToast(editingItem ? 'Menu item updated!' : 'New item added successfully!', 'success');
    } else {
      addToast('Failed to save menu item.', 'error');
    }
  };

  const handleToggleAvailability = async (item) => {
    const payload = { ...item, is_available: !item.is_available };
    const saved = await onSaveMenuItem(payload);
    if (saved) {
      addToast(`${item.name} is now ${!item.is_available ? 'Available' : 'Sold Out'}`, 'info');
    }
  };

  if (!isAuthenticated) return null; // Avoid flashing dashboard during redirect

  return (
    <div className="min-h-screen bg-brand-50/50 dark:bg-darkBg pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-neutral-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-semibold">
              Manage Good Food menus, active hours, and support connections.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-white hover:bg-neutral-50 border border-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold px-4.5 py-2.5 rounded-xl transition-all text-xs"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Area */}
          <div className="lg:col-span-9">
            {activeTab === 'menu' && (
              <MenuItemsTab 
                menuItems={menuItems} 
                openModal={openFormModal} 
                onDeleteMenuItem={onDeleteMenuItem}
                onToggleAvailability={handleToggleAvailability}
              />
            )}
            
            {activeTab === 'settings' && (
              <SettingsTab 
                settings={settings} 
                onUpdateSetting={onUpdateSetting} 
                addToast={addToast} 
              />
            )}
            
            {activeTab === 'analytics' && <AnalyticsTab />}
          </div>

        </div>

      </div>

      {/* Editor Modal Popup */}
      <MenuItemForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingItem={editingItem} 
        onSave={handleSaveForm}
        addToast={addToast}
      />

    </div>
  );
}
