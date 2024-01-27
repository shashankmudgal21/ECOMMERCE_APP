import slugify from "slugify";
import Category from "../models/category.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "Category is added",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in adding category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const {name} = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
        success:true,
        message:"category updated",
        category,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error while updating category",
        category,
    })
  }
};
export const getCategoryController = async(req,res)=>{
    try {
        const category = await Category.find({});
        res.status(200).send({
            success:true,
            message:"your all category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting all category",
            error
        })
    }
}
export const singleCategoryController = async(req,res)=>{
    try {
        const category = await Category.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"your all category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting all category",
            error
        })
    }
}
export const deleteCategoryController = async(req,res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success:true,
            message:"Deleted catgeory"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            message:"error while deleting category",
            error
        })
    }
}
