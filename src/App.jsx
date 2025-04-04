import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Profile from './components/Profile'; // Import the Profile component
import Shop from './components/Shop';
import Cart from './components/Cart';
import Categories from './components/Categories';
import Sales from './components/Sales';
import Contact from './components/Contact';
import Footer from './components/Footer'; // Import the Footer component
import BackToTopButton from "./pages/BackToTopButton";
import Checkout from './components/Checkout';
import Clothing from "./pages/Clothing";
import SportsFitness from "./pages/SportsFitness";
import Electronics from "./pages/Electronics";
import DealsDiscounts from "./pages/DealsDiscounts";
import Furniture from "./pages/Furniture";
import PaymentOptions from "./components/PaymentOptions";
import OrderSummary from "./components/OrderSummary";
import Wishlist from './pages/Wishlist';
import AboutUs from './pages/AboutUs';
import FashionPage from './pages/FashionPage';
import HomeLivingPage from './pages/HomeLivingPage';
import BeautyPage from './pages/BeautyPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KidsWear from './pages/KidsWear';
import ElectronicsPage from './pages/ElectronicsPage';
import MensFashion from './pages/MensFashion';
import EmptyWishlist from './pages/EmptyWishlist ';
// import ProductCategoriesSlider from './pages/ProductCategoriesSlider';


const App = () => {
  return (

    <CartProvider>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    <Router>
        <Navbar /> {/* Navbar is always visible */}
        {/* Add margin to prevent Navbar overlap */}
          <Routes>
            {/* Define Routes for different pages */}
            <Route path="/" element={<HeroSection />} />
            <Route path="/about" element={<AboutUs/>} />
             <Route path="/shop" element={<Shop/>}  />
             <Route path="/shop/clothing" element={<Clothing />} />
            <Route path="/shop/electronics" element={<Electronics />} />
            <Route path="/shop/furniture" element={<Furniture />} />
             <Route path="/sales" element={<Sales />} />
             <Route path="/deals" element={<DealsDiscounts />} />
             <Route path="/wishlist" element={<Wishlist/>}  />
             <Route path="/emptywishlist" element={<EmptyWishlist/>}  />
             <Route path="/category" element={<Categories />} />
             <Route path="/category/mens" element={<MensFashion />} />
             <Route path="/category/electronics" element={<ElectronicsPage/>} />
             <Route path="/category/sports-fitness" element={<SportsFitness />} />
             <Route path="/category/kids-wear" element={<KidsWear />} />
             <Route path="/category/fashion" element={<FashionPage/>} />
            <Route path="/category/living" element={<HomeLivingPage />} />
            <Route path="/category/beauty" element={<BeautyPage/>} />
             <Route path="/cart" element={<Cart />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/payment" element={<PaymentOptions />} />
             {/* <Route path="product" element={<ProductCategoriesSlider/>} */}
             <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/profile" element={<Profile />} /> 
            {/* Add more routes as needed for other pages */}
          </Routes>
          <BackToTopButton />
        <Footer/>
    </Router>
    </CartProvider>
  );
};

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Wishlist from "./pages/Wishlist";
// import UserDashboard from "./pages/UserDashboard";
// import ContactUs from "./pages/ContactUs";
// import AboutUs from "./pages/AboutUs";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import BlogPage from "./pages/BlogPage";
// import AdminPanel from "./pages/AdminPanel";  


// // Sample Components for Pages
// <UserDashboard/>;
// <Wishlist/>;
// <ContactUs/>;
// <AboutUs/>;
// <PrivacyPolicy/>;
// <BlogPage/>;
// <AdminPanel/>;

// const Navbar = () => (
//   <nav className="p-4 bg-blue-500 text-white flex space-x-4">
//     <Link to="/userdashboard">UserDashboard</Link>
//     <Link to="/wishlist">Wishlist</Link>
//     <Link to="/search">Search</Link>
//     <Link to="/contact">Contact Us</Link>
//     <Link to="/about">About Us</Link>
//     <Link to="/privacy">Privacy Policy</Link>
//     <Link to="/blog">Blog</Link>
//     <Link to="/admin">Admin Panel</Link>
//   </nav>
// );

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/userdashboard" element={<UserDashboard/>} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/privacy" element={<PrivacyPolicy />} />
//         <Route path="/blog" element={<BlogPage />} />
//         <Route path="/admin" element={<AdminPanel />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
