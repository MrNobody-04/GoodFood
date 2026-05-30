import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Sparkles, UtensilsCrossed } from 'lucide-react';

export default function Footer() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-neutral-950 dark:bg-black text-neutral-400 pt-20 pb-10 overflow-hidden">
      {/* Smooth Wave Divider at the top of the footer */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[98%] pointer-events-none">
        <svg className="relative block w-full h-[40px] text-neutral-950 dark:text-black" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ fill: 'currentColor' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.35,27.14,196,55.51,263.38,64.24,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Subtle brand color glow in background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-5">
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="inline-flex items-center space-x-3 group"
            >
              <img 
                src="/logo.png" 
                alt="Good Food Logo" 
                className="h-12 w-12 object-contain rounded-full border border-brand/20 p-0.5 bg-neutral-900 group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fb = e.target.parentElement.querySelector('.footer-fb');
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <div className="footer-fb hidden items-center justify-center bg-brand text-white p-2 rounded-xl">
                <UtensilsCrossed size={18} />
              </div>
              <span className="font-display font-extrabold text-2xl text-white tracking-wide bg-gradient-to-r from-brand to-accent-600 bg-clip-text text-transparent">
                Good Food
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed font-medium max-w-sm">
              Authentic homestyle cloud kitchen preparing delicious, healthy, and hygienic meals with pure love and fresh local ingredients.
            </p>
            <div className="flex items-center space-x-2 text-xs font-bold text-brand/90 uppercase tracking-wider bg-brand-500/10 px-3.5 py-1.5 rounded-xl w-fit">
              <Sparkles size={13} className="text-accent animate-spin-slow" />
              <span>Taste the Love in Every Bite</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <Link to="/" onClick={handleLogoClick} className="hover:text-brand transition-colors flex items-center gap-1.5 group">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 group-hover:bg-brand transition-colors" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" onClick={handleLogoClick} className="hover:text-brand transition-colors flex items-center gap-1.5 group">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 group-hover:bg-brand transition-colors" />
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/admin" onClick={handleLogoClick} className="hover:text-brand transition-colors flex items-center gap-1.5 group">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 group-hover:bg-brand transition-colors" />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Outlets */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Kitchen Outlets & Service</h4>
            <div className="space-y-3.5 text-sm font-medium">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand shrink-0 mt-0.5" />
                <span>Bharatpur, Nepal (Delivering across city with two outlets)</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">24/7 Fast Delivery Service</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Hot & hygienic food, day or night</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright & signatures */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <div className="flex items-center gap-1.5 font-semibold">
            <span>Made with</span>
            <Heart size={12} className="text-brand fill-brand animate-pulse" />
            <span>by Sujan G.C.</span>
          </div>
          <span>&copy; {new Date().getFullYear()} Good Food Cloud Kitchen & Restaurant. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
