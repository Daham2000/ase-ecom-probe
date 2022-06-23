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

//Get all products
export const getAllProductService = async (data) => {
    if (data.query === "") {
        const items = ProductSchema.find();
        const skip = (data.page - 1) * (data.limit);
        return data.limit > 0 ? items.skip(skip).limit(data.limit) : items.skip(0);
    } else {
        const items = ProductSchema.find({"name": data.query});
        const skip = (data.page - 1) * (data.limit);
        return data.limit > 0 ? items.skip(skip).limit(data.limit) : items.skip(0);
    }

}