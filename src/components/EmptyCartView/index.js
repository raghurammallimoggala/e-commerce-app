import {Link} from "react-router-dom";
function EmptyCartView(){
    return (
        <div className="flex flex-col justify-center items-center ">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="w-[200px] h-40 mb-4"
      alt="cart empty"
    />
    <h1 className="text-[#171f46] text-[25px] font-roboto font-semibold">Your Cart Is Empty</h1>

    <Link to="/products">
      <button type="button" className="text-[#ffffff] bg-[#0b69ff] rounded p-2 mt-3">
        Shop Now
      </button>
    </Link>
  </div>

    )
}
export default EmptyCartView;