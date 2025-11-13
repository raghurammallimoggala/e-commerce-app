import {Link} from 'react-router-dom'
function ProductCard({productData}){
  const {title, brand, imageUrl, rating, price, id} = productData

  return (
    <li className="list-none mb-12 w-[350px] flex-shrink flex-grow-0 mr-5 md:w-[320px]">
      <Link to={`/products/${id}`} className="flex flex-col no-underline">
        <img src={imageUrl} alt="product" className="w-full max-h-[350px] rounded-[6px]" />
        <h1 className="text-[#171f46] font-medium font-roboto mt-6 mb-2">{title}</h1>
        <p className="text-[#594d6d] font-roboto text-[18px] mb-6">by {brand}</p>
        <div className="flex items-center justify-between">
          <p className="text-[#171f46] font-roboto font-semibold text-[18px] m-0">Rs {price}/-</p>
          <div className="flex items-center bg-[#3b82f6] rounded-[4px] px-2 py-1">
            <p className="text-[#ffff] font-roboto font-medium mr-1 my-0">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="w-[16px] h-[16px]"
            />
          </div>
        </div>
      </Link>
    </li>

    )
}
export default ProductCard;