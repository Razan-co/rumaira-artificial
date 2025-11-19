import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import '../css/pendant.css';
import {useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useShopStore } from "../store/useShopStore";
export default function Pendant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { 
    wishlist,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    categoryProducts,
    fetchCategoryProducts,
    cart,
    fetchCart,
    addToCart,
    user
  } = useShopStore();

  useEffect(() => {
    fetchCategoryProducts(id); 
  }, [id]);

  useEffect(() => {
    fetchWishlist();
    fetchCart();
  }, []);
const toggleWishlist = async (item) => {
  const exists = wishlist.find((i) => i.product_id === item.id);

  if (exists) {
    await removeFromWishlist(item.id);   // item.id = product_id
  } else {
    await addToWishlist(item.id);        // item.id = product_id
  }

  await fetchWishlist();
};
  const handleAddToCart = async (item) => {
    const exists = cart.find((i) => i.product_id === item.id);

    if (exists) {
      alert('Item already in Cart');
      navigate('/cart');
    } else {
      try {
        await addToCart(user?.id, item.id); // ✅ pass user_id + product_id
        await fetchCart();
        alert('Added to Cart');
        navigate('/cart');
      } catch (err) {
        console.error("Failed to add to cart:", err);
        alert("Add to cart failed");
      }
    }
  };

  const goToWishlist = () => navigate('/wishlist');
  const goToCart = () => navigate('/cart');

  return (
    <div className="pendant-page">
      <div className="ring-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
        </span>
        <h1 className="jewel-title">{categoryProducts[0]?.cat_name}</h1>
        <div className="nav-icons">
          <FaHeart className="header-icon" onClick={goToWishlist} />
          <FaShoppingCart className="header-icon" onClick={goToCart} />
        </div>
      </div>

      <div className="pendant-grid">
        {categoryProducts.map((item) => (
          <div className="pendant-card" key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
            {item.image_url && (
              <img
                src={`http://localhost:3000/${
                  item.image_url.replace(/[\[\]\s]/g, '').split(',')[0]
                }`}
                alt={item.name}
              />
            )}
            <div className="pendant-info">
              <h4>{item.name}</h4>
              <p>{item.price}</p>
            </div>

           <div className="wishlist-icon" onClick={() => toggleWishlist(item)}>
  {wishlist.find((i) => i.product_id === item.id) ? (
    <FaHeart color="gold" />
  ) : (
    <FaRegHeart color="gold" />
  )}
</div>


            <button className="add-to-cart" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

