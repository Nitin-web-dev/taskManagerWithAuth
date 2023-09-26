require('dotenv').config(); // to use env variable in app
const express = require('express') // express framework
const app = express() // initalize app express
const AuthRoutes = require('./routes/AuthRoutes.js')
const UserRoutes = require('./routes/UserRoutes.js')
const connectDB = require('./config/connection.js')

// define port for listen app
const port = process.env.PORT || 8080
app.set('port',port) // set the port to use in app 

//middleware to use
app.use(express.json()) // parse the json data to object to use in app
app.use(express.urlencoded({extended: true})) // to use url data and body data


// define routes
// auth routes
app.use('/api/v1/auth', AuthRoutes) // Authroutes is our route in routes folder 

// task routes
app.use('/api/v1/user', UserRoutes) // Userroutes is our route in routes folder



async function startApp () {
    try {
        let connection = await connectDB(process.env.MONGO_URL);
            if(connection === true ){

                app.listen(port,() =>  console.log(`server is running`))
                console.log('dabase connection = '+ connection)
            }else{
                console.log(connection)
            }
      
    
    } catch (error) {
        console.log('server cant start ')
        res.status(500).json({
            error: true,
            status: false,
            message: 'server failed to start'
        })
    }
}

startApp();