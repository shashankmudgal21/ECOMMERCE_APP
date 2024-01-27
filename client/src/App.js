
import { BrowserRouter, Route,  Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Private from "./Component/Route/Private";
import Dashboard from "./Pages/User/Dashboard";
import Forgot from "./Pages/Auth/Forgot";
import AdminRoute from "./Component/Route/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateProduct from "./Pages/Admin/CreateProduct";
import CreateCategory from "./Pages/Admin/CreateCategory";
import User from "./Pages/Admin/User";
import Profile from "./Pages/User/Profile";
import Order from "./Pages/User/Order";
import Product from "./Pages/Admin/Product";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Search" element={<Search />}></Route>
          <Route path="/Cart" element={<CartPage />}></Route>
          <Route path="/Product/:slug" element={<ProductDetails />}></Route>
          <Route path="/category/:slug" element={<CategoryProduct />}></Route>

          <Route path="/dashboard" element = {<Private/>}>
            <Route path="user" element = {<Dashboard/>}/>
            <Route path="user/profile" element = {<Profile/>}/>
            <Route path="user/orders" element = {<Order/>}/>
          </Route>
          <Route path="/dashboard" element = {<AdminRoute/>}>
            <Route path="admin" element = {<AdminDashboard/>}/>
            <Route path="admin/create-category" element = {<CreateCategory/>}/>
            <Route path="admin/products" element = {<Product/>}/>
            <Route path="admin/products/:slug" element = {<UpdateProduct/>}/>
            <Route path = 'admin/create-product' element = {<CreateProduct/>}/>
            <Route path = 'admin/user' element = {<User/>}/>
          </Route>
          <Route path="/register" element = {<Register/>}></Route>
          <Route path = '/forgot' element = {<Forgot/>}></Route>
          <Route path="/login" element = {<Login/>}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/policy" element={<Policy />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
