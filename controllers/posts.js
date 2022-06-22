import mongoose from "mongoose";
import PostMessage from "../models/postMassage.js";
import liked from "../models/likedModel.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No datails for that Id.");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ massage: "Post deleted successfully" });
};

export const ifAlreadyLiked = async (req, res) => {
  const { id } = req.params;
  const { email } = req.params;

  const newLike = new liked();
  newLike.postId = id;
  newLike.email = email;
  try {
    const r = await newLike.findOne(newLike);
    console.log(r);
    res.json({
      isExits: false,
    });
  } catch (error) {
    res.json({
      isExits: true,
    });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { email } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    const post = await PostMessage.findById(id);
    await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json({
      'ifUpdated': true
    });
  } catch (error) {
    res.json(error);
  }
};

export const unlikePost = async (req, res) => {
  const { id } = req.params;
  await liked.findByIdAndRemove(id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount - 1 },
    { new: true }
  );
  res.json(updatedPost);
};

export const findMovies = async (req, res) => {

  try {
    const posts =await PostMessage.find( { tags: "Movie" } );
    res.status(200).json(posts);
  } catch (error) {
    res.json(error);
  }

};

export const findTvSeries = async (req, res) => {

  try {
    const posts = await PostMessage.find( { tags: "Tvseries" } );
    res.status(200).json(posts);
  } catch (error) {
    res.json(error);
  }

};

export const findHollyhoodNews = async (req, res) => {

  try {
    const posts = await PostMessage.find( { tags: "Hollyhood" } );
    res.status(200).json(posts);
  } catch (error) {
    res.json(error);
  }

};
