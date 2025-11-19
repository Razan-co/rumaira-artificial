

import React, { useEffect } from "react";
import "../css/categories.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useShopStore } from "../store/useShopStore"; // ✅ adjusted import path

export default function CategoriesPage() {
  const navigate = useNavigate();
  const {
    categories,
    loadingCategories,
    categoriesError,
    fetchCategories,
  } = useShopStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryClick = (category) => {
    // ✅ Generate clean lowercase route like /category/rings
    const slug =
      category.slug ||
      category.name?.toLowerCase().replace(/\s+/g, "-") ||
      "unknown";
    navigate(`/category/${slug}`);
  };

  return (
    <div className="categories-page">
      {/* 🧭 Header Section */}
      <div className="header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
        </span>
        <h2>Categories</h2>
      </div>

      {/* 🖼️ Categories Section */}
      <div className="category-slider" data-aos="fade-up">
        {loadingCategories && <p>Loading categories...</p>}
        {categoriesError && <p style={{ color: "red" }}>{categoriesError}</p>}

        {!loadingCategories && !categoriesError && categories.length === 0 && (
          <p>No categories found.</p>
        )}

        {categories.map((item, i) => (
          <div
            className="category-card"
            key={i}
            onClick={() => handleCategoryClick(item)}
          >
            <div className="card-image-section">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
            <div className="card-label-section">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



// import React, { useEffect } from "react";
// import "../css/categories.css";
// import { FaArrowLeft } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import {useShopStore} from "../store/useShopStore"; // adjust path

// export default function CategoriesPage() {
//   const navigate = useNavigate();
//   const { categories, loadingCategories, categoriesError, fetchCategories } =
//     useShopStore();

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   return (
//     <div className="categories-page">
//       <div className="header">
//         <span className="back-arrow" onClick={() => navigate(-1)}>
//           <FaArrowLeft className="back-icon" />
//         </span>
//         <h2>Categories</h2>
//       </div>

//       <div className="category-slider" data-aos="fade-up">
//         {loadingCategories && <p>Loading categories...</p>}
//         {categoriesError && (
//           <p style={{ color: "red" }}>{categoriesError}</p>
//         )}
//         {categories.map((item, i) => (
//           <div
//             className="category-card"
//             key={i}
//             onClick={() => navigate(item.path)}
//           >
//             <div className="card-image-section">
//               <img src={item.img} alt={item.name} />
//             </div>
//             <div className="card-label-section">{item.name}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

