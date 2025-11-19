// import React, { useState, useEffect } from 'react';
// import { FaPhone, FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import '../css/payment.css';

// export default function Payment() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(savedCart);
//   }, []);

//   // Helper to convert price if it's a string like "₹2999"
//   const parsePrice = raw =>
//     parseFloat(String(raw).replace(/[^0-9.-]+/g, '')) || 0;

//   const calculateTotal = () =>
//     cartItems.reduce((sum, item) => sum + parsePrice(item.price), 0);

//   const totalAmount = calculateTotal();
//   const discountRate = 0.15;
//   const discount = totalAmount * discountRate;
//   const finalAmount = totalAmount - discount;

//   const handlePayment = () => {
//     alert(`Redirecting to payment gateway to pay ₹${finalAmount.toLocaleString()}`);
//     navigate('/conformation'); // ensure this route exists
//   };

//   return (
//     <div className="payment-page">
//       <div className="jewel-header">
//         <span className="back-arrow" onClick={() => navigate(-1)}>
//           <FaArrowLeft className="back-icon" />
//         </span>
//         <h1 className="jewel-title">Payment</h1>
//       </div>


//       {cartItems.length > 0 && (
//         <>
//           <h2>Payment Option</h2>
//           <div className="payment-box">
//             <div className="row">
//               <span>Total Cart Value</span>
//               <span>₹ {totalAmount.toLocaleString()}</span>
//             </div>
//             <div className="row">
//               <span>15% Discount</span>
//               <span>- ₹ {discount.toLocaleString()}</span>
//             </div>
//             <div className="row total">
//               <span>Total</span>
//               <span>₹ {finalAmount.toLocaleString()}</span>
//             </div>
//              <div className="row payable">
//               <span>Payable Amount</span>
//               <span>₹ {finalAmount.toLocaleString()}</span>
//             </div>
//           </div>
//         </>
//       )}

//       <div className="help-text">Any questions? Feel free to call us:</div>
//       <div className="phone-box">
//         <FaPhone />
//         <span>+91 ***** *****</span>
//       </div>

//       <div className="terms">
//         By completing payment, I accept the <strong>Terms & Conditions</strong> of Gem Box Scheme.
//       </div>

//       {cartItems.length > 0 && (
//         <div className="pay-button">
//           <button onClick={handlePayment}>Proceed To Pay</button>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { FaPhone, FaArrowLeft } from 'react-icons/fa';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../css/payment.css';
// import { useShopStore } from "../store/useShopStore";

// export default function Payment() {
 
//   const location = useLocation();
//   const navigate = useNavigate();
//  const { cart } = useShopStore();
//   const { amount, userId } = location.state || {};
//   // ✅ Load Razorpay script ONCE when component mounts
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

 
//   const parsePrice = raw =>
//     parseFloat(String(raw).replace(/[^0-9.-]+/g, '')) || 0;

//   const calculateTotal = () =>
//     cart.reduce((sum, item) => sum + parsePrice(item.price), 0);
// //const payableAmount = amount || 0;

//   // const handlePayment = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:3000/api/payment/create-order', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({
//   //         amount: finalAmount,
//   //         userId: 1
//   //       }),
//   //     });

//   //     const data = await response.json();
//   //     if (!data.success) throw new Error('Order creation failed');

//   //     const options = {
//   //       key: 'rzp_test_FIbXKAkHk9VvXS',
//   //       amount: data.razorpayOrder.amount,
//   //       currency: data.razorpayOrder.currency,
//   //       name: 'Gem Box Scheme',
//   //       description: 'Purchase Jewellery',
//   //       order_id: data.razorpayOrder.id,
//   //       handler: function (response) {
//   //         // Optional: Verify on backend
//   //         fetch('http://localhost:3000/api/payment/verify-payment', {
//   //           method: 'POST',
//   //           headers: { 'Content-Type': 'application/json' },
//   //           body: JSON.stringify({
//   //             paymentId: response.razorpay_payment_id,
//   //             orderId: response.razorpay_order_id,
//   //             signature: response.razorpay_signature,
//   //           }),
//   //         })
//   //           .then(res => res.json())
//   //           .then(data => {
//   //             if (data.status === 'success') {
//   //               alert('Payment successful and verified!');
//   //               navigate('/conformation');
//   //             } else {
//   //               alert('Payment verification failed!');
//   //             }
//   //           });
//   //       },
//   //       prefill: {
//   //         name: 'Vineesha',
//   //               email: 'vineesha@klitetechnology.com',
//   //               contact:"6383924243"
//   //       },
//   //       theme: { color: '#71e6b5ff' },
//   //     };

//   //     const rzp = new window.Razorpay(options);
//   //     rzp.open();
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert('Payment failed to initialize.');
//   //   }
//   // };
//   const payableAmount = amount || 0;

