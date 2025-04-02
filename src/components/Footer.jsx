import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaApple, FaGooglePlay, FaInstagram, FaXTwitter, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <footer className="bg-gray-900 py-8 sm:py-12 font-poppins text-white">
      <ToastContainer />
      <div className="text-center mb-8 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl p-2 pb-3 sm:pb-5 text-gray-400">ShopNow</h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-md mx-auto">
          Your one-stop destination for quality products and exceptional service.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
        {/* Quick Links Section */}
        <div className="xs:text-left">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Quick Links</h3>
          <ul className="space-y-1 sm:space-y-2">
            {["Home", "Shop", "Sales", "Categories", "Contact", "Blog"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-xs sm:text-sm text-gray-400 hover:text-teal-300 transition hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="xs:text-left">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Customer Service</h3>
          <ul className="space-y-1 sm:space-y-2">
            {["Track Order", "Shipping Policy", "Returns & Exchanges", "FAQs", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-xs sm:text-sm text-gray-400 hover:text-teal-300 transition hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="col-span-1 xs:col-span-2 sm:col-span-1 md:col-span-1">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Newsletter</h3>
          <p className="mb-3 sm:mb-4 text-gray-400 text-xs sm:text-sm md:text-base">Subscribe to receive updates and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full text-xs sm:text-sm p-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white py-2 px-3 sm:px-4 rounded-md flex items-center justify-center gap-1 sm:gap-2 transition text-xs sm:text-sm"
            >
              <FaPaperPlane className="text-white" />
              <span>Subscribe</span>
            </button>
          </form>
        </div>

        {/* Download App & Social Media */}
        <div className="col-span-1 xs:col-span-2 sm:col-span-2 md:col-span-1">
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Download Our App</h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">Shop on the go with our mobile app.</p>

            <div className="flex flex-col xs:flex-row justify-center sm:justify-start gap-2 sm:gap-4">
              <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition text-xs sm:text-sm">
                <FaApple className="text-lg sm:text-xl" /> App Store
              </button>
              <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition text-xs sm:text-sm">
                <FaGooglePlay className="text-lg sm:text-xl" /> Google Play
              </button>
            </div>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-4 sm:mt-6">Follow Us</h3>
            <div className="flex justify-center sm:justify-start gap-3 sm:gap-4 mt-2 sm:mt-3">
              {[FaInstagram, FaXTwitter, FaTiktok, FaPinterest, FaYoutube].map((Icon, index) => (
                <Icon key={index} className="text-xl sm:text-2xl cursor-pointer hover:text-gray-500 transition" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-400 mt-8 sm:mt-12 text-xs sm:text-sm md:text-base px-4">
        <p>© {new Date().getFullYear()} ShopNow. All rights reserved. Developed by Yash Mankar</p>
      </div>
    </footer>
  );
};

export default Footer;
