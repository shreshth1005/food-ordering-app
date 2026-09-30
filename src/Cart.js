import React from 'react';

function Cart({ cart, updateQuantity }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; 
  const total = subtotal + tax;

  if (cart.length === 0) return <div className="cart-section"><p>Your cart is empty.</p></div>;

  return (
    <div className="cart-section">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <span>{item.name} (x{item.quantity})</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Tax (8%): ₹{tax.toFixed(2)}</p>
        <h3>Total: ₹{total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;