import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import '../css/earring.css';
import { Link } from 'react-router-dom';

const earrings = [
  { id: 1, name: 'Earring 1', price: '₹ 9,899', image: '/assets/earring1-1.webp' },
  { id: 2, name: 'Earring 2', price: '₹ 10,299', image: '/assets/earring2-1.webp' },
  { id: 3, name: 'Earring 3', price: '₹ 8,750', image: '/assets/earring3-1.webp' },
  { id: 4, name: 'Earring 4', price: '₹ 11,499', image: '/assets/earring4-1.webp' },
  { id: 5, name: 'Earring 5', price: '₹ 12,000', image: '/assets/earring5-1.webp' },
  { id: 6, name: 'Earring 6', price: '₹ 9,200', image: '/assets/earring6-1.webp' },
];

export default function Earring() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

const toggleWishlist = (id) => {
  const item = earrings.find((e) => e.id === id);
  const current = JSON.parse(localStorage.getItem('wishlist')) || [];
  const isAlreadyIn = current.some((i) => i.id === id);

  const updated = isAlreadyIn
    ? current.filter((i) => i.id !== id)
    : [...current, item];

  setWishlist(updated.map(i => i.id));
  localStorage.setItem('wishlist', JSON.stringify(updated));
};


 const addToCart = (id) => {
  const item = earrings.find((e) => e.id === id);
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

  const isAlreadyInCart = currentCart.some((i) => i.id === id);
  if (!isAlreadyInCart) {
    const updatedCart = [...currentCart, item];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart.map(i => i.id));
    alert('Added to Cart');
  } else {
    alert('Item already in Cart');
  }
};


  const goToWishlist = () => {
    navigate('/wishlist');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  useEffect(() => {
  const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  setWishlist(savedWishlist.map(i => i.id));
}, []);

  
  return (
    <div className="earrings-page">
      
        <div className="cat-header">
                           <span className="back-arrow" onClick={() => navigate(-1)}>
                             <FaArrowLeft className="back-icon" />
                           </span>
                           <h1 className="jewel-title">Earrings</h1>
      <div className="nav-icons">
  <FaHeart className="header-icon" onClick={goToWishlist} />
  <FaShoppingCart className="header-icon" onClick={goToCart} />
</div>


                         </div>
             
      

      <div className="earrings-grid">
        {earrings.map((item) => (
          <div className="earring-card" key={item.id}>
            <Link to={`/earrings/${item.id}`} state={{ earring: item }}>

            <img src={item.image} alt={item.name} className="earring-image" /></Link>
            <div className="earring-info">
              <h4>{item.name}</h4>
              <p>{item.price}</p>
            </div>
            <div className="actions">
              <div
                className="wishlist-icon"
                onClick={() => toggleWishlist(item.id)}
              >
                {wishlist.includes(item.id) ? (
                  <FaHeart color="gold" />
                ) : (
                  <FaRegHeart color="gold" />
                )}
              </div>
              <button className="add-to-cart" onClick={() => addToCart(item.id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}