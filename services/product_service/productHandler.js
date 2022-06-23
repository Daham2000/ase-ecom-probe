import mongoose from "mongoose";
import ProductSchema from "../../schemas/productSchema.js";
import Joi from "joi";
import {addProductService} from "./productService.js";

// Get all products function
export const getProducts = async (req, res) => {
    try {
        const postMessage = await ProductSchema.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Add new product function
export const addProduct = async (req, res) => {
    const schema = Joi.object().keys({
        sku: Joi.string(),
        name: Joi.string(),
        description: Joi.string(),
        qty: Joi.number()
    })
    const validation = schema.validate(req.body);
    const body = validation.value;
    if (validation.error) {
        res.status(401).send(validation.error);
        return;
    }
    try {
        // const imageLinks = await new ContentUploadService().uploadContent(req.files);
        // console.log(imageLinks)

        // const productSchema = new ProductSchema(body);
        // const resp = await productSchema.save();
        const resp = await addProductService(body);
        res.status(201).send(resp);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

//update product function
export const updateProduct = async (req, res) => {
    const schema = Joi.object({
        sku: Joi.string(),
        name: Joi.string(),
        description: Joi.string(),
        qty: Joi.number()
    });
    const {id: _id} = req.params;
    const data = schema.validate(req.body);
    if (data.error) {
        res.status(401).send(data.error);
        return;
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No datails for that Id.");
        const productSchema = new ProductSchema(data.value);
        const updatedPost = productSchema.update(_id,
            data.value,);
        res.status(201).send(updatedPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

// delete product function
export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id");

    await ProductSchema.findByIdAndRemove(id);

    res.json({massage: "Post deleted successfully"});
};


