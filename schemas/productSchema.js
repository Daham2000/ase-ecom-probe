import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    sku: String,
    name: String,
    description: String,
    qty: Number,
    images: [String],
});

const ProductSchema = mongoose.model('Products', productSchema);

export default ProductSchema;