import {useEffect} from "react";
import {addToCart,incrementQuantity, decrementQuantity} from "../../redux/cartSlice";
import {Link, useParams} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {BsDashSquare, BsPlusSquare} from "react-icons/bs";
import {ThreeDots} from "react-loader-spinner"
import SimilarProductItem from "../SimilarProductItem";
import Header from "../Header";
import {apiStatusConstants, fetchProductData} from "../../redux/productSlice";
function ProductItemDetails(){
const dispatch=useDispatch();
const { id } = useParams();
const productId = parseInt(id);


const { productData, similarProducts, apiStatus } = useSelector((state) => state.product);
const cartList = useSelector((state) => state.cart.cartList);

const cartItem = cartList.find((item) => item.id === productId);
const quantity = cartItem ? cartItem.quantity : 1;

  
useEffect(() => {
    dispatch(fetchProductData(productId));
  }, [dispatch, productId]);


const onClickAddToCart = () => {
  if (productData) {
    dispatch(addToCart({ ...productData, quantity:1}));
  }
};


 const handleDecrement = () => {
  if (cartItem) {
    if (quantity > 1) {
      dispatch(decrementQuantity(productId));
    }
  }
};
 
 

 const handleIncrement = () => {
    if (cartItem) {
      dispatch(incrementQuantity(productId));
    }
  };
   
 const renderProductDetailsView=()=>{
    const {imageUrl, title, price, rating, totalReviews, description, availability, brand}=productData;
    return (
        <div className="flex flex-col w-full md:flex-col md:items-start md:justify-center p-4 md:ml-[60px]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-center p-4  w-full md:w-3/4">
                <img className="w-[400px] h-[500px] rounded-xl" src={imageUrl} alt="product"/>
                <div className="md:ml-6 mt-4 md:mt-0">
                    <h1 className="text-[35px] font-roboto font-bold">{title}</h1>
                    <p className="text-[#3e4c59] font-roboto font-semibold text-lg mt-2 mb-1">Rs {price}/-</p>
                    <div className="flex align-center">
                        <div className="flex flex-row bg-[#0b69ff] items-center mr-4 w-14 h-6 justify-center rounded">
                            <p className="text-[#ffffff] font-roboto font-semibold text-[14px] mt-2 mb-1">{rating}</p>
                            <img className="w-5 text-[#ffffff]" src="https://assets.ccbp.in/frontend/react-js/star-img.png" alt="star"/>
                        </div>
                        <p className="text-[#12022f] font-roboto text-[14px]">{totalReviews} Reviews</p>
                    </div>
                    <p className="text-[#616e7c] font-roboto text-sm mt-4 mb-4 leading-[1.3] md:text-lg md:mb-6">{description}</p>
                    <div className="flex mb-4">
                        <p className="text-[#171f46] font-roboto text-base font-medium m-0 md:text-lg">Available:</p>
                        <p className="text-[#616e7c] font-roboto text-base mt-1 ml-2 mb-0 md:[18px] ">{availability}</p>
                    </div>
                    <div className="flex mb-4 items-center">
                        <p className="text-[#171f46] font-roboto text-base font-medium m-0 md:text-lg md:-text-center">Brand:</p>
                        <p className="text-[#616e7c] font-roboto text-base mt-0 ml-2 mb-0 md:[18px] md:-text-center">{brand}</p>
                    </div>
                    <hr className="border-t border-[#cbced2] m-0"/>
                    <div className="flex align-center mt-4 mb-4">
                            <button className="bg-transparent border-none outline-none cursor-pointer"
                                type="button"
                                onClick={handleDecrement}
                                data-testid="minus">
                                <BsDashSquare className="text-[#616e7c] w-[16px] h-[16px]" />
                            </button>
                        <p className="text-[#616e7c] font-roboto text-xl font-medium mx-6">{quantity}</p>
                        <button
                            type="button"
                            className="bg-transparent border-none outline-none cursor-pointer"
                            onClick={handleIncrement}
                            data-testid="plus"
                        >
                            <BsPlusSquare className="text-[#616e7c] w-[16px] h-[16px]" />
                        </button>
                    </div>
                    <button
                    type="button"
                    className="bg-[#0b69ff] text-[#ffffff] text-[12px] p-3 rounded mb-[32px] md:text-[14px] md:mb-[48px]"
                    onClick={onClickAddToCart}
                    >
                    ADD TO CART
                    </button>
                </div>
            </div>
            <h1 className="text-[#3e4c59] font-roboto text-2xl font-medium m-0 md:text-[32px]">Similar Products</h1>
            <ul className="flex flex-wrap p-0 list-none md:mt-[24px]">
              {similarProducts.map(eachSimilarProduct => (
                <SimilarProductItem
                  productDetails={eachSimilarProduct}
                  key={eachSimilarProduct.id}
                />
              ))}
            </ul>
        </div>
    )

}

const renderFailureView=()=>(
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="w-64 h-64 md:w-80 md:h-80 mb-6"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Continue Shopping
        </button>
      </Link>
    </div>
)

const renderLoaderView=()=>(
    <div className="flex justify-center items-center" data-testid="loader">
      <ThreeDots color="#0b69ff" height="50" width="50" />
    </div>
)

const renderProductDetails=()=>{
    switch(apiStatus){
        case  apiStatusConstants.success:
            return renderProductDetailsView()
        case apiStatusConstants.failure:
            return renderFailureView()
        case apiStatusConstants.inProgress:
            return renderLoaderView()
        default:
            return null
    }
  }


    return(
         <>
         <Header/>
        <div className="product-container">
            {renderProductDetails()}
        </div>
       </>
    )
}
export default ProductItemDetails;