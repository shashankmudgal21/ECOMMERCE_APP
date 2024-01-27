import React, { useState } from "react";
import { useEffect } from "react";
import Layout from "../Component/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [products, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProducts(data?.product);
      getRelatedProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products);
  return (
    <Layout>
      {
        <div className="row container mt-4 p-3">
          <div className="col-md-6 text-center ">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${products._id}`}
              className="card-img-top"
              alt="Product"
              height={"300px"}
              width={"350px"}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Product Details</h1>
            <h4 className="mt-3">Name : {products.name}</h4>
            <h4 className="mt-3">Description : {products.description}</h4>
            <h4 className="mt-3">Price : Rs{products.price}</h4>
            {/* <h4 className="mt-2">Category : {products.category.name}</h4> */}
            <button className="btn btn-primary ms-1 mt-3">Add to cart</button>
          </div>
          <div className="row mt-5">
            <h3 className="text-center">Related Products</h3>
            <div className="d-flex flex-wrap ms-1 align-items-center mt-3 mx-auto">
              {relatedProducts?.map((p) => (
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
                    <button className="btn btn-secondary ms-1">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </Layout>
  );
};

export default ProductDetails;
