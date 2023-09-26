const express = require('express');
const router = express.Router();
const AuthMiddlwareCheck = require('../middleware/AuthMiddlewareCheck');
const UserController = require('../controller/UserController.js')


//routes 
// we will use mounting
router.route('/task')
.get(AuthMiddlwareCheck, UserController.getAllTasks) // if get requrst come all tasks will send
.post(AuthMiddlwareCheck,UserController.createNewTask) // if post requist come newTaskCreated




module.exports = router