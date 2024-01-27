import React from "react";
import AdminMenu from "../../Component/Layout/AdminMenu";
import Layout from "../../Component/Layout/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const getAllproducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (res.data?.success) {
        setProducts(res.data.product);
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getAllproducts();
  }, []);

  console.log(products);
  return (
    <Layout>
      <div className="container-fluid p-3 mt-3">
        <div className="row ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center"> All products</h1>
            <div className=" d-flex m-3 flex-wrap ">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/products/${p.slug}`}
                  className="product-link"
                >
                  <div className="card ms-3 mb-2" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      class="card-img-top"
                      alt="Product"
                      height={'250px'}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
