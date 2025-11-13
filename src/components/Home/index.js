import {Link} from "react-router-dom"
import Header from "../Header"
function Home(){
    return(
      <div>
        <Header/>
        <div className="flex flex-col lg:flex-row items-center justify-between m-14">
      <div className="flex flex-col items-start lg:items-start px-4 lg:px-0 lg:mr-20">
        <h1 className="text-7xl text-bold font-roboto mb-10 ">Clothes That Get You Noticed</h1>
        <img
          className="block lg:hidden"
          alt="clothes that get you noticed"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
        />
        <p className="text-2xl text-[#616e7c] mb-10">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <Link to="/products" className="bg-[#0967d2] text-center text-white px-6 py-3 rounded-lg shadow-custom-3 hover:bg-[#0045b3] w-[30%]"> <button type="button" >
          Shop Now
        </button></Link>
      </div>
      <img
        className="w-max h-max hidden lg:block"
        alt="clothes that get you noticed"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
      />
    </div>
    </div>
    )
}
export default Home;