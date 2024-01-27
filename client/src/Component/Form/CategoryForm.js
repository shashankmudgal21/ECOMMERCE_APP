import React from "react";

const CategoryForm = ({submitHandler,value,setValue}) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a new category"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
