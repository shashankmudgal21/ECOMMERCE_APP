import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productDeleteController,
  productFilterController,
  productListContoller,
  productUpdateController,
  relatedProductController,
  searchProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  productUpdateController
);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", getProductPhotoController);
router.delete("/product/:pid", productDeleteController);

router.post("/product-filter", productFilterController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListContoller);
router.get('/search/:keyword',searchProductController);
router.get('/related-product/:pid/:cid',relatedProductController);
router.get('/product-category/:slug',productCategoryController);
export default router;
