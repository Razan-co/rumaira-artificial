import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/ring.css';

export default function RingPage() {
  const items = [
    { id: 1, name: 'The Eternal Two Diamond Ring', price: '₹ 13,971', image: '/assets/ring1-1.webp' },
    { id: 2, name: 'Synthetic Sapphire Ring with Diamond', price: '₹ 13,971', image: '/assets/ring2-1.webp' },
    { id: 3, name: 'Gold Leaf Ring', price: '₹ 8,500', image: '/assets/ring3-1.webp' },
    { id: 4, name: 'Gold ', price: '₹ 8,500', image: '/assets/ring4-1.webp' },
    { id: 5, name: 'Leaf', price: '₹ 8,500', image: '/assets/ring5-1.webp' },
    { id: 6, name: ' Ring', price: '₹ 8,500', image: '/assets/ring6-1.webp' }
  ];

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load wishlist and cart from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setWishlist(storedWishlist);
    setCart(storedCart);
  }, []);

  const toggleWishlist = (item) => {
    const exists = wishlist.find((i) => i.id === item.id);
    const updatedWishlist = exists
      ? wishlist.filter((i) => i.id !== item.id)
      : [...wishlist, item];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (!exists) {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Added to Cart');
    } else {
      alert('Item already in Cart');
    }
  };

  const goToWishlist = () => navigate('/wishlist');
  const goToCart = () => navigate('/cart');

  return (
    <div className="rings-page">
      <div className="ring-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
        </span>
        <h1 className="jewel-title">Rings</h1>
        <div className="nav-icons">
          <FaHeart className="header-icon" onClick={goToWishlist} />
          <FaShoppingCart className="header-icon" onClick={goToCart} />
        </div>
      </div>

      <div className="ring-grid">
        {items.map((ring) => (
          <div className="ring-card" key={ring.id}>
            <img src={ring.image} alt={ring.name} className="ring-image" onClick={() => navigate(`/ring/${ring.id}`, { state: { ring } })}/>
            <div className="ring-info">
              <h4>{ring.name}</h4>
              <p>{ring.price}</p>
            </div>
            <div className="ring-actions">
              <button className="add-to-cart" onClick={() => addToCart(ring)}>
                Add to Cart
              </button>
              <div className="wishlist-icon" onClick={() => toggleWishlist(ring)}>
                {wishlist.find((i) => i.id === ring.id) ? (
                  <FaHeart color="gold" />
                ) : (
                  <FaRegHeart color="gray" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
