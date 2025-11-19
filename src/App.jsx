import React, { useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// --- Components ---
import LoginSignup from "./components/LoginSignup";
// The following routes will be public or conditionally restricted:
import Homepage from "./components/Homepage";
import ContactForm from "./components/ContactForm";
import Disclaimer from "./components/Disclaimer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Cancellation from "./components/Cancellation";
import Shipping from "./components/Shipping";
import Refund from "./components/Refund";
import RefundCancle from "./components/RefundCancle";
import Payments from "./components/Payments";
import Feedback from "./components/Feedback";

// The following routes will be protected:
import Home from './components/Home';
import Mainpage from "./components/Mainpage";
import JewelPlan from "./components/JewelPlan";
import Catogories from './components/Catogories';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Payment from './components/Payment';
import Conformation from './components/Conformation';
import Schemes from './components/Schemes';
import Golden from './components/Golden';
import Diamond from './components/Diamond';
import Loyalty from './components/Loyalty';
import Wedding from "./components/Wedding";
import ProfilePage from "./components/ProfilePage";
import CategoryPage from "./components/CategoryPage";
import Bottomnav from './components/Bottomnav'; 
import './app.css'
// Admin Components
import Admin from "./components/admin/Admin";
import OrdersDashboard from "./components/admin/OrdersDashboard";
import AddProductFormDashboard from "./components/admin/AddProductFormDashboard";

// --- State Management ---
import { useAuthStore } from "./store/useAuthStore";

function AppWrapper() {
    const location = useLocation();
    
    const { 
        isAuthenticated, 
        authUser, 
        getUser, 
        isFetchingUser 
    } = useAuthStore();

    const role = authUser?.role; 

    // 1. Initialize Auth State on Mount
    useEffect(() => {
        // Check for existing session (cookie/token) on app load
        getUser();
    }, [getUser]);

    // 2. Conditional Bottomnav logic
    const hideBottomNavRoutes = [
        "/", 
        "/LoginSignup", 
        "/otp", 
        "/wishlist", 
        "/cart", 
        "/payment", 
        "/conformation"
    ];
    const showBottomNav = !hideBottomNavRoutes.includes(location.pathname);

    // 3. Loading Screen while checking session (REPLACED WITH SPINNER)
    if (isFetchingUser) {
        return (
            <div 
                className="h-screen w-screen flex flex-col justify-center items-center"
                style={{ backgroundColor: 'white' }}
            >
                <div 
                    style={{
                        border: '5px solid #f3f3f3', // Light grey border
                        borderTop: '5px solid #FFD700', // Gold color for animation
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite', // Apply CSS animation
                        marginBottom: '10px'
                    }}
                ></div>
                <p style={{ color: '#555', fontSize: '16px' }}>Checking authentication...</p>
                {/* NOTE: For the 'spin' animation to work, you'll need this CSS keyframes 
                    in your global stylesheet (e.g., index.css or equivalent):
                    
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                */}
            </div>
        );
    }

    // 4. Helper component for Route Protection
    const ProtectedRoute = ({ element, adminOnly = false }) => {
        const loginPath = "/LoginSignup";
        const homePath = "/home";

        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            // Allow access to public-by-default routes like Homepage if the path is '/'
            if (location.pathname === "/") {
                return element;
            }
            return <Navigate to={loginPath} replace />;
        }

        // Redirect non-admin users if the route requires admin role
        if (adminOnly && role !== "admin") {
            return <Navigate to={homePath} replace />;
        }

        // Render the element if authenticated and authorized
        return element;
    };

    // 5. Helper component for Public/Redirect Routes (Auth users shouldn't see login)
    const PublicRoute = ({ element }) => {
        const homePath = "/home";
        // If authenticated, redirect to home
        if (isAuthenticated) {
            return <Navigate to={homePath} replace />;
        }
        // Otherwise, show the public element
        return element;
    };


    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                {/* ======================= PUBLIC ROUTES / AUTH ROUTES ======================= */}
                
                {/* Root Route: Show Homepage if logged out, or redirect to /home if logged in */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Homepage />} />
                <Route path="/LoginSignup" element={<PublicRoute element={<LoginSignup />} />} />
                {/* OTP is likely no longer needed, but keep it as PublicRoute for safety */}
                {/* <Route path="/otp" element={<PublicRoute element={<OTP />} />} /> */}
                
                {/* Static/Informational Routes (Always Public) */}
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/cancellation" element={<Cancellation />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/return" element={<RefundCancle />} />
                <Route path="/payments" element={<Payments />} />


                {/* ======================= USER PROTECTED ROUTES (Requires isAuthenticated) ======================= */}
                
                {/* Core User Routes (Visible in Bottomnav context) */}
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/main" element={<ProtectedRoute element={<Mainpage />} />} />
                <Route path="/account" element={<ProtectedRoute element={<ProfilePage />} />} />
                <Route path="/category" element={<ProtectedRoute element={<Catogories />} />} />

                {/* E-commerce Routes */}
                <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
                <Route path="/wishlist" element={<ProtectedRoute element={<Wishlist />} />} />
                <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} />
                <Route path="/conformation" element={<ProtectedRoute element={<Conformation />} />} />

                {/* Category/Product Routes */}
                <Route path="/category/:categoryType" element={<ProtectedRoute element={<CategoryPage />} />} />
                {/* Add Product Detail Route here if needed: <Route path="/category/:categoryType/:id" element={<ProtectedRoute element={<ProductDetailPage />} />} /> */}

                {/* Scheme/Plan Routes */}
                <Route path="/jewelplan" element={<ProtectedRoute element={<JewelPlan />} />} />
                <Route path="/schemes" element={<ProtectedRoute element={<Schemes />} />} />
                <Route path="/golden" element={<ProtectedRoute element={<Golden />} />} />
                <Route path="/loyalty" element={<ProtectedRoute element={<Loyalty />} />} />
                <Route path="/diamond" element={<ProtectedRoute element={<Diamond />} />} />
                <Route path="/wedding" element={<ProtectedRoute element={<Wedding />} />} />

                {/* ======================= ADMIN PROTECTED ROUTES (Requires isAuthenticated AND role='admin') ======================= */}
                
                <Route path="/admin" element={<ProtectedRoute element={<Admin />} adminOnly={true} />} />
                <Route path="/dashboard/orders" element={<ProtectedRoute element={<OrdersDashboard />} adminOnly={true} />} />
                <Route path="/dashboard/orders/:status" element={<ProtectedRoute element={<OrdersDashboard />} adminOnly={true} />} />
                <Route path="/dashboard/products" element={<ProtectedRoute element={<Admin />} adminOnly={true} />} />
                <Route path="/dashboard/add-product" element={<ProtectedRoute element={<AddProductFormDashboard />} adminOnly={true} />} />
                
                {/* Catch-all Route for 404 - You should add a dedicated component here */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>

            {/* Conditionally render Bottomnav (Only show if authenticated and path is not hidden) */}
            {showBottomNav && isAuthenticated && <Bottomnav />}
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}



