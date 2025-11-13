import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import ProductCard from "../ProductCard";
import {ThreeDots} from "react-loader-spinner";

const apiStatusConstants={
    initial:'INITIAL',
    inProgress:'IN_PROGRESS',
    success:'SUCCESS',
    failure:'FAILURE'
}
function PrimeDealsSection(){
    const [primeDeals, setPrimeDeals]=useState([])
    const [apiStatus,setApiStatus]=useState(apiStatusConstants.initial)

    const getPrimeDeals=async()=>{
         setApiStatus(apiStatusConstants.inProgress);
         const jwtToken=Cookies.get('jwt_token');
         const url="https://apis.ccbp.in/prime-deals";

         const options={
            method:'GET',
            headers:{
                Authorization:`Bearer ${jwtToken}`,
            },
         };
         try {
      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        const updatedData = data.prime_deals.map(product => ({
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: product.price,
          imageUrl: product.image_url,
          rating: product.rating,
        }))
        setPrimeDeals(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else if (response.status === 401) {
        setApiStatus(apiStatusConstants.failure)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

    useEffect(() => {
    getPrimeDeals();
  }, []);

    const renderPrimeDealsListView=()=>(
        <div>
          <h1 className="text-[#475569] font-roboto font-semibold text-[32px] mt-[48px] ">Exclusive Prime Deals</h1>
          <ul className="flex flex-wrap gap-[32px] mt-[32px] mb-[48px]">
            {primeDeals.map(product=>(
              <ProductCard key={product.id} productData={product}/>
            ))}
          </ul>
        </div>
    )


    const renderPrimeDealsFailureView=()=>(
      <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="register prime"
      className="mt-[30px]"
    />
    )

    const renderLoadingView = () => (
    <div className="flex justify-center items-center h-[50vh]">
      <ThreeDots color="#0b69ff" height="50" width="50" />
    </div>
  )
    
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPrimeDealsListView()
      case apiStatusConstants.failure:
        return renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
    

} 
export default PrimeDealsSection;