import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/categoryPage.css";
import { FaArrowLeft } from "react-icons/fa";
import { useShopStore } from "../store/useShopStore";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryType } = useParams();
  const {
    categories,
    categoryProducts,
    fetchCategories,
    fetchCategoryProducts,
    loading,
    error,
  } = useShopStore();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories]);

  useEffect(() => {
    if (categoryType) {
      fetchCategoryProducts(categoryType);
    }
  }, [categoryType, fetchCategoryProducts]);

  const handleProductClick = (productId) => {
    navigate(`/category/${categoryType}/${productId}`);
  };

  return (
    <div className="category-page">
      {/* Header */}
      <div className="category-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
        </button>
        <h2 className="category-title">
          {categoryType?.charAt(0).toUpperCase() + categoryType?.slice(1)}
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => fetchCategoryProducts(categoryType)}>
            Retry
          </button>
        </div>
      )}

      {/* No Products */}
      {!loading && !error && categoryProducts.length === 0 && (
        <div className="empty-state">
          <p>No products found in this category.</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="product-grid">
        {categoryProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="product-image-container">
              <img
                src={product.img}
                alt={product.name}
                className="product-image"
                loading="lazy"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
