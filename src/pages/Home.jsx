import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, Compass, Heart, ShieldCheck, Soup, Award, Star } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Home({ menuItems, isDeliveryAvailable, addToast }) {
  const { addToCart } = useCart();

  // Featured dishes list (limit 3 items)
  const featuredDishes = useMemo(() => {
    return menuItems.filter(i => i.is_available).slice(0, 3);
  }, [menuItems]);

  const highlights = [
    {
      icon: <Heart className="text-brand" size={24} />,
      title: "Made with Love",
      desc: "Every dish is cooked as if we are serving our own family, using time-tested recipes."
    },
    {
      icon: <ShieldCheck className="text-brand" size={24} />,
      title: "Hygienic Kitchen",
      desc: "Strict standards of cleanliness and food safety in our family-run cloud kitchen."
    },
    {
      icon: <Soup className="text-brand" size={24} />,
      title: "Always Fresh",
      desc: "We source organic vegetables and premium quality meats locally every single day."
    },
    {
      icon: <Award className="text-brand" size={24} />,
      title: "Homestyle Authentic",
      desc: "Preserving real local tastes and recipes without adding artificial preservatives."
    }
  ];

  const customerReviews = [
    {
      name: "Saurav Sharma",
      role: "Regular Late-Night customer",
      stars: 5,
      comment: "Good Food has saved me during late-night study sessions! Their Thakali Set is authentic and Momo is always steaming hot even at 2 AM."
    },
    {
      name: "Pooja Karki",
      role: "Working Mother",
      stars: 5,
      comment: "Clean, fresh, and tastes exactly like my mom's kitchen. You can tell Rohan and Anita cook with pure dedication. High recommendations!"
    },
    {
      name: "Kabir Thapa",
      role: "Fitness Enthusiast",
      stars: 4,
      comment: "Hygienic home-cooked meals delivered in beautiful packaging. Less oil, fresh ingredients, and ordering on WhatsApp is extremely convenient."
    }
  ];

  const handleAdd = (item) => {
    addToCart(item);
    if (addToast) {
      addToast(`Added ${item.name} to cart!`, 'success');
    }
  };

  return (
    <div className="space-y-0">
      
      {/* 1. HERO BANNER */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-darkBg-dark dark:via-darkBg dark:to-brand-950/20 pt-16">
        <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-brand-200 dark:bg-brand-900/10 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent-200 dark:bg-accent-950/10 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Title Block */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-brand-100 dark:bg-brand-900/30 text-brand px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
              >
                <Sparkles size={16} className="text-accent-600 animate-spin-slow" />
                <span>Taste the Love in Every Bite</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-neutral-900 dark:text-white"
              >
                Fresh Homemade Food <br />
                <span className="bg-gradient-to-r from-brand to-accent-600 bg-clip-text text-transparent">
                  Delivered 24/7
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto lg:mx-0 font-medium"
              >
                Based in Bharatpur and delivering fresh homemade food across Bharatpur. Experience 24/7 fast home delivery from our two outlets in the city, prepared with love and care by Anita & Rohan.
              </motion.p>

              {/* Delivery Availability Status */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`flex items-center justify-center lg:justify-start gap-3 text-sm ${
                  isDeliveryAvailable ? 'text-green-600 dark:text-green-400' : 'text-neutral-500'
                }`}
              >
                <div className="flex items-center justify-center bg-white dark:bg-neutral-800 p-2 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700">
                  <Clock size={16} className={isDeliveryAvailable ? 'animate-pulse text-green-500' : ''} />
                </div>
                <span className="font-semibold tracking-wider uppercase text-xs">
                  {isDeliveryAvailable ? '⚡ 24/7 Delivery Available Now' : '⏸️ Delivering Closed Temporarily'}
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  to="/menu"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-brand hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>View Full Menu</span>
                  <ArrowRight size={20} />
                </Link>
                
                <Link
                  to="/menu"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 border-2 border-neutral-100 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold px-8 py-4 rounded-2xl shadow-sm hover:scale-[1.02] transition-all duration-200"
                >
                  <Compass size={20} className="text-accent-600" />
                  <span>Order Now</span>
                </Link>
              </motion.div>
            </div>

            {/* Graphics Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand to-accent opacity-20 rounded-full blur-3xl scale-90" />
                
                <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-neutral-800 shadow-2xl aspect-[4/5] bg-neutral-100 dark:bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                    alt="Delicious Hot Homemade Dish Platter" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Rating overlay */}
                <div className="absolute -left-6 bottom-16 bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700 flex items-center space-x-3 max-w-[190px] animate-bounce-slow">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80" alt="user" />
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80" alt="user" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 leading-none">4.9 ★ Rating</p>
                    <p className="text-[10px] text-neutral-500 leading-none mt-1">From 500+ locals</p>
                  </div>
                </div>

                {/* BEST Seller badge overlay */}
                <div className="absolute -right-6 top-16 bg-white dark:bg-neutral-850 p-3 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800/80 flex items-center space-x-2.5 animate-pulse-slow">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-105">Nepali Momo</p>
                    <p className="text-[10px] text-neutral-500 font-semibold">Local Best Seller</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 2. DELIVERY STATE STRIP */}
      <div className={`py-4 text-center font-display font-extrabold tracking-wide text-sm ${
        isDeliveryAvailable
          ? 'bg-gradient-to-r from-brand to-accent-600 text-white'
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
      }`}>
        <span>
          {isDeliveryAvailable 
            ? '🚚 HURRY! 24/7 HOME DELIVERY IS ONLINE. ORDER NOW VIA WHATSAPP!' 
            : '⏸️ WE ARE CURRENTLY PREPARING FRESH BATCHES. ORDERS STARTING SOON.'
          }
        </span>
      </div>

      {/* 3. OWNERS STORY BIOGRAPHY */}
      <section className="py-20 bg-white dark:bg-darkBg-light relative">
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-neutral-50 to-transparent dark:from-darkBg-dark pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Split Images */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
              <div className="absolute inset-0 border-2 border-brand/10 dark:border-brand/5 rounded-3xl -m-4 pointer-events-none" />
              
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md bg-neutral-100 dark:bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" 
                    alt="Couple cooking with love" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-md bg-neutral-100 dark:bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80" 
                    alt="Ingredients selection" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-md bg-neutral-100 dark:bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80" 
                    alt="Curry preparation" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md bg-neutral-100 dark:bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" 
                    alt="Dough prep" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Context */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="font-display font-bold uppercase tracking-wider text-xs text-brand">
                  Our Kitchen's Heartbeat
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-900 dark:text-white leading-tight">
                  From Our Family Table <br />
                  <span className="bg-gradient-to-r from-brand to-accent-600 bg-clip-text text-transparent">
                    Straight to Your Doorstep
                  </span>
                </h2>
              </div>

              <div className="space-y-4 text-neutral-600 dark:text-neutral-300 font-medium">
                <p>
                  <strong>Good Food</strong> was born out of a shared dream by Anita & Rohan to serve the people of Bharatpur. With two outlets in the city, our cloud kitchen provides fast, 24/7 delivery of fresh homemade meals directly to your doorstep.
                </p>
                <p>
                  "We are passionate about home cooking and customer satisfaction. That is why we cook everything ourselves from scratch, using traditional family recipes and fresh local Bharatpur ingredients, bringing hot and hygienic food to you day or night."
                </p>
              </div>

              {/* Grid bullet highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {highlights.map((h, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="bg-brand/10 dark:bg-brand/20 p-2.5 rounded-xl text-brand flex-shrink-0">
                      {h.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 dark:text-neutral-100 text-base">{h.title}</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED DELICACIES */}
      <section className="py-20 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="font-display font-bold uppercase tracking-wider text-xs text-brand">
              Chef's Specials
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-900 dark:text-white">
              Featured Delicacies
            </h2>
            <div className="h-1.5 w-16 bg-brand mx-auto rounded-full" />
          </div>

          {featuredDishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDishes.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800/80 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 left-4 bg-brand text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Popular
                    </span>
                  </div>
                  
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-display font-bold text-lg text-neutral-950 dark:text-neutral-50 truncate">{item.name}</h3>
                        <span className="font-display font-extrabold text-brand whitespace-nowrap">Rs. {item.price}</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className="w-full bg-brand hover:bg-brand-600 text-white font-bold py-3 px-4 rounded-xl text-xs hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                      Add to Tray
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-500 text-sm">No featured dishes active yet.</p>
          )}
          
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 text-brand font-extrabold hover:text-brand-600 transition-colors text-sm hover:underline"
            >
              <span>Explore Our Full Menu</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. GUESTBOOK REVIEWS */}
      <section className="py-20 bg-white dark:bg-darkBg-light border-t border-b border-neutral-100 dark:border-neutral-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="font-display font-bold uppercase tracking-wider text-xs text-brand">
              Guestbook Opinions
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-900 dark:text-white">
              Loved by Our Neighbors
            </h2>
            <div className="h-1.5 w-16 bg-brand mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerReviews.map((rev, i) => (
              <div 
                key={i} 
                className="bg-neutral-50/50 dark:bg-neutral-850 p-6 sm:p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 space-y-4 hover:shadow-premium transition-all duration-300"
              >
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={15} 
                      fill={idx < rev.stars ? "currentColor" : "none"} 
                      className={idx < rev.stars ? '' : 'text-neutral-300 dark:text-neutral-600'}
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 italic leading-relaxed font-medium">
                  "{rev.comment}"
                </p>
                <div className="pt-2 border-t border-neutral-200/50 dark:border-neutral-750">
                  <p className="font-bold text-neutral-800 dark:text-neutral-200 text-sm leading-none">{rev.name}</p>
                  <p className="text-[10px] text-neutral-400 font-semibold mt-1 leading-none uppercase tracking-wider">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
