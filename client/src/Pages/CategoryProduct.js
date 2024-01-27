import React, { useEffect, useState } from 'react'
import Layout from '../Component/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CategoryProduct = () => {
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState();
    const params = useParams();
    const navigate = useNavigate();
    const getProducts = async() =>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setCategory(data?.category);
            setProducts(data?.products);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(params?.slug)getProducts();
    },[params?.slug])
  return (
    <Layout>
      <div className="container mt-3">
        <h3 className='text-center'>Search Result</h3>
        <h4 className='text-center mt-2'>Category - {category?.name}</h4>
        <div className="d-flex flex-wrap ms-1 mt-4 align-items-center">
              {products?.map((p) => (
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
                    <button className="btn btn-primary" onClick={()=>navigate(`/Product/${p.slug}`)}>More details</button>
                    <button className="btn btn-secondary ms-1">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
