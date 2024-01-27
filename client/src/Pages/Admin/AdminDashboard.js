import React from 'react'
import Layout from '../../Component/Layout/Layout'
import AdminMenu from '../../Component/Layout/AdminMenu'
import { useAuth } from '../../context/Auth'
const AdminDashboard = () => {
  const [auth,setAuth] = useAuth();

  return (
    <Layout>
     <div className="container-fluid p-3 m-3">
      <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
              <h3>Admin name : {auth?.user?.name}</h3>
              <h3>Admin email: {auth?.user?.email}</h3>
              <h3>Admin contact: {auth?.user?.phone}</h3>
        </div>
      </div>
     </div>
    </Layout>
  )
}

export default AdminDashboard
