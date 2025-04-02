import { useState, useEffect } from "react";
import { IoCopySharp } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";

const offers = [
  {
    title: " Summer Sale - 30% Off",
    description: "Enjoy 30% off on all fashion items. Limited time offer!",
    coupon: "SUMMER30",
    validity: "Valid till July 30, 2025",
  },
  {
    title: "Buy 1 Get 1 Free",
    description: "Purchase any electronic gadget and get one free.",
    coupon: "B1G1FREE",
    validity: "Valid till August 15, 2025",
  },
  {
    title: " Flat ₹500 Off",
    description: "Get ₹500 off on orders above ₹5000.",
    coupon: "SAVE500",
    validity: "Valid till September 1, 2025",
  },
];

export default function OffersPage() {
  const [copiedCoupon, setCopiedCoupon] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  const handleCopyCoupon = (coupon) => {
    navigator.clipboard.writeText(coupon);
    setCopiedCoupon(coupon);
    setTimeout(() => setCopiedCoupon(""), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-teal-600 p-10 font-poppins">
      <div className="max-w-4xl w-full bg-white bg-opacity-10  rounded-xl p-10 ">
        <h1 className="text-2xl font-extrabold text-center text-white mb-6 drop-shadow-md tracking-wide" data-aos="fade-down">
         Exclusive Offers Just for You!
        </h1>
        <p className="text-gray-300 text-center mb-8 text-lg" data-aos="fade-up">
          Grab these amazing deals before they vanish!
        </p>

        <div className="space-y-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="relative p-6 bg-white/10 border border-gray-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
              data-aos="flip-up"
            >
              <h2 className="text-lg font-bold text-white">{offer.title}</h2>
              <p className="text-gray-300 mt-1">{offer.description}</p>
              <p className="text-gray-400 mt-2 text-sm">{offer.validity}</p>

              <div className="flex items-center justify-between mt-5">
                <span className="bg-gray-900 text-white px-4 py-2 rounded-lg text-lg font-mono tracking-wide shadow-md">
                  {offer.coupon}
                </span>

                <div className="relative group">
                  <button
                    className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:from-green-500 hover:to-blue-600 transition-all duration-300 ease-in-out shadow-md"
                    onClick={() => handleCopyCoupon(offer.coupon)}
                    data-aos="zoom-in"
                  >
                    {copiedCoupon === offer.coupon ? "Copied!" : <IoCopySharp size={20} />}
                  </button>
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 bg-black text-white text-xs rounded-md px-3 py-1 shadow-lg">
                    Copy
                  </span>
                </div>
              </div>

              {/* Floating Particles */}
              <div className="absolute -top-2 right-2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
