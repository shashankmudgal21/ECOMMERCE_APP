import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
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
  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      if (res.data.success) {
        setName(res.data.product.name);
        setDescription(res.data.product.description);
        setId(res.data.product._id);
        setPrice(res.data.product.price);
        setCategory(res.data.product.category._id);
        setQuantity(res.data.product.quantity);
        setShipping(res.data.product.shipping);
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllProduct();
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

      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        getProduct
      );
      if (res.data?.success) {
        toast.success("Product updated succesfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  const handleDelete = async(e)=>{
    e.preventDefault();
    try {
      let answer = window.prompt("Are you sure you want to delete this product");
      if(!answer)return;
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/product/${id}`)
      if(res.data.success){
        navigate('/dashboard/admin/products')
        toast.success('Product deleted succesfully')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  return (
    <Layout>
      <div className="container-fluid p-3 mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-75">
            <h3>Update Product</h3>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                className="form-select mb-3"
                showSearch
                onChange={(value) => setCategory(value)}
                value={category}
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Upload photo"
                      height={"200px"}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
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
                  value={shipping ? "yes" : "no"}
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
                Update product
              </button>
              <button
                type="Submit"
                className="btn btn-danger m-3"
                onClick = {handleDelete}
              >
                Delete product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
