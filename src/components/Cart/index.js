import {useSelector, useDispatch} from "react-redux";
import Header from "../Header";
import CartListView from "../CartListView";
import CartSummary from "../CartSummary";
import EmptyCartView from "../EmptyCartView";
import { clearCart} from "../../redux/cartSlice";
function Cart(){
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.cart.cartList || []);
  const showEmptyView = cartList.length === 0;
 
  const onClickRemoveAllBtn= () => {
    dispatch(clearCart());
  };
  const onIncrement = (id) => {
  };

  const onDecrement = (id) => {
  };

  const onRemove = (id) => {
  };


    return (
        <div>
            <Header/>
            <div className=" flex justify-center min-h-[75vh] md:min-h-[90vh] w-full">
                {showEmptyView ? (<EmptyCartView/>) :(
                    <div className=" flex flex-col mb-4 w-full ml-32 mr-32">
                        <h1 className="text-[#171f46] font-roboto font-bold text-[30px]">My Cart</h1>
                        <div className="flex flex-col items-end w-full">
                        <button type="button" data-testid="remove" className="text-[#0b69ff] font-roboto font-bold"
                        onClick={onClickRemoveAllBtn}>
                            Remove All
                        </button>
                        <CartListView  
                        cartList={cartList}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}/>
                        <CartSummary/>
                    </div>
                    </div>
                )}
            </div>
        </div>

    )
}
export default Cart;        