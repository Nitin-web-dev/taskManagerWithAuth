const mongoose = require('mongoose')

const connectDB  = (url) => {
    return mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => true).catch(err => err.message)
}

module.exports = connectDB;