//   const handlePayment = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/payment/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: payableAmount,
//           userId: userId,
//         }),
//       });

//       const data = await response.json();
//       if (!data.success) throw new Error("Order creation failed");

//       const options = {
//         key: "rzp_test_FIbXKAkHk9VvXS",
//         amount: data.razorpayOrder.amount,
//         currency: data.razorpayOrder.currency,
//         name: "Gem Box Scheme",
//         description: "Purchase Jewellery",
//         order_id: data.razorpayOrder.id,
//         handler: function (response) {
//           fetch("http://localhost:3000/api/payment/verify-payment", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               paymentId: response.razorpay_payment_id,
//               orderId: response.razorpay_order_id,
//               signature: response.razorpay_signature,
//             }),
//           })
//             .then(res => res.json())
//             .then(data => {
//               if (data.status === "success") {
//                 alert("Payment successful and verified!");
//                 navigate("/conformation");
//               } else {
//                 alert("Payment verification failed!");
//               }
//             });
//         },
//         prefill: {
//           name: "Vineesha",
//           email: "vineesha@klitetechnology.com",
//           contact: "6383924243",
//         },
//         theme: { color: "#71e6b5ff" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed to initialize.");
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="jewel-header">
//         <span className="back-arrow" onClick={() => navigate(-1)}>
//           <FaArrowLeft className="back-icon" />
//         </span>
//         <h1 className="jewel-title">Payment</h1>
//       </div>

//       {cartItems.length > 0 && (
//         <>
//           <h2>Payment Option</h2>
//           <div className="payment-box">
//             <div className="row">
//               <span>Total Cart Value</span>
//               <span>₹ {totalAmount.toLocaleString()}</span>
//             </div>
//             <div className="row">
//               <span>15% Discount</span>
//               <span>- ₹ {discount.toLocaleString()}</span>
//             </div>
//             <div className="row total">
//               <span>Total</span>
//               <span>₹ {payableAmount.toLocaleString()}</span>
//             </div>
//             <div className="row payable">
//               <span>Payable Amount</span>
//               <span>₹ {payableAmount.toLocaleString()}</span>
//             </div>
//           </div>
//         </>
//       )}

//       <div className="help-text">Any questions? Feel free to call us:</div>
//       <div className="phone-box">
//         <FaPhone />
//         <span>+91 ***** *****</span>
//       </div>

//       <div className="terms">
//         By completing payment, I accept the <strong>Terms & Conditions</strong> of Gem Box Scheme.
//       </div>

//       {cartItems.length > 0 && (
//         <div className="pay-button">
//           <button onClick={handlePayment}>Proceed To Pay</button>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { FaPhone, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/payment.css";
import { useShopStore } from "../store/useShopStore";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useShopStore(); // ✅ Zustand cart
  const { amount = 0, userId } = location.state || {};

  // ✅ Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("✅ Razorpay script loaded");
    script.onerror = () => console.error("❌ Failed to load Razorpay script");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Handle payment
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          userId,
          currency: "INR",
        }),
      });

      const data = await response.json();
      console.log("Backend order response:", data);

      if (!data.razorpayOrder) {
        alert("Order creation failed. Check server logs.");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded yet. Please try again.");
        return;
      }

      const options = {
        key: "rzp_test_FIbXKAkHk9VvXS", // test key
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: "Gem Box Scheme",
        description: "Purchase Jewellery",
        order_id: data.razorpayOrder.id,
        handler: function (response) {
          fetch("http://localhost:3000/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then((verifyData) => {
              if (verifyData.status === "success") {
                alert("✅ Payment successful and verified!");
                navigate("/conformation");
              } else {
                alert("❌ Payment verification failed!");
              }
            });
        },
        prefill: {
          name: "Vineesha",
          email: "vineesha@klitetechnology.com",
          contact: "6383924243",
        },
        theme: { color: "#71e6b5ff" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment init error:", err);
      alert("Payment failed to initialize. Please try again.");
    }
  };

  return (
    <div className="payment-page">
      <div className="jewel-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
        </span>
        <h1 className="jewel-title">Payment</h1>
      </div>

      {cart.length > 0 && (
        <>
          <h2>Payment Option</h2>
          <div className="payment-box">
            <div className="row">
              <span>Total Cart Value</span>
              <span>₹ {amount.toLocaleString()}</span>
            </div>
            <div className="row total">
              <span>Total Payable</span>
              <span>₹ {amount.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}

      <div className="help-text">Any questions? Feel free to call us:</div>
      <div className="phone-box">
        <FaPhone />
        <span>+91 ***** *****</span>
      </div>

      <div className="terms">
        By completing payment, I accept the <strong>Terms & Conditions</strong> of Gem Box Scheme.
      </div>

      {cart.length > 0 && (
        <div className="pay-button">
          <button onClick={handlePayment}>Proceed To Pay</button>
        </div>
      )}
    </div>
  );
}

