import mongoose from "mongoose";
import ProductSchema from "../schemas/productSchema.js";
import ContentUploadService from "./contentUploadService";
import {} from "../services/contentUploadService";

export const getProducts = async (req, res) => {
    try {
        const postMessage = await ProductSchema.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const addProduct = async (req, res) => {
    const schema = Joi.object().keys({
        categoryId: Joi.string(),
        subCategory: Joi.string(),
        superSubCategory: Joi.string(),
        youtubeLinks: Joi.array()
    })
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(401).send(validation.error);
        return;
    }
    try {
        const links = await ContentUploadService.uploadContent(req.files);
        const resp = await newPost.save();
        res.status(201).send(resp);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const updateProduct = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No datails for that Id.");

    const updatedPost = await ProductSchema.findByIdAndUpdate(
        _id,
        {...post, _id},
        {new: true}
    );

    res.json(updatedPost);
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id");

    await ProductSchema.findByIdAndRemove(id);

    res.json({massage: "Post deleted successfully"});
};


