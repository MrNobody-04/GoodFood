import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingCallButton from './components/common/FloatingCallButton';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/common/Toast';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { dbService } from './services/db';

// Context Providers
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Import Confetti dynamically
let confetti = null;
try {
  import('canvas-confetti').then(m => confetti = m.default);
} catch (e) {
  console.log('Confetti helper not loaded');
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const [menuItems, setMenuItems] = useState([]);
  const [settings, setSettings] = useState({
    whatsapp_number: '+9779848962315',
    delivery_available: 'true',
    admin_password: 'admin'
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state
  const loadDatabaseData = async () => {
    setIsLoading(true);
    try {
      const items = await dbService.getMenuItems();
      const serverSettings = await dbService.getSettings();
      setMenuItems(items);
      setSettings(serverSettings);
    } catch (err) {
      console.error('Failed to load database content', err);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    loadDatabaseData();
  }, []);

  // Admin action handlers
  const handleSaveMenuItem = async (item) => {
    const saved = await dbService.saveMenuItem(item);
    if (saved) {
      const updated = await dbService.getMenuItems();
      setMenuItems(updated);
      return true;
    }
    return false;
  };

  const handleDeleteMenuItem = async (id) => {
    const deleted = await dbService.deleteMenuItem(id);
    if (deleted) {
      const updated = await dbService.getMenuItems();
      setMenuItems(updated);
      return true;
    }
    return false;
  };

  const handleUpdateSetting = async (key, val) => {
    const updated = await dbService.updateSetting(key, val);
    if (updated) {
      setSettings(prev => ({ ...prev, [key]: val }));
      return true;
    }
    return false;
  };

  // Toast Notification triggers
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Confetti trigger
  const triggerConfetti = () => {
    if (confetti) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c15537', '#e1b72a', '#10b981']
      });
    }
  };

  const isDeliveryAvailable = settings.delivery_available === 'true';

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 dark:bg-darkBg">
        <div className="h-10 w-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
        <p className="font-display font-bold text-sm tracking-wider text-neutral-400 animate-pulse">
          Preheating the Kitchen...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between dark:bg-darkBg">
      {/* Navbar */}
      <Navbar 
        setIsCartOpen={setIsCartOpen} 
        isDeliveryAvailable={isDeliveryAvailable} 
      />

      {/* Pages Container */}
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                menuItems={menuItems} 
                isDeliveryAvailable={isDeliveryAvailable} 
                addToast={addToast} 
              />
            } 
          />
          <Route 
            path="/menu" 
            element={<Menu menuItems={menuItems} addToast={addToast} />} 
          />
          <Route 
            path="/login" 
            element={<Login settings={settings} addToast={addToast} />} 
          />
          <Route 
            path="/admin" 
            element={
              <Admin
                menuItems={menuItems}
                settings={settings}
                onSaveMenuItem={handleSaveMenuItem}
                onDeleteMenuItem={handleDeleteMenuItem}
                onUpdateSetting={handleUpdateSetting}
                addToast={addToast}
              />
            } 
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Slider */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        whatsappNumber={settings.whatsapp_number}
        triggerConfetti={triggerConfetti}
        addToast={addToast}
      />

      {/* Floating Speed Support Dials */}
      <FloatingCallButton whatsappNumber={settings.whatsapp_number} />

      {/* Toast Alert Popups */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
