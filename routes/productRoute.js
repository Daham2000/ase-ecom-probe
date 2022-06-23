import express from "express";
import multer from "multer";
import {getProducts, addProduct, updateProduct, deleteProduct} from "../services/productHandler.js";

const router = express.Router();
const uploader = multer({dest: 'uploads/'})

router.get('/', getProducts);
router.route("/").post(uploader.array("images", 3), addProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;