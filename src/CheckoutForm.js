import React, { useState } from 'react';

function CheckoutForm({ cart, clearCart }) {
  const [formData, setFormData] = useState({ name: '', tableNumber: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.tableNumber.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    
    setError('');
    setSuccess(`Order placed successfully for ${formData.name}!`);
    setTimeout(() => {
      setSuccess('');
      setFormData({ name: '', tableNumber: '' });
      clearCart();
    }, 3000);
  };

  return (
    <div className="checkout-section">
      <h3>Checkout Details</h3>
      <form onSubmit={handleSubmit} className="checkout-form">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Table Number / Address" 
          value={formData.tableNumber}
          onChange={(e) => setFormData({...formData, tableNumber: e.target.value})}
        />
        <button type="submit" className="checkout-btn">Place Order</button>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </form>
    </div>
  );
}

export default CheckoutForm;