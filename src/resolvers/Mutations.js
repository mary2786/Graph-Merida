const Post = require('../models/Post');
const User = require('../models/User');
const authenticated = require('../utils/authenticated');
const storage = require("../utils/storage");

const createPost = async (root, args)=>{ // async es para que espere a que se ejecute el await
    /*let newPost = new Post({
        title:args.data.title,
        body:args.data.body,
        createdAt:args.data.createdAt
    });*/

    let newPost = new Post({
        title:args.data.title,
        body:args.data.body,
        createdAt:args.data.createdAt,
        comments:args.data.comments,
        user:args.data.user
    });

    const miPost = await newPost.save(); // Para poder usar el await la función tiene que ser async
    const post = await Post.findOne({_id:miPost._id}).populate('user');
    return post;
}


const createUser = async (root, args)=>{ 

    let newUser = new User({
        ...args.data
    });

    const user = await newUser.save();
    return user;
}

const login = async(root, args)=>{
    const token = await authenticated(args)
            .catch((err)=>new Error(err));
    return {
        token,
        message:'OK'
    }
}

const addPhoto = async(root, args)=>{

    if(args.photo){
        const { createReadStream } = await args.photo;
        const stream = createReadStream();
        const photo = await storage({stream});

        await User.findByIdAndUpdate(args.id, {$set:{image:photo.url}})

        return photo.url;
    }
}


module.exports = {
    createPost,
    createUser,
    login,
    addPhoto
};