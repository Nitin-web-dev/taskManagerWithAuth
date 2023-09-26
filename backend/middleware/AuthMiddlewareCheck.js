const jwt = require('jsonwebtoken')


// middlware to check if user login or not by token and protect the user home routes
const AuthMiddlwareCheck = (req,res,next) => {
    const token = req.header('Authorization')
    if(!token) return res.status(401).json({error: true, status:false,message:'Authorization failed'})

    jwt.verify(token, process.env.JWT_SECURE_KEY, (err,user) => {
        if(err) return res.status(403).json({error: true,status:false,message: 'invalid token'})
     
        req.user = user;
        next ();
    })
}


module.exports = AuthMiddlwareCheck;