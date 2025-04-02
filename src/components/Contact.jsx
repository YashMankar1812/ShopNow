import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "",
    subject: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true
    });
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message, subject } = formData;
    setIsSubmitting(true);

    // Validation
    if (!name || !email || !message || !subject) {
      toast.error("All fields are required!", { theme: "colored" });
      setIsSubmitting(false);
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address!", { theme: "colored" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Your message has been sent successfully!", { theme: "colored" });
      console.log("Form Data:", formData);
      setFormData({ name: "", email: "", message: "", subject: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.", { theme: "colored" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-poppins bg-white m-10">
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 ">Contact Us</h2>
        <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or want to discuss a project? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Information */}
        <div data-aos="fade-right" className="space-y-8 ">
          <div className=" p-8 ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-teal-50 p-3 rounded-lg text-teal-600">
                  <FaMapMarkerAlt className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Our Location</h4>
                  <p className="mt-1 text-gray-600">123 Business Avenue, Suite 500<br />San Francisco, CA 94107</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-teal-50 p-3 rounded-lg text-teal-600">
                  <FaPhone className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                  <p className="mt-1 text-gray-600">+1 (555) 123-4567<br />Mon-Fri, 9am-5pm PST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-teal-50 p-3 rounded-lg text-teal-600">
                  <FaEnvelope className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Email</h4>
                  <p className="mt-1 text-gray-600">info@company.com<br />support@company.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                  <FaFacebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="overflow-hidden ">
            <img
              src="https://www.ujudebug.com/wp-content/uploads/2022/07/contact-us-content.gif"
              alt="Contact Us"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div data-aos="fade-left" className=" p-8 ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Send Us a Message</h3>
          <p className="text-gray-600 mb-8">We'll get back to you within 24 hours</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  placeholder="How can we help?"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// import React, { useState, useEffect } from "react";
// import {
//   FaMapMarkerAlt,
//   FaPhone,
//   FaEnvelope,
//   FaFacebook,
//   FaInstagram,
//   FaTwitter,
// } from "react-icons/fa";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, message } = formData;

//     if (!name || !email || !message) {
//       toast.error("All fields are required!", { theme: "colored" });
//       return;
//     }
//     if (!isValidEmail(email)) {
//       toast.error("Invalid email address!", { theme: "colored" });
//       return;
//     }
    
//     toast.success("Message sent successfully!", { theme: "colored" });
//     console.log("Form Data:", formData);
    
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="container mx-auto p-10 mt-20  rounded-lg shadow-lg">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Contact Info */}
//         <div data-aos="fade-right">

//         <div className="">
//             <h4 className="text-lg font-semibold text-gray-700">Join Us</h4>
//             <div className="flex space-x-4 mt-2">
//               <a href="#" className="text-blue-500 text-2xl hover:text-blue-700"><FaFacebook /></a>
//               <a href="#" className="text-pink-500 text-2xl hover:text-pink-700"><FaInstagram /></a>
//               <a href="#" className="text-blue-400 text-2xl hover:text-blue-600"><FaTwitter /></a>
//             </div>
//           </div>
// <div className="m-10 w-full">
//   <img
//     src="https://www.ujudebug.com/wp-content/uploads/2022/07/contact-us-content.gif"
//     alt="Contact Us"
//     className="w-full h-auto object-contain"
//   />
// </div>

          

//         </div>

//         {/* Contact Form */}
//         <div data-aos="fade-left">
//         <h4 className="text-2xl font-poppins">Get in Touch</h4>
//           <form onSubmit={handleSubmit} className=" p-6 shadow-2xl border border-cyan-950 rounded-md">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">Message</label>
//               <textarea
//                 name="message"
//                 rows="2"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
