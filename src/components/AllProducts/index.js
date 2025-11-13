
import {useEffect, useState, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import { setActiveOptionId } from "../../redux/filterSlice";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import FilterGroup from "../FilterGroup";
import ProductHeaders from "../ProductHeaders"; 
import ProductCard from "../ProductCard";


const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants={
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    inProgress:"IN_PROGRESS"
}

function AllProducts(){
 const {searchInput, activeCategoryId,activeRatingId,activeOptionId}=useSelector(state=>state.filters);
 const [apiStatus,setApiStatus]=useState(apiStatusConstants.initial);
 const [productsList,setProductsList]=useState([]);
 const dispatch=useDispatch();

 const getProducts= useCallback(async()=>{
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken=Cookies.get("jwt_token")
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId || ""}&category=${activeCategoryId || ""}&title_search=${searchInput || ""}&rating=${activeRatingId || ""}`;
    const options={
        method:"GET",
        headers:{
            Authorization:`Bearer ${jwtToken}`,
        },
    }
    const response=await fetch(apiUrl, options)
    console.log(response)
    if(response.ok){
     const  fetchData=await response.json()
     const updatedData=fetchData.products.map(product=>({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      imageUrl: product.image_url,
      rating: product.rating,

     }));

     setProductsList(updatedData);
     setApiStatus(apiStatusConstants.success);
      
    }else{
      setApiStatus(apiStatusConstants.failure);
    }

 },[searchInput, activeCategoryId, activeRatingId, activeOptionId]);

useEffect(()=>{
  getProducts();
 },[getProducts]);

 const onChangeSortby=(selectedOptionId)=>{
       dispatch(setActiveOptionId(selectedOptionId))
 };

 const renderProductsView=()=>{
  const shouldShowProductsList = productsList.length > 0
  return shouldShowProductsList ? (
    <div className="md:w-[70%] ml-[30px]">
      <ProductHeaders sortbyOptions={sortbyOptions} onChangeSortby={onChangeSortby}/>
      <ul className="flex flex-wrap pl-0 ">
        {productsList.map(each=>(
          <ProductCard key={each.id} productData={each}/>
        ))}
      </ul>
    </div>
) : (
      <div className="flex flex-col items-center justify-center mt-[48px] pb-[64px] md:ml-[30px] md:w-[70%] md:mt-0 md:pb-0">
  <img
    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
    className="w-[250px] h-[180px] md:w-[459px] md:h-[315px]"
    alt="no products"
  />
  <h1 className="text-[#171f46] font-roboto font-semibold text-[20px] leading-[1.3] md:mt-[32px] md:text-[24px]">
    No Products Found
  </h1>
  <p className="text-[#64748b] font-roboto font-normal text-[14px] leading-[1.3] w-[90%] max-w-[288px] text-center mt-[8px] md:mt-[12px] md:text-[18px] md:w-[60%] md:max-w-[466px]">
    We could not find any products. Try other filters.
  </p>
  </div>
    )
 }

 const renderLoaderView = () => (
    <div className="flex flex-col justify-center items-center mt-[48px] md:mt-0 md:w-[70%]" data-testid="loader">
      <ThreeDots color="#0b69ff" height="50" width="50" />
    </div>
  )

 const renderFailureView = () => (
    <div className="flex flex-col justify-center items-center mt-[48px] pb-[64px] md:ml-[30px] md:w-[70%] md:mt-0 md:pb-0">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="w-[250px] h-[200px] md:w-[400px] md:h-[350px]"
      />
      <h1 className="text-[#171f46] font-roboto font-semibold text-[20px] leading-[1.3] md:text-[24px]">
        Oops! Something Went Wrong
      </h1>
      <p className="text-[#64748b] font-roboto font-normal text-[16px] leading-[1.3] w-[90%] max-w-[288px] text-center mt-[8px] md:text-[18px] md:w-[60%] md:max-w-[466px]">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

const renderAllProductsView=()=>{
    switch(apiStatus){
        case apiStatusConstants.inProgress:
            return renderLoaderView()
        case apiStatusConstants.success:
            return renderProductsView()
        case apiStatusConstants.failure:
            return renderFailureView()
        default:
            return null
    }
};

    return (
        <div className="flex flex-col md:flex-row md:justify-between w-full">
            <FilterGroup  categoryOptions={categoryOptions} ratingsList={ratingsList}/>
            {renderAllProductsView()}
        </div>
    )
}
export default AllProducts;