// src/components/EarringDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { MdCenterFocusStrong } from 'react-icons/md';
import '../css/ringproduct.css'; // reuse existing CSS

// ✅ IMPORT earring images
import e1 from '../assets/earring1-1.webp';
import e2 from '../assets/earring1-2.webp';
import e3 from '../assets/earring1-3.webp';
import e4 from '../assets/earring2-1.webp';
import e5 from '../assets/earring2-2.webp';
import e6 from '../assets/earring2-3.webp';
import e7 from '../assets/earring3-1.webp';
import e8 from '../assets/earring3-2.webp';
import e9 from '../assets/earring3-3.webp';
import e10 from '../assets/earring4-1.webp';
import e11 from '../assets/earring4-2.webp';
import e12 from '../assets/earring4-3.webp';
import e13 from '../assets/earring5-1.webp';
import e14 from '../assets/earring5-2.webp';
import e15 from '../assets/earring5-3.webp';
import e16 from '../assets/earring6-1.webp';
import e17 from '../assets/earring6-2.webp';
import e18 from '../assets/earring6-3.webp';


const allEarrings = [
  {
    id: 1,
    name: 'Classic Hoop Earrings',
    price: '₹7,999',
    images: [e1, e2, e3],
  },
  {
    id: 2,
    name: 'Elegant Drop Earrings',
    price: '₹9,499',
    images: [e4, e5, e6],
  },
   {
    id: 3,
    name: 'Elegant Drop Earrings',
    price: '₹9,499',
    images: [e7, e8, e9],
  },
   {
    id: 4,
    name: 'Elegant Drop Earrings',
    price: '₹9,499',
    images: [e10, e11, e12],
  },
   {
    id: 5,
    name: 'Elegant Drop Earrings',
    price: '₹9,499',
    images: [e13, e14, e15],
  },
   {
    id: 6,
    name: 'Elegant Drop Earrings',
    price: '₹9,499',
    images: [e16, e17, e18],
  },
 
];

export default function EarringDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const earring = allEarrings.find(e => e.id === parseInt(id));

  const [mainImage, setMainImage] = useState(earring?.images?.[0] || '');
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

  if (!earring) {
    return <div>No earring found. <button onClick={() => navigate(-1)}>Go Back</button></div>;
  }

  const toggleWishlist = () => {
    const exists = wishlist.find(i => i.id === earring.id);
    const updated = exists ? wishlist.filter(i => i.id !== earring.id) : [...wishlist, earring];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(item => item.id === earring.id)) {
      cart.push(earring);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    } else {
      alert('Item already in cart');
    }
  };

  return (
    <div className="ring-detail-page">
      <div className="top-bar">
        <FaArrowLeft onClick={() => navigate(-1)} className="nav-icon" />
        <div className="icons">
          <span onClick={toggleWishlist}>
            {wishlist.find(i => i.id === earring.id) ? <FaHeart color="gold" /> : <FaRegHeart />}
          </span>
          <FaShoppingCart className="cart-icon" />
        </div>
      </div>

      <div className="preview-section">
        <div className="main-image-container">
          <img src={mainImage} alt="Main Earring" className="main-ring-image" />
          <MdCenterFocusStrong
            className="scan-icon"
            onClick={() => window.open(mainImage, '_blank')}
          />
        </div>

        <div className="thumbnail-row">
          {earring.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumb ${i}`}
              className={`thumb ${mainImage === img ? 'active' : ''}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        <h3>{earring.name}</h3>
        <p className="price">{earring.price}</p>
        <button className="cart-btn" onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
