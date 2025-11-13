import PrimeDealsSection from "../PrimeDealsSection";
import AllProducts from "../AllProducts";
import Header from "../Header";
function Products() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center m-5">
        <PrimeDealsSection/>
        <AllProducts/>
      </div>
    </>
  );
}
export default Products;