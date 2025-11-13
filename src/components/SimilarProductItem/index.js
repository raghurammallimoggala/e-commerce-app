function SimilarProductItem(props){
    const {productDetails} = props
  const {title, brand, imageUrl, rating, price} = productDetails

  return (
    <li className="flex flex-col rounded-2xl transition w-[250px]">
      <img
        src={imageUrl}
        className="w-48 h-40 mb-4 rounded"
        alt={`similar product ${title}`}
      />
      <p className="text-lg font-semibold font-roboto text-gray-800 ">{title}</p>
      <p className="text-sm text-gray-800 font-roboto text-[15px]">by {brand}</p>
      <div className="flex flex-row justify-between items-center w-[200px] mt-4">
      <p className="text-[16px] font-bold text-[#171f46] mt-2">Rs {price}/-</p>
      <div className="flex flex-row bg-[#0b69ff] items-center gap-1 mt-2 w-12 h-6 justify-center rounded mr-3">
        <p className="text-sm text-[#ffffff]">{rating}</p>
        <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="text-white-600 w-4 h-4"
          />
      </div>
      </div>
    </li>
  )
}
export default SimilarProductItem;