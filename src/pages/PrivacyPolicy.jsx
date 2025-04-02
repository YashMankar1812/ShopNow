import React, { useState } from "react";
import { FaLock, FaFileContract } from "react-icons/fa";

const policies = [
  {
    title: "Privacy Policy",
    content: `At ShopNow, we respect your privacy. We collect necessary data such as 
      name, email, and payment details for order processing. We do not share your 
      information with third parties without consent. Cookies are used to enhance your 
      experience. You have the right to request data deletion at any time.`,
  },
  {
    title: "Terms of Service",
    content: `By using ShopNow, you agree to follow all policies outlined. Users must provide 
      accurate information and refrain from fraudulent activity. We reserve the right to 
      suspend accounts that violate these terms. Disputes will be resolved under applicable laws.`,
  },
  {
    title: "User Data & Security",
    content: `Your data is securely stored using encrypted technologies. Payment transactions 
      are processed via secure gateways to ensure safety. We do not store sensitive payment 
      details such as CVV or full card numbers.`,
  },
  {
    title: "Cookies & Tracking",
    content: `ShopNow uses cookies to personalize your experience. These track website interactions 
      to provide better recommendations. Users can disable cookies in browser settings, but some 
      features may not work properly.`,
  },
  {
    title: "Refund & Return Policy",
    content: `Returns are accepted within 14 days of delivery. Items must be unused and in original 
      packaging. Refunds are processed within 7 business days. Digital goods and perishable items 
      are non-refundable.`,
  },
];

const PrivacyPolicy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">📜 Privacy Policy & Terms</h1>

      {/* Accordion UI */}
      <div className="max-w-3xl mx-auto">
        {policies.map((policy, index) => (
          <div key={index} className="bg-white mb-4 p-4 rounded-lg shadow-md">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left flex justify-between items-center text-lg font-semibold text-gray-800"
            >
              <span>{policy.title}</span>
              <span>{openIndex === index ? "➖" : "➕"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{policy.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
