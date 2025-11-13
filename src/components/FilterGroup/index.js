import {BsSearch} from "react-icons/bs";
import{useSelector, useDispatch} from "react-redux"; 
import {setSearchInput,setCategory,setRating,clearFilters} from "../../redux/filterSlice";

function FilterGroup({ratingsList=[],categoryOptions=[],enterSearchInput}){
    const dispatch=useDispatch();
    const {searchInput,activeRatingId,activeCategoryId}=useSelector(state=>state.filters);
    const onChangeSearchInput=(e)=>{
        dispatch(setSearchInput(e.target.value))
    }
    const onEnterSeachInput=(e)=>{
        if(e.key === "Enter") enterSearchInput()
    }
const onClickCategory=(id)=>dispatch(setCategory(id))
const onClickRating=(id)=>dispatch(setRating(id))
const onClearFilters=()=>dispatch(clearFilters())

const renderRatingFilters=()=>{
    return(
          <>
            <h1 className="text-[#12022f] font-roboto text-lg font-bold mt-8 mb-[18px]">Rating</h1>
            <ul className="flex flex-col mb-3 cursor-pointer">
                {ratingsList.map(rat=>(
                    <li key={rat.ratingId}
                    onClick={()=>onClickRating(rat.ratingId)}>
                        <img className="max-w-[152px] h-5 md:h-6" src={rat.imageUrl} alt={`rating ${rat.ratingId}`}/>
                        <p className={activeRatingId === rat.ratingId ? "text-[#0967d2]":""}>& up</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

    const renderProductCategories=()=>{
        return(
            <div className="flex flex-col mt-12 shrink-0 md:w-1/4 md:max-w-[280px] md:min-w-[240px]">
                <h1 className="text-[#12022f] font-roboto text-lg font-bold mt-6 md:mt-8">Category</h1>
                <ul className="list-none mt-4 cursor-pointer">
                    {categoryOptions.map(cat=>(
                        <li key={cat.categoryId} 
                        onClick={()=>onClickCategory(cat.categoryId)} 
                        className={activeCategoryId === cat.categoryId ? "font-roboto font-medium text-[#0967d2] text-sm mb-4 md:text-[16px]":" font-roboto font-medium text-[#475569] text-sm mb-4 md:text-[16px]"}>
                            {cat.name}
                        </li>
                    ))}
                </ul>
            </div>

        )
    }

    const renderSearchInput=()=>{
        return(
            <div className="flex items-center bg-[#f1f5f9] rounded-lg px-4 py-2">
                <input
                type="search"
                className="bg-[#f1f5f9] text-[#0f172a] font-roboto text-sm font-medium border-none outline-none flex-1"
                placeholder="Search"
                value={searchInput} 
                onChange={onChangeSearchInput}
                onKeyDown={onEnterSeachInput}/>
                <BsSearch className="text-slate-600 w-5 h-5" />
            </div>
        )

    }
    return(
        <div className="ml-[50px] mt-4 md:mt-12 md:w-1/4 md:max-w-[280px] md:min-w-[240px] md:shrink-0">
            {renderSearchInput()}
            {renderProductCategories()}
            {renderRatingFilters()}
            <button type="button" className="bg-[#0967d2] text-[#ffffff] font-roboto text-[10px] font-bold rounded-xl border border-[#0967d2] px-3 py-2 mt-4 outline-none cursor-pointer md:text-[14px]"
             onClick={onClearFilters}>Clear Filters</button>
        </div>
    )

}
export default FilterGroup;