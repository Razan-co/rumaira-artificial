import React, { useState } from "react";
import "/src/css/AddProductFormDashboard.css"; // ✅ Import the CSS file
import AdminSidebar from "./AdminSidebar";
import useAdminStore from "../../store/useAdminStore";


export default function AddProductFormDashboard() {
  const { addProduct, loading } = useAdminStore();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    colors: "",
    sizes: "",
    description: "",
    image: null,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setProduct({ ...product, [name]: files[0] });
    else setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await addProduct(product);

    if (res.success) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setProduct({
          name: "",
          price: "",
          colors: "",
          sizes: "",
          description: "",
          image: null,
        });
      }, 2000);
    } else {
      alert("Failed to add product: " + res.error);
    }
  };

  return (
    <div className="addproduct-container">
      <AdminSidebar />

      <main className="addproduct-main">
        <h1 className="addproduct-title">Add Product</h1>

        <div className="addproduct-card">
          <form onSubmit={handleSubmit} className="addproduct-form">
            <div className="form-row">
              {/* Upload Image */}
              <div className="upload-section">
                <label className="upload-label">
                  {product.image ? (
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="preview"
                      className="upload-preview"
                    />
                  ) : (
                    <div className="upload-placeholder">
                      <span>Upload Image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    className="upload-input"
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* Input Fields */}
              <div className="form-fields">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="colors"
                  placeholder="Colors (comma separated)"
                  value={product.colors}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="sizes"
                  placeholder="Sizes (comma separated)"
                  value={product.sizes}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
            />

            {/* Buttons */}
            <div className="button-row">
              <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  setProduct({
                    name: "",
                    price: "",
                    colors: "",
                    sizes: "",
                    description: "",
                    image: null,
                  })
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Success Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <p>Product Added Successfully!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
