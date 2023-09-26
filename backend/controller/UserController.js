const AuthModel = require("../model/AuthSchema.js"); // our schema file 


// controller get all tasks
const getAllTasks = async (req,res) =>{
    try {
        // get the user id
        const uid = req.user._id;
        // get all the tasks from database by id and select tasks fields
        const allTaskList = await AuthModel.findById({_id:uid}).select('tasks');
        // check if get the data or not 
        if(allTaskList){
            // if get send to front
            res.status(200).json({error:false,status:true,data:allTaskList})
        } else {
            res.status(401).json({error:true,status:false,message: 'something went wrongs'})

        }

        
    } catch (error) {
          return  res.status(500).json({error:true,status:false,message:error.message})
    }
 
}


// add a task
const createNewTask = async (req,res) => {
    try {
        // get the id from req
        const uid = req.user._id;
        // get the data and update it 
        const userTasks = await AuthModel.updateOne({_id:uid},{$push:{tasks:req.body}});
        // console.log(userTasks) // check if data is insert or not
        if(userTasks){

            res.status(200).json({error:false,status:true,message: 'new task addead'})
        }else {
            res.status(401).json({error:true,status:false,message: 'something went wrongs'})
            
        }
    } catch (error) {
        res.status(500).json({error:true,status:false,message:error.message})
        
    }
}



// update a task


// delete a task



// delete all tasks




module.exports = {getAllTasks,createNewTask}