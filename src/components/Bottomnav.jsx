import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';
import '../css/Bottom.css';

export default function BottomNav() {
  return (
    <footer className="bottom-nav">
      <NavLink to="/home" className="nav-item">
        <AiOutlineHome className="icon" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/categories" className="nav-item">
        <BiCategory className="icon" />
        <span>Categories</span>
      </NavLink>

      <NavLink to="/jewelplan" className="nav-item">
        <FaCrown className="icon" />
        <span>Jewel Plan</span>
      </NavLink>

      <NavLink to="/wishlist" className="nav-item">
        <AiOutlineHeart className="icon" />
        <span>Wishlist</span>
      </NavLink>

      <NavLink to="/cart" className="nav-item">
        <AiOutlineShoppingCart className="icon" />
        <span>Cart</span>
      </NavLink>
    </footer>
  );
}