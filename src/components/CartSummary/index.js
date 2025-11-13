import {useSelector} from "react-redux";
function CartSummary(){
    const cartList=useSelector((state)=> state.cart.cartList);
    const total= cartList.reduce((sum,items)=>sum+items.price*items.quantity,0);
    return(
        <div>
        <div className="flex flex-col p-4 bg-[#ffffff] rounded w-[95%] lg:w-[100%]">
            <h1 className="text-[#616e7c] text-[20px] font-roboto font-semibold mb-2 flex-row">
              Order Total:<span className="text-[#171f46] text-[25px] font-roboto font-semibold ">Rs {total}/-</span>
            </h1>
            <p className="text-[#616e7c] text-[16px] font-roboto">{cartList.length} Items in cart</p>
            <button type="button" className=" text-[#ffffff] bg-[#0b69ff] font-roboto rounded w-full hidden lg:block mt-3 py-2">
              Checkout
            </button>
          </div>
          <button type="button" className="text-[#ffffff] bg-[#0b69ff] font-roboto rounded w-full lg:hidden mt-3 py-2">
            Checkout
          </button>
        </div>

    )
}
export default CartSummary;