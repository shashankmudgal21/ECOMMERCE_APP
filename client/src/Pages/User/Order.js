import React from 'react'
import Layout from '../../Component/Layout/Layout'
import UserMenu from '../../Component/Layout/UserMenu'

const Order = () => {
  return (
    <Layout>
      <div className="container-fluid p-3 mt-3">
      <div className="row">
        <div className="col-md-3">
            <UserMenu/>
        </div>
        <div className="col-md-9">
              <h3>Orders</h3>
        </div>
      </div>
     </div>

      </Layout>
  )
}

export default Order
