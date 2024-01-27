import React from 'react'
import Layout from '../Component/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-desc">Oops! page not found</h2>
        <Link to = '/'>Go back</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
