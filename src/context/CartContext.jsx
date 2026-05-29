import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('goodfood_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        setCart([]);
      }
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('goodfood_cart', JSON.stringify(newCart));
  };

  const addToCart = (item) => {
    const newCart = [...cart];
    const existing = newCart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    saveCart(newCart);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newCart = cart.map(item => item.id === id ? { ...item, quantity } : item);
    saveCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalCartCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}
