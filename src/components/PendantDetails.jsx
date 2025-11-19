import { useEffect, useState, useMemo  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { MdCenterFocusStrong } from "react-icons/md";
import { useShopStore } from "../store/useShopStore";


export default function PendantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    product,
    fetchProductById,
    loading,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    cart,
    fetchCart,
    addToCart,
    user,
  } = useShopStore();

  const backendimageUrl = "http://localhost:3000/";
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetchProductById(id); // ✅ fixed
  }, [id]);

  const pendant = product;

  // const imageArray = pendant?.image_url
  //   ? pendant.image_url.replace(/[\[\]']+/g, "").split(",")
  //   : [];
  const imageArray = useMemo(() => (
  pendant?.image_url
    ? pendant.image_url.replace(/[\[\]']+/g, "").split(",")
    : []
), [pendant]);


  // useEffect(() => {
  //   if (imageArray.length > 0 && !mainImage) {
  //     setMainImage(`${backendimageUrl}${imageArray[0]}`);
  //   }
  // }, [imageArray]);
  useEffect(() => {
  if (imageArray.length > 0) {
    setMainImage(`${backendimageUrl}${imageArray[0]}`);
  } else {
    setMainImage(""); // clear if no images
  }
}, [id, imageArray]); 

const toggleWishlist = async () => {
  const pendantId = Number(pendant?.id);
  if (!pendantId) return;

  const exists = wishlist.find((i) => i.product_id === pendantId);

  if (exists) {
    await removeFromWishlist(pendantId);
  } else {
    await addToWishlist(pendantId);
  }

  // optional: instantly refresh wishlist so heart updates
  // await fetchWishlist();
};



  const handleAddToCart = async () => {
    const pendantId = Number(pendant?.id);
    if (!pendantId) return;

    if (cart.find((item) => item.product_id === pendantId)) {
      alert("Item already in cart");
    } else {
      try {
        console.log("🔄 Adding to cart:", pendantId);
        await addToCart(user?.id, pendantId); // ✅ fixed
        await fetchCart();
        alert("Added to cart!");
      } catch (err) {
        console.error("❌ Error adding to cart:", err.response?.data || err.message);
        alert("Failed to add to cart");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!pendant) {
    return (
      <div>
        No pendant found. <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="ring-detail-page">
      <div className="top-bar">
        <FaArrowLeft onClick={() => navigate(-1)} className="nav-icon" />
        <div className="icons">
         <span onClick={toggleWishlist}>
  {wishlist.find((i) => i.product_id === Number(pendant.id)) ? (
    <FaHeart color="gold" />
  ) : (
    <FaRegHeart />
  )}
</span>

          <FaShoppingCart className="cart-icon" onClick={handleAddToCart} />
        </div>
      </div>

      <div className="preview-section">
        <div className="main-image-container">
          {mainImage && (
            <img src={mainImage} alt="Main Pendant" className="main-ring-image" />
          )}
          <MdCenterFocusStrong
            className="scan-icon"
            onClick={() => window.open(mainImage, "_blank")}
          />
        </div>

       <div className="thumbnail-row">
          {imageArray.map((img, i) => {
            const fullImgUrl = `${backendimageUrl}${img}`;
            return (
              <img
                key={i}
                src={fullImgUrl}
                alt={`Thumb ${i}`}
                className={`thumb ${mainImage === fullImgUrl ? "active" : ""}`}
                onClick={() => setMainImage(fullImgUrl)}
              />
            );
          })}
        </div> 
       


        <h1>{pendant?.name}</h1>
        <p className="price">{pendant?.price}</p>
        <button className="cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
