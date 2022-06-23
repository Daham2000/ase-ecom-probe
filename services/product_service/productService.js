import ProductSchema from "../../schemas/productSchema.js";

//Add Product db integrating
export const addProductService = async (data) => {
    const productSchema = new ProductSchema(data);
    return await productSchema.save();
};

//Update Product db integrating
export const updateProductService = async (data, _id) => {
    const productSchema = new ProductSchema(data);
    return productSchema.update(_id,
        data.value,);
};

//Delete Product db integrating
export const deleteProductService = async (_id) => {
    return ProductSchema.findByIdAndDelete(_id);
};