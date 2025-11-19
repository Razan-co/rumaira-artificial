import React, { useState, useEffect } from "react";
import {
  FaBox,
  FaSignOutAlt,
  FaUser,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "/src/css/ProfilePage.css"; // ✅ Import new CSS
import { useAuthStore } from "../store/useAuthStore";

export default function ProfilePage() {
  const {
    fullName,
    mobile,
    avatar,
    updateUserProfile,
    uploadAvatar,
    checkAuth,
    logoutUser,
    fetchOrders,
    orders,
    orderLoading,
  } = useAuthStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [newFullName, setNewFullName] = useState("");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    setNewFullName(fullName || "");
  }, [fullName]);

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
  }, [activeTab, fetchOrders]);

  const handleSave = async () => {
    await updateUserProfile({ fullName: newFullName, mobile });
    setIsEditing(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) await uploadAvatar(file);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="sidebar-card">
            <div className="avatar-box">
              {avatar ? (
                <img src={avatar} alt="Profile" className="avatar-img" />
              ) : (
                <span className="avatar-placeholder">👤</span>
              )}
            </div>

            <h2 className="user-name">{fullName || "Unknown"}</h2>
            <p className="user-mobile">{mobile}</p>

            <nav className="sidebar-nav">
              <button
                onClick={() => setActiveTab("profile")}
                className={`nav-item ${
                  activeTab === "profile" ? "active" : ""
                }`}
              >
                <FaUser /> Profile
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
              >
                <FaBox /> Orders
              </button>

              <button
                onClick={async () => {
                  await logoutUser();
                  navigate("/login");
                }}
                className="nav-item logout"
              >
                <FaSignOutAlt /> Log Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          {activeTab === "profile" && (
            <>
              <h2 className="section-title">Profile</h2>

              {/* Avatar Upload */}
              <div className="avatar-upload">
                <div className="avatar-small">
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="avatar-img" />
                  ) : (
                    <span className="avatar-placeholder small">👤</span>
                  )}
                </div>
                <label className="upload-btn">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {/* Name Edit */}
              <div className="input-group">
                <label>Full Name</label>
                {!isEditing ? (
                  <div className="readonly-field">
                    <span>{fullName || "Unknown"}</span>
                    <button onClick={() => setIsEditing(true)} className="edit">
                      <FaEdit />
                    </button>
                  </div>
                ) : (
                  <div className="edit-field">
                    <input
                      type="text"
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                    />
                    <button onClick={handleSave} className="save">
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => {
                        setNewFullName(fullName);
                        setIsEditing(false);
                      }}
                      className="cancel"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div className="input-group">
                <label>Mobile Number</label>
                <div className="readonly-box">{mobile}</div>
              </div>
            </>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="orders-section">
              <h2 className="section-title">Orders</h2>
              {orderLoading ? (
                <p className="text-muted">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-muted">No orders found.</p>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-left">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="order-img"
                        />
                        <div>
                          <h3 className="order-title">{order.name}</h3>
                          <p>Color: {order.color}</p>
                          <p>Price: ₹{order.price.toLocaleString()}</p>
                          <div className="stars">☆☆☆☆☆</div>
                        </div>
                      </div>

                      <div className="order-right">
                        <p
                          className={`status ${
                            order.status === "delivered"
                              ? "delivered"
                              : "pending"
                          }`}
                        >
                          {order.status === "delivered"
                            ? "Delivered"
                            : "Delivery Expected"}
                        </p>
                        <p className="order-date">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
