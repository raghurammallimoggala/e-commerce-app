import {useState,useEffect} from "react";
import {BsFilterRight} from 'react-icons/bs';
function ProductHeaders( {sortbyOptions=[], onChangeSortby, activeOptionId} ) {
    const [selectedOption, setSelectedOption] = useState(sortbyOptions.length > 0 ? sortbyOptions[0].optionId : "");

  
  useEffect(()=>{
     setSelectedOption(activeOptionId);
  }, [activeOptionId]);

  const handleSortChange = event => {
    const selected=event.target.value;
    setSelectedOption(selected);
    onChangeSortby(selected);
  }

  return (
    <div className="flex flex-wrap justify-between items-center mb-8 md:mt-[32px] md:mr-[50px]">
      <h1 className="text-[#475569] font-roboto font-medium text-[20px] md:text-[32px]">All Products</h1>
      <div className="flex items-center">
        <BsFilterRight className="text-[#475569] text-[24px] mr-[6px]" />
        <p className="text-[#475569] font-roboto text-[16px]">Sort by</p>
        <select
          className="text-[#475569] font-roboto text-[16px] bg-white p-3 rounded-none ml-3 outline-none cursor-pointer"
          value={selectedOption}
          onChange={handleSortChange}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="text-[#7e858e] font-roboto text-[16px]"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default ProductHeaders;