import React from 'react';

const SubscriptionForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="flex bg-white rounded-l w-full max-w-3xl">
        {/* Left Side */}
        <div className="w-1/2 p-6 bg-blue-500">
          <h1 className="text-2xl font-bold mb-4 text-white">Subscribe To Our Newsletter</h1>
          <p className="mb-4 text-white" >Stay updated with our latest products, exclusive offers, and shopping tips. Get 10% off on your first order!</p>
        </div>
        
        {/* Right Side: Subscription Form */}
        <div className="w-1/2 p-6  max-w-3xl ">
          <form className="rounded-lg">
            <div className="mb-4 rounded-lg">
              <label className="block text-sm font-semibold" htmlFor="fullName">Full Name</label>
              <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="fullName" placeholder="Enter your full name" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold" htmlFor="email">Email Address</label>
              <input className="border border-gray-300 rounded-md p-2 w-full" type="email" id="email" placeholder="Enter your email address" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold" htmlFor="interests">Interests</label>
              <select className="border border-gray-300 rounded-md p-2 w-full" id="interests">
                <option>Select your interests</option>
                <option>Exclusive deals and promotions</option>
                <option>New product launches</option>
                <option>Seasonal sales alerts</option>
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="agreement" required />
              <label htmlFor="agreement" className="text-sm ml-2">I agree to receive marketing emails and can unsubscribe at any time. View our <a href="#" className="text-blue-600">Privacy Policy</a>.</label>
            </div>
            <button className="bg-blue-600 text-white rounded-md p-2 w-full" type="submit">Subscribe Now</button>
          </form>
        </div>
          <div className=" text-gray-600">
            <p>Join our community of 50,000+ subscribers</p>
            <p>4.9/5 Rating</p>
            <p>24/7 Updates</p>
          </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;