import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";
import { FaArrowLeft } from "react-icons/fa";
import { useShopStore } from "../store/useShopStore";

const parsePrice = (raw) =>
  parseFloat(String(raw).replace(/[^0-9.-]+/g, "")) || 0;

export default function Cart() {
  const navigate = useNavigate();
  const [showBreakup, setShowBreakup] = useState(false);

const { cart, fetchCart, removeFromCart, addToWishlist, user, fetchUser } = useShopStore();

useEffect(() => {
  const loadCart = async () => {
    await fetchUser();  // make sure user is loaded
    if (user?.id) {
      await fetchCart(user.id);  // now pass user.id
    }
  };
  loadCart();
}, [fetchCart, fetchUser, user?.id]);

  console.log(cart,"-------->");
  const moveToWishlist = async (item) => {
   
    await addToWishlist(item.user_id, item.product_id);

    
    await removeFromCart(item.product_id);
  };

const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const discount = 300;
  const finalTotal = total - discount;

  const goToPayment = () =>
    // navigate("/payment", { state: { amount: finalTotal } });
  navigate("/payment", { state: { amount: finalTotal, userId: user?.id } });

  return (
    <div className="cart-page">
      {/* Header */}
      <div className="jewel-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
        </span>
        <h1 className="jewel-title">Shopping Cart</h1>
      </div>

      <div className="cart-header">
        <div className="item-count">Items ({cart.length})</div>
        {cart.length > 0 && (
          <div className="savings-strip">
            You’re saving ₹{discount} on this order
          </div>
        )}
      </div>

      {/* Item cards */}
      {cart.map((item) => (
      
        <div className="cart-card" key={item.id}>
          {/* <img
            src={item.image_url}
            alt={item.name}
            className="product-image"
          /> */}
            {item.image_url && (
              <img
                src={`http://localhost:3000/${
                  item.image_url.replace(/[\[\]\s]/g, '').split(',')[0]
                }`}
                alt={item.name}
                 className="product-image"
              />
            )}

          <div className="product-details">
            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">₹ {parsePrice(item.price)}</p>
            <p className="price-note">Inclusive of all taxes</p>

            <div className="details-box">
              <div className="detail-row">
                <label>Quantity:</label>
                <select defaultValue={item.quantity}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className="detail-row">
                <strong>Material:</strong> {item.material}
              </div>
              <div className="detail-row">
                <strong>Weight:</strong> {item.weight}
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={() => removeFromCart(item.product_id)}>
                Remove
              </button>
              <button onClick={() => moveToWishlist(item)}>
                Move To Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Price-breakup & Order summary */}
      <div className="bottom-section">
        {cart.length > 0 && (
          <>
            <div
              className="price-breakup"
              onClick={() => setShowBreakup(!showBreakup)}
            >
              <span>Price Breakup</span>
              <span className={`arrow ${showBreakup ? "up" : "down"}`}></span>
            </div>

            <div className="order-summary">
              <h4>Order Summary</h4>
              <div className="summary-row">
                <span>Subtotal ({cart.length} item)</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span>– ₹ {discount.toFixed(2)}</span>
              </div>
              <hr />
              <div className="summary-row total-row">
                <strong>Total</strong>
                <strong>₹ {finalTotal.toFixed(2)}</strong>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky footer proceed button */}
      {cart.length > 0 && (
        <div className="sticky-footer">
          <button className="pay-button" onClick={goToPayment}>
            Proceed To Pay
          </button>
        </div>
      )}

      {cart.length === 0 && <p className="empty-msg">No items in cart.</p>}
    </div>
  );
}
