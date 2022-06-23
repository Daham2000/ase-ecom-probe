import mongoose from "mongoose";
import DBUtil from "../utill/dbUtill.js";
import mongoosePaginate  from 'mongoose-paginate-v2';

const productSchema = mongoose.Schema({
    sku: String,
    name: String,
    description: String,
    qty: Number,
    images: [String],
});
productSchema.plugin(mongoosePaginate);
const ProductSchema = mongoose.model(DBUtil.PRODUCT, productSchema);

export default ProductSchema;