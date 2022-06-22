import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    birthday: {
        type: Date
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    }
});


const User = mongoose.model('user', userSchema);

export default User;
