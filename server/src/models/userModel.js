const {default: mongoose} = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    photoUrl: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updateAt:{
        type: Date,
        default: Date.now()
    },
}) 

const UserModel = mongoose.model('users',UserSchema)
module.exports = UserModel