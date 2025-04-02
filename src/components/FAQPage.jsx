import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, PayPal, and other secure payment methods. You can see all available options at checkout."
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery times vary based on location and shipping method chosen. Typically, orders are delivered within 3-7 business days."
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is shipped, we will send you a tracking link via email. You can use it to monitor the delivery status."
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unused items in their original packaging. Visit our Returns & Refunds page for more details."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-poppins flex flex-wrap justify-between items-center gap-8">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/3 px-10 flex justify-center">
        <img
          src="https://i.pinimg.com/originals/2b/9c/8d/2b9c8d4e069c9b9536d9e3196c515a14.gif"
          alt="FAQ Animation"
          className="w-full h-70 max-w-md"
        />
      </div>

      {/* Right Side - FAQ Section */}
      <div className="w-full md:w-1/2 mx-10 my-5">
        <h1 className="text-3xl  text-gray-800 mb-6">FAQ ... . . .</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border p-5 rounded-lg shadow-md text-gray-500 ">
              <button
                className="w-full text-left flex justify-between items-center font-semibold text-sm"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? <FaMinus className=""/> : <FaPlus/>}</span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="mt-2 text-gray-600 text-sm overflow-hidden"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
