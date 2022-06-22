import mongoose from 'mongoose';

const likedModel = mongoose.Schema({
    postId : {
        type : String,
        required : true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
    }
});

const liked = mongoose.model("likedModel", likedModel);

export default liked;