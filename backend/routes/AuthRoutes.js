const express = require('express')
const router = express.Router(); // init routing
const AuthController = require('../controller/AuthController.js') // controller file where our logic is written
const Validation = require("../helper/Validatoin_JOI.js")  // validation file


// sign up routes
// we gonna use mounting
router.route('/signup')
// post method first call validation file and then controller
.post(Validation.singup,AuthController.signUP); // check if post request come then check validation and then controller


//login routes
router.route('/login')
    // post method first call validation file and then controller
.post(Validation.login, AuthController.login) // check if post request come then check validation and then controller


// export router
module.exports = router