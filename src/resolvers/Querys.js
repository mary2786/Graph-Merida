const Post = require('../models/Post');

const getPosts = async(root, args)=>{
    let posts = await Post.find();
    return posts;
 }

module.exports = {
    getPosts
}
