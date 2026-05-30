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

  const isHome = location.pathname === '/';
  const showDarkContrast = !isScrolled && isHome;

  return (
    <nav className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
      isScrolled 
        ? 'glass-effect shadow-premium border-b border-white/5 dark:border-white/5 py-3.5' 
        : 'bg-transparent py-6'
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
              className="h-11 w-11 object-contain rounded-full shadow-md border border-brand/20 group-hover:scale-105 transition-transform duration-300 bg-white dark:bg-neutral-950 p-0.5"
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
            <span className={`font-display font-black text-2xl tracking-wide bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
              showDarkContrast
                ? 'from-brand-400 to-accent-300'
                : 'from-brand to-accent-600'
            }`}>
              Good Food
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const textClass = isActive
                ? 'text-brand font-bold scale-105'
                : showDarkContrast
                  ? 'text-neutral-100 hover:text-white font-semibold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-brand font-semibold';
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`transition-all duration-255 relative pb-2.5 text-sm tracking-wide ${textClass}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand rounded-full animate-fade-in shadow-xs" />
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
              className={`p-2 rounded-xl transition-all duration-200 ${
                showDarkContrast
                  ? 'text-neutral-200 hover:text-white hover:bg-white/10'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-accent" /> : <Moon size={20} />}
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                showDarkContrast
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-brand/10 hover:bg-brand/20 dark:bg-brand/20 dark:hover:bg-brand/30 text-brand'
              }`}
              aria-label="Open Cart"
            >
              <ShoppingCart size={20} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-neutral-900 font-black text-xs h-5 w-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 md:hidden rounded-xl transition-all duration-200 ${
                showDarkContrast
                  ? 'text-neutral-200 hover:text-white hover:bg-white/10'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-b border-neutral-100 dark:border-neutral-800 animate-fade-in absolute w-full left-0 py-5 shadow-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md">
          <div className="flex flex-col space-y-4 px-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`text-left font-bold text-lg py-1.5 ${
                    isActive 
                      ? 'text-brand border-l-4 border-brand pl-3' 
                      : 'text-neutral-700 dark:text-neutral-300 pl-4'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Status bar */}
            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4 mt-2 flex items-center justify-between text-sm px-4">
              <span className="text-neutral-400 font-semibold">Delivery Status:</span>
              <span className={`font-bold flex items-center gap-2 ${
                isDeliveryAvailable ? 'text-green-500' : 'text-red-500'
              }`}>
                <span className="relative flex h-2 w-2">
                  {isDeliveryAvailable && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isDeliveryAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </span>
                {isDeliveryAvailable ? '24/7 Delivery Open' : 'Delivery Closed'}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
