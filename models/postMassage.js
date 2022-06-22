import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    director: String,
    title: String,
    description: String,
    boxOffice: String,
    trailerLink: String,
    downloadLink: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PastMessage = mongoose.model('PostMessage', postSchema);

export default PastMessage;