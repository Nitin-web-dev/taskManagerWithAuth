const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// task schema 
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
  }, { _id: true }); // Explicitly enable the _id field
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
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      }] ,
},{timestamps: true})

// hash the password before saving in database
AuthSchema.pre('save', async function(next){
    const User = this;
    if(!User.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(User.password, salt);
        User.password = hashedPassword;
    } catch (error) {
        next(error)
    }

})

// create a model from a schema
const AuthModel = mongoose.model('users',AuthSchema);

module.exports = AuthModel;