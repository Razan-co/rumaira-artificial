import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useShopStore } from '../store/useShopStore';



export default function Home() {
  
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
 const { fullName, role, logoutUser } = useAuthStore();//, checkAuth, isAuthenticated, loading
   const { categories, fetchCategories, loadingCategories, categoriesError,  newArrivals,
    loadingNewArrivals, newArrivalsError, fetchNewArrivals } = useShopStore();

     const ringsCategory = categories.find(
    (cat) => cat.name.toLowerCase() === "rings"
  );

   const handleImageClick = (alt) => {
    // Find category that matches the alt text
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === alt.toLowerCase()
    );
    if (category) {
      navigate(`/category/${category.id}`); // dynamic route
    } else {
      console.warn(`Category not found for alt: ${alt}`);
    }
  };


  useEffect(() => {
    fetchCategories();
     fetchNewArrivals();
       if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length,fetchCategories,fetchNewArrivals]);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // const verifyUser = async () => {
    //   const res = await checkAuth();
    //   if (!res?.authenticated) {
    //     navigate('/'); // redirect to login if not logged in
    //   }
    // };

    // verifyUser();
  }, []); //checkAuth, navigate



  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (!isAuthenticated) {
  //   return null; // or <div>Redirecting...</div>
  // }

  const renderSubMenu = () => {
  switch (selectedMenu) {
    case 'profile':
      return (
        <ul className="sub-menu">
          <li><Link to="/account">My Account</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
          <li><Link  onClick={logoutUser} >Logout</Link></li>
          {/* <li><Link to="/delete-account">Delete Account</Link></li> */}
        </ul>
      );
 
    case 'jewel':
      return (
        <ul className="sub-menu">
          <li><Link to="/jewelplan">Gem Box Plan</Link></li>
        </ul>
      );
    case 'contact':
      return (
        <ul className="sub-menu">
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
        </ul>
      );
    case 'policy':
      return (
        <ul className="sub-menu">
          <li><Link to="/shipping">Shipping Policy</Link></li>
          <li><Link to="/cancellation">Cancellation Policy</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/disclaimer">Disclaimer</Link></li>
        </ul>
      );
    case 'faqs':
      return (
        <ul className="sub-menu">
          <li><Link to="/refund">Refunds</Link></li>
          <li><Link to="/payments">Payment & Transactions</Link></li>
          <li><Link to="/return">Returns & Cancellations</Link></li>
        </ul>
      );
    default:
      return null;
  }
};


  return (
  <div className="jewellery-home">
      <header className="top-bar">
        <button className="menu-icon" onClick={() => setIsMenuOpen(true)}>
          <img src="/assets/menu.png" alt="Menu" />
        </button>
        <span className="bell-icon">
          <i className="fas fa-bell"></i>
        </span>
      </header>


      <div className={`offcanvas-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="offcanvas-header">
         <div className="profile-info">
  <i className="fas fa-user-circle"></i>
  <span className={`profile-name ${role === 'admin' ? 'admin' : ''}`}>
    Hi, {fullName}
  </span>
</div>
          <i
            className="fas fa-arrow-right close-arrow"
            onClick={() => {
              setIsMenuOpen(false);
              setSelectedMenu(null);
            }}
          ></i>
        </div>


        {!selectedMenu ? (
          <ul className="menu-list">
            <li onClick={() => setSelectedMenu('profile')}>
              <i className="fas fa-user"></i> My Profile
            </li>
              {/* Show Dashboard link only for admin */}
  {role === 'admin' && (
    <li onClick={() => navigate('/admin-dashboard')}>
      <i className="fas fa-tachometer-alt"></i> Dashboard
    </li>
  )}
            <li onClick={() => setSelectedMenu('jewel')}>
              <i className="fas fa-gem"></i> Jewel Plans
            </li>
            <li onClick={() => setSelectedMenu('contact')}>
              <i className="fas fa-phone"></i> Get in Touch
            </li>
            <li onClick={() => setSelectedMenu('policy')}>
              <i className="fas fa-file-alt"></i> Terms & Policy
            </li>
            <li onClick={() => setSelectedMenu('faqs')}>
              <i className="fas fa-question-circle"></i> FAQs
            </li>
            <li onClick={() => {
  navigate('/schemes');
  setIsMenuOpen(false); // close menu after navigating
}}><i className="fas fa-tags"></i> Schemes</li><br /><br />
   <button 
      className="logout-btn"
      onClick={logoutUser} // ✅ this will call API & clear store
    >
      <i className="fas fa-sign-out-alt"></i> Logout
    </button>
                      {/* <button
              className="logout-btn"
              onClick={async () => {
                await logoutUser();
                navigate("/"); // redirect to login page
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button> */}
          </ul>
        ) : (
          <div className="submenu-container">
            <button className="back-btn" onClick={() => setSelectedMenu(null)}>
              ← Back
            </button>
            {renderSubMenu()}
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="offcanvas-backdrop" onClick={() => {
          setIsMenuOpen(false);
          setSelectedMenu(null);
        }}></div>
      )}{
   

      isMenuOpen && <div className="offcanvas-backdrop" onClick={() => setIsMenuOpen(false)}></div>}

<div className="search-bar">
  <input type="text" placeholder="Search for jewellery on Rumara" />
</div>

{/* category */}

  <div className="category-slider" data-aos="fade-up">
      {loadingCategories && <p>Loading categories...</p>}
      {categoriesError && <p style={{ color: 'red' }}>{categoriesError}</p>}
      {categories.map((item, i) => (
        <div 
          className="category-card" 
          key={i} 
          onClick={() => navigate(item.path || `/category/${item._id}`)}
        >
          <div className="card-image-section">
            <img src={item.img} alt={item.name} />

          </div>
          <div className="card-label-section">
            {item.name}
          </div>
        </div>
      ))}
    </div>


  <div className="blue-banner" data-aos="fade-up">
      <div className="blue-banner-content">
        <div className="text-section">
          <h2>Dive into our blue stone collection.</h2>
          <button
            onClick={() => {
              if (ringsCategory) {
                navigate(`/category/${ringsCategory.id}`); // ✅ dynamic route
              } else {
                console.warn("Rings category not found!");
              }
            }}
          >
            Explore More
          </button>
        </div>
        <img src="/assets/blue ring.png" alt="Blue Ring" />
      </div>
    </div>


{/* new arrivals */}

      <div className="product-section" data-aos="fade-up">
      <h3 className="section-title">New Arrivals</h3>

      {loadingNewArrivals && <p>Loading new arrivals...</p>}
      {newArrivalsError && <p style={{ color: 'red' }}>{newArrivalsError}</p>}

      <div className="product-row">
        {newArrivals.map((item, i) => (
          <div className="product-card" key={i}>
            <div className="wishlist-icon">
              <i className="far fa-heart"></i>
            </div>
          <img
  src={
    item.image_url
      ? `http://localhost:3000/${item.image_url.replace(/[\[\]\s]/g, '').split(',')[0]}`
      : item.img
  }
  alt={item.name}
/>

            <div className="product-details">
              <p className="product-name">{item.name}</p>
              <p className="product-price">₹ {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>


<div className="earring-section">
  <div className="earring-heading">
    <h3>Stunning Every Ear</h3>
    <p>Look at our brand new earring collection just for you</p>
  </div>

  <div className="earring-promo" data-aos="zoom-in">
    <img src="/assets/Explore-collection.png" alt="Earring Collection" />
  </div>
</div>



     <div className="ring-section-container">
  <div className="ring-heading">
    <h3>Ring Of Desire</h3>
    <p>Look at our brand new Ring collection just for you</p>
  </div>

 <div className="ring-banner-container" data-aos="zoom-in">
  <img src="/assets/Group 427321031.png" alt="Ring Offer" className="ring-offer-img" />
  <button
    className="shop-now-btn"
     onClick={() => navigate("/categories")}
  >
    Shop Now
  </button>
</div>
</div>
{/* category */}

<div className="hero-slider-wrapper" data-aos="fade-up">
  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    loop={true}
    slidesPerView={1}
    className="hero-swiper"
  >
    <SwiperSlide>
      <img src="/assets/slide-1.png" alt="Slide 1" className="hero-banner-img" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="/assets/slide2.png" alt="Slide 2" className="hero-banner-img" />
    </SwiperSlide>
  </Swiper>

  {/* Category Cards Overlaid */}
 <div className="hero-card-overlay">
      {loadingCategories && <p>Loading categories...</p>}
      {categoriesError && <p style={{ color: "red" }}>{categoriesError}</p>}

      {categories.slice(0, 3).map((item, i) => (
        <div className="overlay-category-card" key={i}>
          <img src={item.img} alt={item.name} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
</div><br></br>

<div className="image-grid">
  {[
    { src: "/assets/img1.png", alt: "Image 1" },
    { src: "/assets/img2.png", alt: "Image 2" },
    { src: "/assets/img3.png", alt: "Image 3" },
    { src: "/assets/img4.png", alt: "Image 4" },
    { src: "/assets/img5.png", alt: "Image 5" },
    { src: "/assets/img6.png", alt: "Image 6" },
  ].map((item, i) => (
    <div className="image-card" key={i}>
      <img src={item.src} alt={item.alt} />
    </div>
  ))}
</div>
 
  <div className="earring-promo" data-aos="zoom-in">
    <img src="/assets/jewelplan-card.png" alt="Earring Collection" />
    <button onClick={() => navigate('/jewelplan')}>Explore More</button>
  </div>

    <div className="jewelry-grid">
      {[
        { src: "/assets/imag1.png", alt: "rings" },
        { src: "/assets/imag2.png", alt: "earring" },
        { src: "/assets/imag3.png", alt: "rings" },
        { src: "/assets/imag4.png", alt: "bracelet and chain" },
      ].map((item, i) => (
        <img
          key={i}
          src={item.src}
          alt={item.alt}
          style={{ cursor: "pointer" }}
          onClick={() => handleImageClick(item.alt)}
        />
      ))}
    </div>

    
    </div>
  );
}