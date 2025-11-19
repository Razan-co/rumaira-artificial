import { NavLink, useLocation } from "react-router-dom";
import {
  FaBox,
  FaTags,
  FaChevronDown,
  FaChevronRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import "/src/css/AdminSidebar.css"; // ✅ Import CSS file

export default function AdminSidebar() {
  const location = useLocation();
  const [openOrders, setOpenOrders] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/dashboard/orders")) {
      setOpenOrders(true);
    } else {
      setOpenOrders(false);
    }
  }, [location.pathname]);

  const linkClasses = ({ isActive }) =>
    `sidebar-link ${isActive ? "active-link" : ""}`;

  return (
    <>
      {/* 🔹 Top Navbar (Mobile only) */}
      <div className="mobile-navbar">
        <button onClick={() => setSidebarOpen(true)} className="menu-btn">
          <FaBars size={22} />
        </button>
        <h1 className="navbar-title">Dashboard</h1>
      </div>

      {/* 🔹 Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
      >
        <h2 className="sidebar-title">Admin</h2>
        <nav className="sidebar-nav">
          {/* Orders Section */}
          <div>
            <button
              onClick={() => setOpenOrders(!openOrders)}
              className="sidebar-dropdown-btn"
            >
              <span className="sidebar-dropdown-label">
                <FaBox /> Orders
              </span>
              {openOrders ? (
                <FaChevronDown className="chevron-icon" />
              ) : (
                <FaChevronRight className="chevron-icon" />
              )}
            </button>

            {openOrders && (
              <div className="sidebar-submenu">
                <NavLink to="/dashboard/orders" className={linkClasses} end>
                  All Orders
                </NavLink>
                <NavLink
                  to="/dashboard/orders/delivered"
                  className={linkClasses}
                >
                  Delivered
                </NavLink>
                <NavLink
                  to="/dashboard/orders/pending"
                  className={linkClasses}
                >
                  Pending
                </NavLink>
                <NavLink
                  to="/dashboard/orders/cancelled"
                  className={linkClasses}
                >
                  Cancelled
                </NavLink>
              </div>
            )}
          </div>

          {/* Products */}
          <NavLink to="/dashboard/products" className={linkClasses} end>
            <FaTags /> Products
          </NavLink>

          {/* Add Product */}
          <NavLink to="/dashboard/add-product" className={linkClasses} end>
            <FaTags /> Add Product
          </NavLink>
        </nav>

        {/* 🔹 Close Button (Mobile only) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="close-btn"
        >
          <FaTimes size={20} />
        </button>
      </aside>
    </>
  );
}
