import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div classNameName="text-center">
      <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Create category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/user" className="list-group-item list-group-item-action">
          User
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
          Products
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
