import {BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart";
import './App.css';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path ="/login" element={<LoginForm/>} />
    <Route path ="/" element={<Home/>} />
    <Route path ="/products" element={<Products/>} />
    <Route path ="/products/:id" element={<ProductItemDetails/>} />
    <Route path ="/cart" element={<Cart/>} />
    <Route path ="*" element={<NotFound/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
