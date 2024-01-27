import slugify from "slugify";
import Product from "../models/product.js";
import fs from "fs";
import Category from "../models/category.js";
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      // case photo && photo.size > 20000:
      //   return res
      //     .status(500)
      //     .send({ error: "less than 2 MB photo is allowed" });
    }

    const product = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).send({
      success: true,
      message: "Product created succesfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while creating product",
      error,
    });
  }
};
export const getProductController = async (req, res) => {
  try {
    const product = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "your product",
      product,
      total_count: product.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while showing all product",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "your product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erroe while listing your product",
      error,
    });
  }
};

export const getProductPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error while sowing the photo",
      error,
    });
  }
};

export const productDeleteController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error while deleting the product",
      error,
    });
  }
};

export const productUpdateController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      // case photo && photo.size > 20000:
      //   return res
      //     .status(500)
      //     .send({ error: "less than 2 MB photo is allowed" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).send({
      success: true,
      message: "Product created succesfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while creating product",
      error,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const product = await Product.find(args);
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};
export const productCountController = async (req, res) => {
  try {
    const count = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      count,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while counting the product",
      error,
    });
  }
};
export const productListContoller = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const product = await Product.find({})
      .select("-photo")
      .skip((page-1)*perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        product,
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while loading more products",
      error,
    });
  }
};
export const searchProductController = async(req,res)=>{
  try {
    const {keyword} = req.params;
    const result = await Product.find({
      $or:[
        {name:{$regex:keyword}},
        {description:{$regex:keyword}},
      ]
    }).select("-photo")
    res.json({
      result
    })
    } catch (error) {
    console.log(error);
  }
}

export const  relatedProductController = async(req,res)=>{
  try {
      const {cid,pid} = req.params
      const products = await Product.find({
        category:cid,
        _id:{$ne:pid},
      }).select("-photo").limit(3).populate('category')
      res.status(200).send({
        success:true,
        products
      })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message:'Error while giving related products',
      error,
    })
  }
}

export const productCategoryController = async(req,res)=>{
  try {
    const category  = await Category.findOne({slug:req.params.slug})
    const products = await Product.find({category}).populate("category");
    res.status(200.).send({
      success:true,
      message:"Your products",
      category,
      products,
    })
  } catch (error) {
    console.log(error)
  }
}