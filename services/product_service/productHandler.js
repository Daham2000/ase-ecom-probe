import mongoose from "mongoose";
import Joi from "joi";
import {addProductService, deleteProductService, getAllProductService, updateProductService} from "./productService.js";
import {uploadContent} from "../content_update_service/contentUploadService.js";
import ProductModel from "../../models/productModel.js";

// Get all products function
export const getProducts = async (req, res) => {
    const schema = Joi.object({
        query: Joi.string().allow(""),
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
    });

    const filterValidation = schema.validate(req.query);
    try {
        const postMessage = await getAllProductService(filterValidation.value);
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
        const links = await uploadContent(req.files);
        let product = new ProductModel(body.sku, body.name, body.description, links, body.qty);
        const resp = await addProductService(product);
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
            return res.status(404).send("No details for that Id.");
        const updatedPost = updateProductService(data.value, _id);
        res.status(201).send(updatedPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

// delete product function
export const deleteProduct = async (req, res) => {
    const productId = Joi.string().required();
    const validatedProductId = productId.validate(req.params).value.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(validatedProductId))
            return res.status(404).send("No post with that id");

        await deleteProductService(validatedProductId);
        res.json({massage: "Product deleted"});
    } catch (e) {
        res.status(409).json({message: e.message});
    }

};


