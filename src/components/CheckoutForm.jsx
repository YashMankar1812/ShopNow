import { useState } from "react";
import { FiUser, FiHome, FiMapPin, FiPhone, FiCreditCard } from "react-icons/fi";

const CheckoutForm = ({ onFormSubmit, user = {} }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    zip: user.zip || "",
    phone: user.phone || "",
    saveInfo: false,
    paymentMethod: "credit-card"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const states = [
    { code: "NY", name: "New York" },
    { code: "CA", name: "California" },
    { code: "IL", name: "Illinois" },
    { code: "TX", name: "Texas" },
    { code: "FL", name: "Florida" },
    { code: "PA", name: "Pennsylvania" },
    { code: "OH", name: "Ohio" }
  ];

  const cities = {
    "NY": ["New York City", "Buffalo", "Rochester", "Albany"],
    "CA": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    "IL": ["Chicago", "Springfield", "Peoria", "Naperville"],
    "TX": ["Houston", "Dallas", "Austin", "San Antonio"],
    "FL": ["Miami", "Orlando", "Tampa", "Jacksonville"]
  };

  const validate = () => {
    let newErrors = {};
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!/^\d{5,6}(-\d{4})?$/.test(formData.zip)) newErrors.zip = "Enter a valid ZIP code";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter a valid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }

    // Reset city when state changes
    if (name === "state") {
      setFormData(prev => ({
        ...prev,
        city: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      try {
        await onFormSubmit(formData);
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-poppins ">
      <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white">
          <h2 className="text-2xl font-bold">Checkout Information</h2>
          <p className="opacity-90">Please enter your shipping and payment details</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Personal Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2 text-teal-600" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                    placeholder="(123) 456-7890"
                  />
                  <FiPhone className="absolute right-3 top-3.5 text-gray-400" />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiHome className="mr-2 text-teal-600" />
              Shipping Address
            </h3>
            
            {/* Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.address ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="123 Main St, Apartment 4B"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* State */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.state ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white`}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 top-7">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              {/* City - Dynamic based on state */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.state}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.city ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white ${!formData.state ? "bg-gray-100" : ""}`}
                >
                  <option value="">Select City</option>
                  {formData.state && cities[formData.state]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 top-7">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* ZIP Code */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.zip ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="10001"
                />
                {errors.zip && (
                  <p className="mt-1 text-sm text-red-600">{errors.zip}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          {/* <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiCreditCard className="mr-2 text-teal-600" />
              Payment Method
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 border rounded-lg hover:border-teal-500 transition-colors">
                <input
                  id="credit-card"
                  name="paymentMethod"
                  type="radio"
                  value="credit-card"
                  checked={formData.paymentMethod === "credit-card"}
                  onChange={handleChange}
                  className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                  Credit Card
                </label>
              </div>
              
              <div className="flex items-center p-4 border rounded-lg hover:border-teal-500 transition-colors">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleChange}
                  className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                  PayPal
                </label>
              </div>
            </div>
          </div> */}

          {/* Save Information Checkbox */}
          <div className="flex items-center mb-8">
            <input
              id="save-info"
              name="saveInfo"
              type="checkbox"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="h-5 w-5 text-teal-600 focus:ring-teal-500 rounded"
            />
            <label htmlFor="save-info" className="ml-2 block text-sm text-gray-700">
              Save this information for next time
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center justify-center ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Complete Order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;