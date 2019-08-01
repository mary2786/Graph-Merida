require('dotenv').config();
const cloudinary = require('cloudinary');

const storage = ({stream}) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_APIKEY,
        api_secret: process.env.CLOUD_APISECRET 
    });

    return new Promise ((resolve, reject) =>{
        const buffer = cloudinary.v2.uploader.upload_stream((err, res) => {
            if(err){
                reject(err);
            }

            resolve(res)
        })
        stream.pipe(buffer)
    })
}

module.exports = storage;