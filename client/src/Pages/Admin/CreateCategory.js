import React from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import CategoryForm from "../../Component/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState({});
  const [updatedName, setUpdatedName] = useState("");
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (res.data.success) {
        toast.success("Category upated successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const handleDelete = async (id,del_name) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );
      if (res.data.success) {
        toast.success(`${del_name} deleted successfully`);
        getAllCategories();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (res.data.success) {
        toast.success(`${name} is created`);
        getAllCategories();
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
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
  return (
    <div>
      <Layout>
        <div className="container-fluid p-3 mt-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h3 className="">Manage Category</h3>
              <div className=" w-50 p-3">
                <CategoryForm
                  value={name}
                  submitHandler={handleSubmit}
                  setValue={setName}
                />
              </div>

              <div className="text-center w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((cat) => (
                      <>
                        <tr>
                          <th key={cat._id} scope="row">
                            {cat.name}
                          </th>
                          <td>
                            <button
                              className="btn btn-primary w-10 ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(cat.name);
                                setSelected(cat);
                              }}
                            >
                              Edit
                            </button>
                            <button onClick={()=>handleDelete(cat._id,cat.name)} className="btn btn-danger w-10 ms-2">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              visible={visible}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                submitHandler={handleUpdate}
              ></CategoryForm>
            </Modal>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateCategory;
