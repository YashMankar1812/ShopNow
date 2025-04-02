import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "../components/CheckoutForm";
import PaymentOptions from "../components/PaymentOptions";
// import OrderSummary from "../components/OrderSummary";

const Checkout = () => {
  const [shippingDetails, setShippingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleFormSubmit = (details) => {
    setShippingDetails(details);
    toast.info("Shipping details saved!", { position: "top-center" }); // Info toast
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    toast.success(`Payment method selected: ${method}`, { position: "top-center" });
  };

  const handleOrderConfirm = () => {
    if (!shippingDetails || !paymentMethod) {
      toast.error("Please complete all steps before placing an order.", { position: "top-center" });
      return;
    }
    toast.success(" Order placed successfully!", { position: "top-center", autoClose: 3000 });
    // Call API or update database logic here
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-poppins ">
      <h1 className="text-2xl  text-center mb-4">Checkout</h1>
      <CheckoutForm onFormSubmit={handleFormSubmit} />
      {shippingDetails && <PaymentOptions onPaymentSelect={handlePaymentSelect} />}
      {/* {shippingDetails && paymentMethod && <OrderSummary />} */}
      {shippingDetails && paymentMethod && (
        <button
          className="bg-green-500 text-white p-3 w-full mt-4 rounded"
          onClick={handleOrderConfirm}
        >
          Place Order
        </button>
      )}
    </div>
  );
};

export default Checkout;
