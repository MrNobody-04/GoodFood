import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="inline-flex items-center justify-center space-x-3 group"
        >
          <img 
            src="/logo.png" 
            alt="Good Food Logo" 
            className="h-10 w-10 object-contain rounded-full border border-neutral-700 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="font-display font-extrabold text-2xl text-white tracking-wide">Good Food</span>
        </Link>
        <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
          Based in Bharatpur and delivering fresh homemade food across Bharatpur. Enjoy fast 24/7 delivery service from our two outlets in the city, prepared with love and care by Rohan & Anita.
        </p>
        
        <div className="flex justify-center space-x-6 text-sm text-neutral-400 font-semibold">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-white transition-colors">Menu</Link>
          <Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <span className="flex items-center gap-1">
            Made with <Heart size={10} className="text-brand fill-brand" /> by Rohan & Anita
          </span>
          <span>&copy; {new Date().getFullYear()} Good Food Kitchen. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
