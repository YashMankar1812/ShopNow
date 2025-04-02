import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import React, { useState, useEffect } from "react";
import ShopByCategory from "./ShopByCategory";
import TrendingProduct from "./TrendingProduct";
import CustomerReview from "./CustomerReview";
import SpecialOffers from "./SpecialOffers";
import ShippingInformation from "./ShippingInformation";
// import PaymentPage from "./PaymentPage";
import PaymentOptions from "./PaymentOptions";
import ProductDetails from "./ProductDetails";
import Checkout from "./Checkout";
import TravelSlider from "./TravelSlider";
import FAQPage from "./FAQPage";
import BayWindowSlider from "./BayWindowSlider";
import OrderSummary from "./OrderSummary";
import UserDashboard from "./UserDashboard";
import { Carousel } from "react-responsive-carousel";
// import Main from "../components/Main";
import AllSlidersPage from "./AllSliderPage";
// import PaymentOptions from "./PaymentOptions";
// import OrderSummary from "./OrderSummary";
import CategoryGrid from "./CategoryGrid.jsx";
import BlogPage from "../pages/BlogPage";
// import Shop from "../components/Shop";
import OffersDiscountsPage from "../pages/OffersDiscountsPage";
import AboutUs from "../pages/AboutUs";
import { Pagination, Navigation, Autoplay } from "swiper";
import NewCollection from "../pages/NewCollection";
import ProductCategoriesSlider from "../pages/ProductCategoriesSlider";



// ---------- Image Slider Component ----------
const HeroSection = () => {
  const images = [
    "https://img.freepik.com/free-photo/woman-holds-fashion-shopping-bag-beauty_1150-13673.jpg",
    "https://img.freepik.com/free-vector/flat-shopping-center-social-media-post-template_23-2149319664.jpg?ga=GA1.1.1659243566.1707889813&semt=ais_hybrid",
    "https://img.freepik.com/free-psd/modern-sales-banner-template_23-2148995445.jpg?t=st=1742470468~exp=1742474068~hmac=81474773bc7d030bb5af26a9e4fb55f0504ed7ea6a050aa39cf93c9b2d3bcf70&w=1800",
    "https://img.freepik.com/free-psd/colorful-pop-medium-banner-template-design_23-2151790371.jpg?t=st=1742470066~exp=1742473666~hmac=24d83bfb3548e736c125975551a7426b9cc4090e2ab181b79f5a0d69cbdcb87d&w=900",
    "https://img.freepik.com/free-vector/realistic-horizontal-sale-banner-template-with-photo_23-2149017940.jpg?t=st=1742470251~exp=1742473851~hmac=05a7447a89f429633c47057921207ccb4dcdd357a2584a93049d988cc3fa3cac&w=1380",
    "https://img.freepik.com/premium-photo/seasonal-discounts-happy-spouses-standing-with-shopping-bags-pointing-free-space-yellow_116547-76493.jpg?ga=GA1.1.1659243566.1707889813&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/online-shopping-banner-template_23-2148764566.jpg?t=st=1742470289~exp=1742473889~hmac=5e5653587029e3570dd03a277a12b56349bd9465d8da2e5c28f75c2660d61ba8&w=1380",
    "https://img.freepik.com/free-vector/flat-design-horizontal-sale-banner_23-2150287081.jpg?t=st=1742469138~exp=1742472738~hmac=204318672d6397be83aa5e0a19c11119787a0d03f64c10c523640f73e5fe7ac9&w=1380",
    "https://img.freepik.com/free-vector/flat-design-horizontal-sale-banner_23-2150287078.jpg?t=st=1742469650~exp=1742473250~hmac=1bb20d8e27302fc1202fbc5ed0b66499a6928f82da664d1b49aea84718cf251b&w=1380",
    "https://img.freepik.com/premium-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg",
    
    
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/18de31e52e204bee.jpg?q=20",
    "https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-118763.jpg",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1d4456d79592a9fe.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/63f47aa6a19098cc.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/c1bf4e97384ebd48.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/2a424b4ce6a5f5b2.jpg?q=20",
    "https://img.freepik.com/free-photo/excited-girl-scream-joy-making-fist-pump-holding-shopping-bag-rejoicing-standing-dress-ove_1258-120529.jpg",
    // "https://rukminim2.flixcart.com/fk-p-flap/520/280/image/bf4c75ae837a1db2.jpg?q=20",

  ];

  return (
    <>
    
    
    <div className="md:flex-row items-center font-poppins ">
      {/* <h3 className="text-2xl font-bold mb-4">Image Slider</h3> */}

      <NewCollection/>
      <ProductCategoriesSlider/>
      <AboutUs/>
    <ShopByCategory />
  <TravelSlider />
  <ProductDetails/>
  <OffersDiscountsPage/>
  <CategoryGrid/>
  <BlogPage/>
  <TrendingProduct />
  <CustomerReview />
  <SpecialOffers />
  <ShippingInformation />
  <FAQPage/>
  {/* <Checkout/> */}
  {/* <PaymentOptions/> */}
  {/* <OrderSummary/> */}
    </div>
    </>
  );
};

export default HeroSection;
