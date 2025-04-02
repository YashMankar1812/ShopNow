import { useState } from "react";

const CheckoutForm = ({ onFormSubmit, user = {} }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    zip: user.zip || "",
    phone: user.phone || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!/^\d{5,6}$/.test(formData.zip)) newErrors.zip = "Enter a valid ZIP code.";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onFormSubmit(formData);
  };

  return (
    <form className="bg-gray-200 p-6 mt-10 rounded-lg shadow-lg max-w-lg mx-auto " onSubmit={handleSubmit}>
      <h2 className="text-2xl text-center mb-4 text-gray-800">Shipping Details</h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Address</label>
        <input
          type="text"
          name="address"
          placeholder="123 Main St, Apartment 4B"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* City & State */}
      <div className="flex gap-4 mb-4">
  {/* City Dropdown */}
  <div className="w-1/2">
    <label className="block text-gray-700 font-medium">City</label>
    <select
      name="city"
      value={formData.city}
      onChange={handleChange}
      className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 bg-white"
    >
      <option value="">Select City</option>
      <option value="New York">New York</option>
      <option value="Los Angeles">Los Angeles</option>
      <option value="Chicago">Chicago</option>
      <option value="Houston">Houston</option>
      <option value="Miami">Miami</option>
    </select>
    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
  </div>

  {/* State Dropdown */}
  <div className="w-1/2">
    <label className="block text-gray-700 font-medium">State</label>
    <select
      name="state"
      value={formData.state}
      onChange={handleChange}
      className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 bg-white"
    >
      <option value="">Select State</option>
      <option value="NY">New York</option>
      <option value="CA">California</option>
      <option value="IL">Illinois</option>
      <option value="TX">Texas</option>
      <option value="FL">Florida</option>
    </select>
    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
  </div>
</div>


      {/* ZIP Code */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">ZIP Code</label>
        <input
          type="text"
          name="zip"
          placeholder="10001"
          value={formData.zip}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400"
        />
        {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="9876543210"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-teal-600 text-white  py-2 w-full rounded-md hover:bg-teal-700 text-lg  transition duration-200"
      >
        Save & Continue
      </button>
    </form>
  );
};

export default CheckoutForm;
