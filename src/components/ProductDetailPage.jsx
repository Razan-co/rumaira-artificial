import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useShopStore } from "../store/useShopStore";
import toast from "react-hot-toast";
import "../css/productDetailPage.css";

export default function ProductDetailPage() {
  const { categoryType, id } = useParams();
  const navigate = useNavigate();
  const {
    product,
    fetchProductById,
    addToCart,
    cart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    loading,
    error,
  } = useShopStore();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id, fetchProductById]);

  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.error("Removed from Wishlist 💔");
    } else {
      addToWishlist(product.id);
      toast.success("Added to Wishlist ❤️");
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.user_id || 1, product.id, quantity); // adjust user_id as needed
    toast.success("Added to Cart 🛍️");
    navigate("/cart");
  };

  if (loading)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );

  if (error || !product)
    return (
      <div className="error-state">
        <p>{error || "Product not found."}</p>
        <button onClick={() => navigate(`/category/${categoryType}`)}>
          ← Back to Category
        </button>
      </div>
    );

  const totalPrice = product.price * quantity;

  return (
    <div className="product-detail-page">
      {/* Top Section */}
      <div className="top-section">
        <div className="image-container">
          <img src={product.img} alt={product.name} />
          <button
            className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
            onClick={handleWishlistToggle}
          >
            <FiHeart size={20} />
          </button>
        </div>

        <div className="info-container">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">${totalPrice.toFixed(2)}</p>
          <p className="product-stock">✔ In stock – ready to ship</p>

          <div className="quantity-section">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="details-section">
        <h2>Details</h2>
        <ul>
          <li>• SKU: L{product.id}RG</li>
          <li>• Purity: {product.metal}</li>
          <li>• Category: {product.category}</li>
          <li>• Gender: {product.gender}</li>
          <li>• Collection: {product.collections}</li>
        </ul>
      </div>

      {/* Description */}
      <div className="description-section">
        <h2>Description</h2>
        <p>{product.description || "No description available."}</p>
      </div>

      {/* Back Button */}
      <div className="back-button-section">
        <button onClick={() => navigate(`/category/${categoryType}`)}>
          ← Back to Category
        </button>
      </div>
    </div>
  );
}
