import React from "react";
import { useState } from "react";
import Layout from "../../Component/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate,useLocation } from "react-router-dom";
import "../../styles/authStyles.css";
import { useAuth } from "../../context/Auth";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/login`,
            {email, password }
          );
          if (res.data.success) {      
            toast.success(res.data.message);
            console.log(res.data);
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
            })
            localStorage.setItem("auth",JSON.stringify(res.data));
            navigate(location.state || '/');
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
          console.log(error);
        }
      };
  return (
    <div>
      <Layout>
        <div className="form-container">
          <form className="form-box" onSubmit={submitHandler}>
            <h1>LOGIN</h1>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" onClick={(e)=>{navigate('/forgot')}} className=" login_btn mb-2 btn  btn-primary">
              FORGOT PASSWORD
            </button>
            <button type="submit" className="login_btn btn  btn-primary">
              SUBMIT
            </button>
           
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
