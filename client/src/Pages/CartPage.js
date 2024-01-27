import React from "react";
import Layout from "../Component/Layout/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  console.log(auth.user);
  const removeItem = (pid)=>{
    try {
          let p  = cart.filter((p)=>{
            return pid!==p._id
        })
        setCart(p)
        localStorage.setItem('cart',JSON.stringify(p));
    } catch (error) {
        console.log(error)
    }
  }
  const totalItem = ()=>{
    try {
      let total = 0;
      cart?.map((p)=>{
         total+=p.price
      })
      return total
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-3">Hello {auth?.user?.name}</h1>
            <h4 className="text-center p-2">
              {cart?.length > 0
                ? `Your cart have ${cart.length} items ${
                    auth?.token ? "" : "please login to continue"
                  }`
                : `No items in the cart`}
            </h4>
          </div>
        </div>
      </div>
      <div className="container row">
        <div className="col-md-8 ">
          {cart.map((p) => (
            <div className="row m-2 card flex-row">
              <div className="col-md-4">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top card"
                  alt="Product"
                  height={"100px"}
                  width="100px"
                />
              </div>
              <div className=" col-md-8">
                <p className="p-3 ">{p.name}</p>
                <p className=" p-3">{p.description}</p>
                <p className=" p-3">{p.price}</p>
                <button className="btn btn-danger" onClick={()=>removeItem(p._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4 text-center">
            <h3>Cart summary</h3>
            <p>Total | Payment | chekout</p>
            <hr />
            <h4>Total : Rs {totalItem()}</h4>
            {auth?.user?.address ? (
              <>
              <div className="mb-3">
                <h4>Current Address : {auth.user.address} </h4>
                <button className="btn btn-warning " onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
              </div>
              </>
            ):(
              <>
              {auth?.token ? (
                 <button className="btn btn-warning " onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
              ):(
                <>
                <div>
                  <button className="btn btn-warning" onClick={()=>navigate('/login')}>Login to checkout</button>
                </div>
                </>
              )}
              </>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
