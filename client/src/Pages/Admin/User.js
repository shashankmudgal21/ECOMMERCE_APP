import React from 'react'
import Layout from '../../Component/Layout/Layout'
import AdminMenu from '../../Component/Layout/AdminMenu'

const User = () => {
  return (
    <Layout>
       <div className="container-fluid p-3 m-3">
      <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
              <h3>All user</h3>
        </div>
      </div>
     </div>
    </Layout>
  )
}

export default User
