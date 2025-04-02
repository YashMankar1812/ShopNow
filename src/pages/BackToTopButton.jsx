import { useState, useEffect } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 bg-teal-500 text-white rounded-full shadow-lg transition-all duration-300 z-[9999] ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <ArrowUpCircleIcon className="w-8 h-8" />
    </button>
  );
};

export default BackToTopButton;
