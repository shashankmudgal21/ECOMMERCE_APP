import React from "react";
import { useState } from "react";
import Layout from "../../Component/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import "../../styles/authStyles.css";
import { useAuth } from "../../context/Auth";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer,setAnswer] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
          {email, newPassword,answer }
        );
        if (res.data.success) {      
          toast.success(res.data.message);
          console.log(res.data);
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
            <h1>RESET PASSWORD</h1>
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
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your favorite sport"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="login_btn btn  btn-primary">
              RESET
            </button>
           
          </form>
        </div>

      </Layout>
    </div>
  )
}

export default Forgot
