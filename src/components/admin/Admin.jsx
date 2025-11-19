import React, { useEffect } from "react";
import "/src/css/Admin.css"; // Import the CSS file
import AdminSidebar from "./AdminSidebar";
import useAdminStore from "/src/store/useAdminStore.js";

export default function Admin() {
  const { products, fetchProducts, loading, error } = useAdminStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="admin-main">
        <h1 className="admin-title">Products</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="admin-error">{error}</p>}

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.img || product.image_url}
                alt={product.name}
                className="product-image"
              />

              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">₹{product.price}</p>

                {/* Colors */}
                {product.colors && (
                  <div className="color-list">
                    {product.colors.split(",").map((c, i) => (
                      <span
                        key={i}
                        className="color-dot"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && (
                  <div className="size-list">
                    {product.sizes.split(",").map((s, i) => (
                      <button key={i} className="size-button">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
