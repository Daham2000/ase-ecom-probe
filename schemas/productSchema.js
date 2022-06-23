import mongoose from "mongoose";
import DBUtil from "../utill/dbUtill.js";

const productSchema = mongoose.Schema({
    sku: String,
    name: String,
    description: String,
    qty: Number,
    images: [String],
});
const ProductSchema = mongoose.model(DBUtil.PRODUCT, productSchema);

export default ProductSchema;