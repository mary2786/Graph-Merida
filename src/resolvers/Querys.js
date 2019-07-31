const Post = require('../models/Post');
const User = require('../models/User');

const getPosts = async(root, args)=>{
    let posts = await Post.find();
    return posts;
 }

 const getPost = async(root, args)=>{
    const post = await Post.findById(args.id).populate('user');

    if(!post) throw new Error('No se encontró el post');
    return post.toObject();
 }

 const getUsers = async(root,args)=>{
     const users = await User.find().exec();
     return users;
 }

module.exports = {
    getPosts,
    getPost,
    getUsers
}
