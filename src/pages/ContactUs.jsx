import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaCommentDots, FaQuestionCircle } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">📞 Contact Us</h1>

      {/* Customer Support Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
          <FaCommentDots /> Customer Support
        </h2>
        <p>📧 Email: <a href="mailto:support@ecommerce.com" className="text-blue-500">support@ecommerce.com</a></p>
        <p>📞 Phone: <a href="tel:+1234567890" className="text-blue-500">+1 234 567 890</a></p>
        <p>💬 Live Chat: Available 24/7</p>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
          <FaQuestionCircle /> Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="p-3 border rounded-md">
            <summary className="font-bold cursor-pointer">How can I track my order?</summary>
            <p className="mt-2 text-gray-600">You can track your order in the "My Orders" section of your account.</p>
          </details>
          <details className="p-3 border rounded-md">
            <summary className="font-bold cursor-pointer">What is the return policy?</summary>
            <p className="mt-2 text-gray-600">We offer a 30-day return policy for unused and unopened items.</p>
          </details>
          <details className="p-3 border rounded-md">
            <summary className="font-bold cursor-pointer">How can I contact customer support?</summary>
            <p className="mt-2 text-gray-600">You can email us at support@ecommerce.com or use the live chat feature.</p>
          </details>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3">📩 Send Us a Message</h2>
        {submitted ? (
          <p className="text-green-500 font-bold">✅ Your message has been sent. We'll get back to you soon!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-3 border rounded-md"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;

