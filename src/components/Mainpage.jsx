import React from "react";
import '../css/main.css';

export default function MainPage() {
  return (
    <div className="main-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for jewellery on Rumaira"
        />
      </div>

      <div className="card-row">
        <div className="card">
          <img src="/assets/ring.png" alt="Rings" />
          <p>Rings</p>
        </div>
        <div className="card">
          <img src="/assets/pendant.png" alt="Pendants" />
          <p>Pendants</p>
        </div>
        <div className="card">
          <img src="/assets/earrings.png" alt="Earrings" />
          <p>Earrings</p>
        </div>
      </div>

      <div className="blue-banner">
        <p><em>Dive into our blue stone collection.</em></p>
        <img src="/assets/blue-stone.png" alt="Blue Stone Ring" />
      </div>

      <div className="bottom-navbar">
        <div className="nav-item active">
          <img src="/assets/home-icon.png" alt="Home" />
          <p>Home</p>
        </div>
        <div className="nav-item">
          <img src="/assets/category-icon.png" alt="Categories" />
          <p>Categories</p>
        </div>
        <div className="nav-item">
          <img src="/asset/crown-icon.png" alt="Jewel Plan" />
          <p>Jewel Plan</p>
        </div>
        <div className="nav-item">
          <img src="/assets/heart-icon.png" alt="Wishlist" />
          <p>Wishlist</p>
        </div>
        <div className="nav-item">
          <img src="/assets/cart-icon.png" alt="Cart" />
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
}
