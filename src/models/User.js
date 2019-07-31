const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: ''
    }/*,
    Post:{
        type: [Schema.Types.ObjectId],
        ref:'Post'
    }*/
});




userSchema.pre('save', function(next){ // Se ejecuta antes de guardar
    const user = this;
    console.log(user);
    const SALT_ROUNDS = 10;
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt){
        if(err) return next();

        bcrypt.hash(user.password, salt,function(err, hash){
            if(err) return next(err);

            user.password = hash;
            console.log(hash);
            next();
        });
    });
});

const User = mongoose.model('user', userSchema);

module.exports = User;