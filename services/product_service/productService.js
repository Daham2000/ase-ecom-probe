import ProductSchema from "../../schemas/productSchema.js";

//Add Product db integrating
export const addProductService = async (data) => {
    const productSchema = new ProductSchema(data);
    return await productSchema.save();
};

//Update Product db integrating
export const updateProductService = async (data) => {
    const productSchema = new ProductSchema(data);
    return await productSchema.save();
};