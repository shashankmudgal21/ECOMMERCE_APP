import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';
const Layout = ({children,title}) => {
  return (
    <div>
       <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Header />
      <Toaster/>
      <main style={{minHeight:'80vh'}}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title:'Ecommerce-app'
}
export default Layout;
