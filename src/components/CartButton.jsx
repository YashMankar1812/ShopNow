import { useCart } from "../components/CartContext";
import { CiShoppingCart } from "react-icons/ci";

const CartButton = ({ handleRedirect }) => {
  const { cart } = useCart(); // Get cart items from context

  return (
    <button className="relative" onClick={handleRedirect}>
      <CiShoppingCart className="stroke-1 text-lg" />
      
      {/* Show badge only if cart has items */}
      {cart.length > 0 && (
        <span className="absolute text-red  rounded-full text-xs px-1 bottom-2 left-3">
          {cart.length}
        </span>
      )}
    </button>
  );
};

export default CartButton;
