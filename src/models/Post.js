const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    },
    comments:{
        type:[String],
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
});

const Posts = mongoose.model('post', postSchema); // singular y minusculas por buenas practicas

module.exports = Posts;