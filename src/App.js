import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm';

const MENU_DATA = [
  { id: 1, name: 'Garlic Bread', category: 'Starters', price: 149 },
  { id: 2, name: 'Stuffed Mushrooms', category: 'Starters', price: 199 },
  { id: 3, name: 'Margherita Pizza', category: 'Mains', price: 399 },
  { id: 4, name: 'Grilled Salmon', category: 'Mains', price: 549 },
  { id: 5, name: 'Chocolate Lava Cake', category: 'Desserts', price: 179 },
];

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('foodCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('foodCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) => prevCart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const filteredMenu = activeCategory === 'All' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === activeCategory);

  return (
    <div className="app-container">
      <header>
        <h1>Gourmet Online Ordering</h1>
      </header>
      <div className="main-content">
        <Menu 
          menu={filteredMenu} 
          addToCart={addToCart} 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <div className="order-sidebar">
          <Cart cart={cart} updateQuantity={updateQuantity} />
          {cart.length > 0 && <CheckoutForm cart={cart} clearCart={clearCart} />}
        </div>
      </div>
    </div>
  );
}

export default App;