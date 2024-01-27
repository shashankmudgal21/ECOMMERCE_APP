import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const getProduct = new FormData();
      getProduct.append("name", name);
      getProduct.append("description", description);
      getProduct.append("price", price);
      getProduct.append("category", category);
      getProduct.append("quantity", quantity);
      getProduct.append("photo", photo);
      getProduct.append("shipping", shipping);

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        getProduct
      );
      if (res.data?.success) {
        toast.success("Product created succesfully");
        navigate('/dashboard/admin/products')
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid p-3 mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-75">
            <h3>Create Product</h3>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                className="form-select mb-3"
                showSearch
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option value={c._id} key={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Upload photo"
                      height={"200px"}
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the name "
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <textarea
                  name=""
                  placeholder="enter the description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name=""
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter the price "
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name=""
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter the Quantity "
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  size="large"
                  className="form-select mb-3"
                  placeholder="select shipping"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <button
                type="Submit"
                onClick={submitHandler}
                className="btn btn-primary"
              >
                Create product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
