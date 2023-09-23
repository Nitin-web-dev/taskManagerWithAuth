const mongoose = require('mongoose')


// create a schema for database
const AuthSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required:true
    }
},{timestamps: true})

// create a model from a schema
const AuthModel = mongoose.model('users',AuthSchema);

module.exports = AuthModel;