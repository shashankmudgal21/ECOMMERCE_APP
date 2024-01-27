import React from "react";
import { useSearch } from "../context/search";
import Layout from "../Component/Layout/Layout";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValue] = useSearch();
  console.log(values)
  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-4">
          <h1>Search results</h1>
          <h4>
            {values?.results.result.length < 1
              ? "No result found"
              : `Found ${values?.results.result.length}`}
          </h4>
        </div>
        <div className=" d-flex m-3 flex-wrap ">
        {values?.results.result.map((p) => (
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
                    <button className="btn btn-primary">More details</button>
                    <button className="btn btn-secondary ms-1">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </Layout>
  );
};

export default Search;
