require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema }  = require('graphql-import');
const typeDefs = importSchema('./src/schema.graphql');
const mongoose = require('mongoose');
const { makeExecutableSchema} = require('graphql-tools');
const { AuthDirective} = require('./resolvers/directive');
const verifyToken = require('./utils/token');

mongoose.connect(process.env.MONGOURL, {useNewUrlParser:true}, (err)=>{
    if(!err){
        console.log('Mongo conectado correctamente');
    }
});

const { getPosts, getPost, getUsers } = require('./resolvers/Querys');
const { createPost, createUser, login, addPhoto} = require('./resolvers/Mutations');

const resolvers = {
    Query: { 
        getPosts,
        getPost,
        getUsers
    },
    Mutation:{
        createPost,
        createUser,
        login,
        addPhoto
    }
}


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives:{
        auth:AuthDirective
    }
})

const server = new GraphQLServer({ schema, context:async({request})=>verifyToken(request)});
server.start(() => console.log('Server is running on localhost:4000'));