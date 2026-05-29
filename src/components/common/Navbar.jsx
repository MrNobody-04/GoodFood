import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu as MenuIcon, X, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar({ setIsCartOpen, isDeliveryAvailable }) {
  const { totalCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Our Menu' },
    { path: '/admin', label: 'Admin Dashboard' }
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
      isScrolled 
        ? 'glass-effect shadow-premium border-b border-white/10 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleNavClick} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <img 
              src="/logo.png" 
              alt="Good Food Logo" 
              className="h-11 w-11 object-contain rounded-full shadow-md border border-brand/20 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.parentElement.querySelector('.logo-fallback');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="logo-fallback hidden items-center space-x-2">
              <div className="bg-brand text-white p-2 rounded-xl shadow-md">
                <UtensilsCrossed size={22} />
              </div>
            </div>
            <span className="font-display font-bold text-2xl tracking-wide bg-gradient-to-r from-brand to-accent-600 bg-clip-text text-transparent">
              Good Food
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`font-medium transition-all duration-200 hover:text-brand relative pb-1 ${
                    isActive 
                      ? 'text-brand font-semibold scale-105' 
                      : 'text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-accent" /> : <Moon size={20} />}
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-brand/10 hover:bg-brand/20 dark:bg-brand/20 dark:hover:bg-brand/30 text-brand rounded-xl transition-all duration-200"
              aria-label="Open Cart"
            >
              <ShoppingCart size={20} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-neutral-900 font-bold text-xs h-5 w-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-b border-white/10 animate-fade-in absolute w-full left-0 py-4 shadow-xl">
          <div className="flex flex-col space-y-4 px-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`text-left font-medium text-lg py-1 ${
                    isActive 
                      ? 'text-brand border-l-4 border-brand pl-3 font-semibold' 
                      : 'text-neutral-600 dark:text-neutral-300 pl-4'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Status bar */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-2 flex items-center justify-between text-sm px-4">
              <span className="text-neutral-500">Delivery Status:</span>
              <span className={`font-semibold flex items-center gap-1.5 ${
                isDeliveryAvailable ? 'text-green-500' : 'text-red-500'
              }`}>
                <span className={`h-2.5 w-2.5 rounded-full ${
                  isDeliveryAvailable ? 'bg-green-500 animate-ping' : 'bg-red-500'
                }`} />
                {isDeliveryAvailable ? '24/7 Delivery Open' : 'Delivery Closed'}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
