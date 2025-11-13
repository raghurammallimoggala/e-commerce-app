import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../../redux/cartSlice";

function CartItem({ cartItemDetails }) {
  const { id, title, brand, quantity, price, imageUrl } = cartItemDetails;
  const dispatch = useDispatch(); 

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(decrementQuantity(id));
    }
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(id));
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <li className="flex flex-row bg-white p-4 rounded-lg shadow-custom-3 mb-3">
      <img className="w-20 h-20 object-cover rounded" src={imageUrl} alt={title} />
      <div className="flex flex-row items-center justify-between gap-4 ml-5 mr-5 w-full">
        <div className="flex-col">
          <p className="text-lg font-semibold text-[#171f46]">{title}</p>
          <p className="text-sm text-[#616e7c]">by {brand}</p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button type="button" data-testid="minus" onClick={handleDecrement}>
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="text-sm font-semibold">{quantity}</p>
          <button type="button" data-testid="plus" onClick={handleIncrement}>
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>

        <div className="flex flex-row justify-center items-center mr-4">
          <p className="text-[#0b69ff] font-semibold mt-2">Rs {price}/-</p>
          <button
            type="button"
            data-testid="remove"
            onClick={handleRemoveItem}
            className="text-red-500 text-sm font-medium hover:underline md:hidden"
          >
            Remove
          </button>
        </div>
      </div>

      <button type="button" data-testid="remove" onClick={handleRemoveItem}>
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
}

export default CartItem;