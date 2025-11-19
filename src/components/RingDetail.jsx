import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { MdCenterFocusStrong } from 'react-icons/md';
import '../css/ringproduct.css';

import img1 from '../assets/ring1-1.webp';
import img2 from '../assets/ring1-2.webp';
import img3 from '../assets/ring1-3.webp';
import img4 from '../assets/ring2-1.webp';
import img5 from '../assets/ring2-2.webp';
import img6 from '../assets/ring2-3.webp';
import img7 from '../assets/ring3-1.webp';
import img8 from '../assets/ring3-2.webp';
import img9 from '../assets/ring3-3.webp';
import img10 from '../assets/ring4-1.webp';
import img11 from '../assets/ring4-2.webp';
import img12 from '../assets/ring4-3.webp';
import img13 from '../assets/ring5-1.webp';
import img14 from '../assets/ring5-2.webp';
import img15 from '../assets/ring5-3.webp';
import img16 from '../assets/ring6-1.webp';
import img17 from '../assets/ring6-2.webp';
import img18 from '../assets/ring6-3.webp';

const allRings = [
  {
    id: 1,
    name: 'The Eternal Diamond Ring',
    price: '₹13,971',
    images: [img1, img2, img3],
  },
  {
    id: 2,
    name: 'Hand Fold Ring',
    price: '₹15,999',
    images: [img4, img5, img6],
  },
   {
    id: 3,
    name: 'Gold Leaf Ring',
    price: '₹8,500',
    images: [img7, img8, img9],
  },
  {
    id: 4,
    name: 'X Diamond Ring',
    price: '₹8,500',
    images: [img10, img11, img12],
  },

   {
    id: 5,
    name: 'The Eternal Two Diamond Ring',
    price: '₹8,500',
    images: [img13, img14, img15],
  },
   {
    id: 6,
    name: 'The Eternal Two Diamond Ring',
    price: '₹8,500',
    images: [img16, img17, img18],
  },
];

export default function RingDetail() {
  const { id } = useParams(); // ✅ get id from URL
  const navigate = useNavigate();

  const ring = allRings.find(r => r.id === parseInt(id));

  const [mainImage, setMainImage] = useState(ring?.images?.[0] || '');
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

  if (!ring) {
    return <div>No ring found. <button onClick={() => navigate(-1)}>Go Back</button></div>;
  }

  const toggleWishlist = () => {
    const exists = wishlist.find(i => i.id === ring.id);
    const updated = exists ? wishlist.filter(i => i.id !== ring.id) : [...wishlist, ring];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(item => item.id === ring.id)) {
      cart.push(ring);
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
            {wishlist.find(i => i.id === ring.id) ? <FaHeart color="gold" /> : <FaRegHeart />}
          </span>
          <FaShoppingCart className="cart-icon" />
        </div>
      </div>

      <div className="preview-section">
        <div className="main-image-container">
          <img src={mainImage} alt="Main Ring" className="main-ring-image" />
          <MdCenterFocusStrong
  className="scan-icon"
  onClick={() => window.open(mainImage, '_blank')}
/>

        </div>

        <div className="thumbnail-row">
          {ring.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumb ${i}`}
              className={`thumb ${mainImage === img ? 'active' : ''}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        <h3>{ring.name}</h3>
        <p className="price">{ring.price}</p>
        <button className="cart-btn" onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
