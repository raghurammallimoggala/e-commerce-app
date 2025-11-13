import { Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function Header(){
  const navigate=useNavigate();
  const onChange=()=>{ 
     Cookies.remove("jwt_token") 
     navigate("/login")

  };
  const cartList=useSelector((state)=>state.cart.cartList);
  const cartCount=cartList?.length || 0;

  const renderCartItemCount=()=>{
    if(cartCount > 0){
      return(
        <span className="font-roboto text-[#475569]">{cartCount}</span>
      );
    }
    return null;

  };

    return(
        <nav className="flex flex-row  w-full  border-b-2 border-gray-300 shadow-lg p-2">
    <div className="flex flex-row justify-between w-full">
      <div className=" block lg:hidden  flex-row items-center  w-full">
        <img
          className="w-32 h-12 m-4"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        />
        <button type="button" className="nave-mobile-btn" onClick={onChange}>
          <img
            className="nave-mobile-img"
            alt="nav logout"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
          />
        </button>
      </div>
      <div className="hidden lg:flex flex-row  justify-between items-center w-full ">
        <Link to="/">
            <img
              className="w-36 h-12 m-4 ml-[80px]"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
          </Link>
          <div className="flex flex-row justify-between items-center w-[300px] mr-[50px]">
        <ul className="flex flex-row  space-x-6 items-center">
          <li><Link to="/" className="font-roboto text-[#475569]">Home</Link></li>
          <li><Link to="/products" className="font-roboto text-[#475569]">Products</Link></li>
          <li><Link to="/cart" className="font-roboto text-[#475569]">Cart {renderCartItemCount()}</Link></li>
        </ul>
        <button type="button" className="bg-[#0967d2] h-9 w-16 text-white  rounded-lg shadow-custom-3 hover:bg-[#0045b3] mr-5 " 
        onClick={onChange}>
          Logout
        </button>
      </div>
      </div>
    </div>
    <div className="block lg:hidden">
      <ul className="nave-mobile-list">
        <li><Link className="nave-item" to="/">
          <img
            className="nave-bar-img"
            alt="nav home"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
          />
          </Link>
        </li>
        <li><Link className="nave-item" to="/products">
          <img
            className="nave-bar-img"
            alt="nav products"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
          />
          </Link>
        </li>
        <li><Link className="nave-item" to="/cart">
          <img
            className="nave-bar-img"
            alt="nav cart"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
          /> {renderCartItemCount()}
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

}
export default Header;