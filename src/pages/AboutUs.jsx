import React, { useEffect } from "react";
import { FaStore, FaUsers, FaCheckCircle, FaGlobe, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzJTIwbWFufGVufDB8fDB8fHww",
      bio: "Serial entrepreneur with 15+ years in eCommerce innovation."
    },
    {
      name: "Jane Smith",
      role: "COO & Head of Operations",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1c2luZXNzJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
      bio: "Operations specialist scaling businesses globally."
    },
    {
      name: "Michael Johnson",
      role: "CTO & Lead Developer",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlY2glMjBsZWFkfGVufDB8fDB8fHww",
      bio: "Tech visionary with expertise in scalable eCommerce solutions."
    },
  ];

  const coreValues = [
    {
      title: "Customer Centricity",
      icon: <FaUsers className="text-2xl" />,
      description: "We put our customers at the heart of every decision we make."
    },
    {
      title: "Innovation",
      icon: <FaLightbulb className="text-2xl" />,
      description: "Constantly pushing boundaries to deliver cutting-edge solutions."
    },
    {
      title: "Integrity",
      icon: <FaShieldAlt className="text-2xl" />,
      description: "Building trust through transparency and ethical practices."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins m-10 ">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4" data-aos="fade-down">
            About ShopNow
          </h1>
          <p className="text-xl max-w-3xl mx-auto" data-aos="fade-down" data-aos-delay="200">
            Redefining eCommerce through innovation, trust, and exceptional customer experiences
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Who We Are */}
        <section className="mb-20" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className=" p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <FaStore className="text-teal-600 text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Who We Are</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  ShopNow is a premier eCommerce platform that bridges the gap between local merchants and global consumers. 
                  Founded in 2015, we've grown from a small startup to a market leader serving millions of customers worldwide. 
                  Our platform offers an unparalleled selection of products across all categories, powered by cutting-edge 
                  technology and a customer-first philosophy.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="ShopNow team working" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
                data-aos="zoom-in"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20  p-12" data-aos="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-teal-100 p-3 rounded-full mb-4">
              <FaGlobe className="text-teal-600 text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
            <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-8 rounded-lg" data-aos="fade-right">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mission</h3>
              <p className="text-gray-700">
                To democratize eCommerce by providing a platform that empowers both buyers and sellers through 
                innovative technology, transparent processes, and exceptional service. We're committed to making 
                online shopping accessible, secure, and enjoyable for everyone.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg" data-aos="fade-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vision</h3>
              <p className="text-gray-700">
                To become the world's most trusted eCommerce ecosystem, where businesses of all sizes can thrive 
                and customers can discover anything they need with confidence. We aim to redefine retail by 
                integrating advanced technologies like AI and blockchain to create seamless shopping experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-teal-100 p-3 rounded-full mb-4">
              <FaCheckCircle className="text-teal-600 text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every interaction we have
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-teal-600"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the Team */}
        <section className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-teal-100 p-3 rounded-full mb-4">
              <FaUsers className="text-teal-600 text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate professionals driving ShopNow's success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-80 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>
                <div className="p-6 text-center relative -mt-12">
                  <div className="w-24 h-24 mx-auto rounded-full border-4 border-white overflow-hidden relative shadow-md">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-gray-800">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
};

export default AboutUs;