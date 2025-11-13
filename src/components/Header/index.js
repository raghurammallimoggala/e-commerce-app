import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Cookies from "js-cookie";
function Header(){
    const cartItems=useSelector(state=>state.cart.cartList || [])
    const navigate=useNavigate()
    const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  }

  const renderCartItemsCount = () => {
    const totalCount = cartItems.length;
  
    if (totalCount > 0) {
      return (
        <span className="bg-[#bfdbfe] md:bg-[#e6f6ff] text-[#0967d2] text-[12px] font-roboto font-medium rounded-full px-[5px] py-[2px] ml-2">
          {totalCount}
        </span>
      );
    }
    return null;
  };
    return (
   <nav className="flex justify-center border-b border-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-between w-[90%] max-w-[1110px] py-6">
        <div className="flex justify-between w-full md:hidden">
          <Link to="/">
            <img
              className="w-[110px]"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="border-none bg-transparent cursor-pointer"
            onClick={onClickLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="w-6"
            />
          </button>
        </div>

        <div className="hidden md:flex items-center justify-between w-full max-w-[1110px]">
          <Link to="/">
            <img
              className="w-[165px]"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
          </Link>
          <div className="flex flex-row items-center">
          <ul className="flex flex-row justify-end list-none m-0 p-0">
            <li className="mx-2 font-roboto font-normal text-[16px]">
              <Link to="/" className="flex items-center text-[#475569] no-underline"> 
                Home
              </Link>
            </li>

            <li className="mx-2 font-roboto font-normal text-[16px]">
              <Link to="/products" className="flex items-center text-[#475569] no-underline">
                Products
              </Link>
            </li>

            <li className="mx-2 font-roboto font-normal text-[16px]">
              <Link to="/cart" className="flex items-center text-[#475569] no-underline">
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="hidden md:inline-block font-roboto font-semibold text-[14px] px-4 py-2 text-white bg-[#0967d2] rounded cursor-pointer"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      </div>
      <div className="w-full md:hidden">
        <ul className="flex flex-row justify-around items-center h-[70px] bg-[#e6f6ff] list-none m-0 p-0">
          <li>
            <Link to="/" className="flex items-center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="w-6"
              />
            </Link>
          </li>

          <li>
            <Link to="/products" className="flex items-center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="w-6"
              />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="flex items-center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="w-6"
              />
              {renderCartItemsCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Header;