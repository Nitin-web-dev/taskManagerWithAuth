const AuthModel = require("../model/AuthSchema.js"); // our schema file 
const bcrypt = require("bcrypt"); // a third party module to hashed the password and check also (hash,compare)

// function for signup controller this function is our logic on registration api call
// we use async await bcoz some of our logic need some time or make promise
const signUP = async (req, res) => {
  // we use try catch block to check any error which is exceptional
  try {
    // we destructure our identifier from req.body which contain a object with form data key and value
    let { username, email, password, confirmPassword } = req.body;

    // now we check if password and confirmpassword is same or not
    if (password !== confirmPassword) {
      // if not then send response with error: credential failed
      return res.status(400).json({
        error: true,
        status: false,
        message: "credential failed",
      });
    }

    // if match then continue
    // then we check if the user already exist in database or not by email which we use unique only
    // so all email will be unique;
    const userAlreadyExists = await AuthModel.findOne({ email: email });

    // if user not exits then continue
    if (!userAlreadyExists) {
      // hashed the password to encryption
      const hashedPassword = await bcrypt.hash(password, 10);

      // then store data in database and send response with message: new user created;
      const newUserCreate = await AuthModel.create({
        username,
        email,
        password:hashedPassword,
      });

      if (newUserCreate) {
        res.status(201).json({
          error: false,
          status: true,
          message: "new user created",
        });
      } else {
        res.status(200).json({
          error: true,
          status: false,
          message:'something went wrong try again after 15 sec'
        })
      }
    } else {
      // if exists then send response with error: user already exist
      return res.status(200).json({
        error: true,
        status: false,
        message: "user already exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      status: false,
      message: error.message,
    });
  }
};



// function for login controller this function is our logic on login api call
// we use async wait bcoz some of our logic need some time or make promise
const login = async (req,res) => {
  // we use try catch block to check any error which is exceptional
  try {
    // we destructure our identifier from req.body which contain a object with form data key and value
    let {  email, password } = req.body;
    
    // check if email exist in database or not
    let emailExistInDb = await AuthModel.findOne({email})
    if(emailExistInDb){
      
      res.status(200).json({
        error: false,
        status: true,
        message: 'user exist'
      })
    } else {
      res.status(301).json({
        error: true,
        status: false,
        message: 'user not exist'
      })
    }

  } catch (error) {
    res.status(500).json({
      error: true,
      status: false,
      message: error.message,
    });
  }
}



// export all controller
module.exports = { signUP ,login};
