import React from "react";
import Layout from "../Component/Layout/Layout";
import { useAuth } from "../context/Auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Component/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (res.data.success) setCategory(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };
  const getCount = async (req, res) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(res.data?.count);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductNextPage = async (req, res) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...res.data.product]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProductNextPage();
  }, [page]);
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(res.data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  useEffect(() => {
    getAllCategories();
    getCount();
  }, []);

  const handleFilter = (value, id) => {
    let arr = [...checked];
    if (value) arr.push(id);
    else {
      arr = arr.filter((c) => c !== id);
    }
    setChecked(arr);
  };
  const filterProduct = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      if (res.data.success) setProducts(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };
  const clearReset = () => {
    window.location.reload();
  };
  return (
    <Layout>
      <div className="container-fluid p-3 mt-3">
        <div className="row">
          <div className="col-md-3">
            <h4 className="mb-3">Filter by catgeory</h4>
            <div className="d-flex flex-column mb-5">
              {category.map((c) => (
                <Checkbox
                  className="mb-2"
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="mb-3">Filter by Prices</h4>
            <div className="d-flex flex-column ">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div>
                    <Radio className="mb-2" value={p.array} key={p._id}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="">
              <button onClick={clearReset} className="mt-3 btn btn-danger ">
                Reset filter
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="text-center">All products</h2>
            <div className="d-flex flex-wrap ms-1 align-items-center">
              {products.map((p) => (
                <div
                  className="card ms-3 shadow mb-5 bg-gray rounded"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    class="card-img-top"
                    alt="Product"
                    height={"300px"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="card-text">Rs {p.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/Product/${p.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={(e) => {
                        setCart([...cart, p ]);
                        localStorage.setItem('cart',JSON.stringify([...cart,p]));
                        toast.success("Item added to the cart");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-3 p-3 text-center">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "loading" : "Load more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
