import React from 'react';

function Menu({ menu, addToCart, activeCategory, setActiveCategory }) {
  const categories = ['All', 'Starters', 'Mains', 'Desserts'];

  return (
    <div className="menu-section">
      <h2>Our Menu</h2>
      <div className="category-filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={activeCategory === cat ? 'active' : ''}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {menu.map(item => (
          <div key={item.id} className="menu-card">
            <h3>{item.name}</h3>
            <p>₹{item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;