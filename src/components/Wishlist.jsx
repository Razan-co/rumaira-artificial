// import React, { useEffect, useState } from 'react';
// import '../css/wishlist.css';
// import { FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// export default function Wishlist() {
//   const [wishlist, setWishlist] = useState([]);
//   const navigate = useNavigate();


//   useEffect(() => {
//     const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     setWishlist(savedWishlist);
//   }, []);

//   const moveToCart = (item) => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     localStorage.setItem('cart', JSON.stringify([...cart, item]));

//     const updated = wishlist.filter(i => i.id !== item.id);
//     setWishlist(updated);
//     localStorage.setItem('wishlist', JSON.stringify(updated));
//   };

//   const removeFromWishlist = (id) => {
//     const updated = wishlist.filter(i => i.id !== id);
//     setWishlist(updated);
//     localStorage.setItem('wishlist', JSON.stringify(updated));
//   };

//   return (
//     <div className="wishlist-page">
//      <div className="jewel-header">
//                     <span className="back-arrow" onClick={() => navigate(-1)}>
//                       <FaArrowLeft className="back-icon" />
//                     </span>
//                     <h1 className="jewel-title">wishlist</h1></div>
//       <div className="wishlist-container">
//         {wishlist.length === 0 ? (
//           <p className="empty-text">No items in wishlist.</p>
//         ) : (
//           wishlist.map(item => (
//             <div className="wishlist-card" key={item.id}>
//               <img src={item.image} alt={item.name} className="wishlist-image" />
//               <div className="wishlist-info">
//                 <h4>{item.name}</h4>
//                 <p>{item.price}</p>
//                 <div className="wishlist-buttons">
//                   <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
//                   <button onClick={() => moveToCart(item)}>Move To Bag</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect } from "react";
// import "../css/wishlist.css";
// import { FaArrowLeft } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useShopStore } from "../store/useShopStore";

// export default function Wishlist() {
//   const navigate = useNavigate();

//   // ✅ get from Zustand
//   const { wishlist, fetchUser,fetchWishlist, removeFromWishlist, addToCart } =
//     useShopStore();
// useEffect(() => {
//   fetchWishlist(); // no argument
// }, [fetchWishlist]);


//   const moveToCart = async (item) => {
//     // ✅ Add to Cart via API
//     await addToCart(item.user_id, item.product_id, 1);

//     // ✅ Remove from Wishlist
//     await removeFromWishlist(item.product_id);
//   };

//   return (
//     <div className="wishlist-page">
//       <div className="jewel-header">
//         <span className="back-arrow" onClick={() => navigate(-1)}>
//           <FaArrowLeft className="back-icon" />
//         </span>
//         <h1 className="jewel-title">Wishlist</h1>
//       </div>

//       <div className="wishlist-container">
//         {wishlist.length === 0 ? (
//           <p className="empty-text">No items in wishlist.</p>
//         ) : (
//           wishlist.map((item) => (
//             <div className="wishlist-card" key={item.id}>
//               <img
//                 src={item.image_url}
//                 alt={item.name}
//                 className="wishlist-image"
//               />
//               <div className="wishlist-info">
//                 <h4>{item.name}</h4>
//                 <p>₹ {item.price}</p>
//                 <div className="wishlist-buttons">
//                   <button onClick={() => removeFromWishlist(item.product_id)}>
//                     Remove
//                   </button>
//                   <button onClick={() => moveToCart(item)}>Move To Bag</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
// src/components/Wishlist.jsx
import React, { useEffect } from "react";
import "../css/wishlist.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useShopStore } from "../store/useShopStore";

export default function Wishlist() {
  const navigate = useNavigate();

  const {
    user,
    wishlist,
    fetchUser,
    fetchWishlist,
    removeFromWishlist,
    addToCart,
  } = useShopStore();

  // 1) Ensure user is loaded
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 2) Only fetch wishlist once we have a user id
  useEffect(() => {
    if (user?.id) {
      fetchWishlist();
    }
  }, [user?.id, fetchWishlist]);

  const moveToCart = async (item) => {
    await addToCart(item.user_id, item.product_id, 1);
    await removeFromWishlist(item.product_id);
    // optional: re-fetch to sync with server
    // await fetchWishlist();
  };

  return (
    <div className="wishlist-page">
      <div className="jewel-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
        </span>
        <h1 className="jewel-title">Wishlist</h1>
      </div>

      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <p className="empty-text">No items in wishlist.</p>
        ) : (
          wishlist.map((item) => (
            <div className="wishlist-card" key={item.id ?? `${item.user_id}-${item.product_id}`}>
              <img
                src={item.image_url}
                alt={item.name}
                className="wishlist-image"
              />
              <div className="wishlist-info">
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
                <div className="wishlist-buttons">
                  <button onClick={() => removeFromWishlist(item.product_id)}>
                    Remove
                  </button>
                  <button onClick={() => moveToCart(item)}>Move To Bag</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
