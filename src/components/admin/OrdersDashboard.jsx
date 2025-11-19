import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "/src/css/OrdersDashboard.css"; // ✅ Import CSS

import AdminSidebar from "./AdminSidebar";
import useAdminStore from "../../store/useAdminStore";


export default function OrdersDashboard() {
  const { status } = useParams();
  const {
    orders,
    fetchOrders,
    fetchDeliveredOrders,
    fetchPendingOrders,
    fetchCancelledOrders,
  } = useAdminStore();

  useEffect(() => {
    if (!status) fetchOrders();
    else if (status === "delivered") fetchDeliveredOrders();
    else if (status === "pending") fetchPendingOrders();
    else if (status === "cancelled") fetchCancelledOrders();
  }, [
    status,
    fetchOrders,
    fetchDeliveredOrders,
    fetchPendingOrders,
    fetchCancelledOrders,
  ]);

  const pageTitle = !status
    ? "All Orders"
    : `${status.charAt(0).toUpperCase() + status.slice(1)} Orders`;

  return (
    <div className="orders-container">
      <AdminSidebar />

      <main className="orders-main">
        <h2 className="orders-title">{pageTitle}</h2>

        {/* Desktop / Tablet View */}
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.product}</td>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.customer?.name}</td>
                    <td className={`status ${order.status?.toLowerCase()}`}>
                      ● {order.status}
                    </td>
                    <td>{order.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-orders">
                    No {pageTitle} Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="orders-cards">
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <div key={idx} className="order-card">
                <p>
                  <span>Product:</span> {order.product}
                </p>
                <p>
                  <span>Order ID:</span> {order.id}
                </p>
                <p>
                  <span>Date:</span> {order.date}
                </p>
                <p>
                  <span>Customer:</span> {order.customer?.name}
                </p>
                <p className={`status ${order.status?.toLowerCase()}`}>
                  ● {order.status}
                </p>
                <p>
                  <span>Amount:</span> {order.amount}
                </p>
              </div>
            ))
          ) : (
            <p className="no-orders-text">No {pageTitle} Found</p>
          )}
        </div>
      </main>
    </div>
  );
}
