const taskModel = require('../Models/Task')

const getAllTasks = async (request, response) => {
    // taskModel.find({completed:'false'},function(err, task){
    //     if(err) return response.status(500).json(err);
    //     response.json(task);
    // })
    try {
        // const tasks = await taskModel.find({completed:'true'})
        const tasks = await taskModel.find()
        response.status(200).json({allTasks:tasks});
    }catch(err) {
        response.status(501).json({msg:err});
      }
}

const postTask = (request, response) => {
    // importing name and completed from the postman
    // response.json(request.body);
    // console.log(request.body.name)
    const entry = new taskModel({
        name:request.body.name,
        completed:request.body.completed
    });
    entry.save(function(err){
        if(err) {
            return response.status(500).json(err);
        }
        else {
            response.status(201).json(entry);
        }
    })

    
    
}

const getSingleTask = async (request, response) => {
    // response.send(request.params)
    // response.json({id:"I am the  getSingleTask Route"})
    try {
        // const taskInfo = await taskModel.findOne({_id:request.params});
        // const {id:taskId} = request.params;
        const taskId = request.params;
        // taskId gives {id:"12323de"}
        const task = await taskModel.findOne({_id:taskId.id});
        if(!task) {
            return response.status(404).json({msg:`Server could not find task with ${taskId.id}`})
        }
        return response.status(200).json(task);
    } catch(err){
        console.log(typeof(request.params));
        response.status(500).json(err);
    }
}

const updateTask = async (request, response) => {
    // response.send("Update a task")
    try {
        // filter
        const filter  = {_id:request.params.id}
        // console.log(taskObject.id);
        const task = await taskModel.findOneAndUpdate(filter,
            request.body,
            {
                new:true,
                runValidators:true
            }
            )
        response.status(200).json({data:task});

        if(!task) {
            return response.status(404).json({msg:`Server could not find task with ${taskId.id}`})
        }

    }catch(error){
        response.status(500).json(error);
    }
}

const deleteTask = async (request, response) => {
    try {
        // extracting the id from the url
        const taskIdObject = request.params;
        // it returns the object
        const task = await taskModel.findOneAndDelete({_id:taskIdObject.id});
        if(!task) {
            return response.status(404).json({msg:`Could not delete task with id ${taskIdObject.id}`});
        }
        response.status(200).json({msg:`Successfully deleted ${task}`});
    }catch(error) {
        response.status(500).json(error);
    }
}
module.exports = {getAllTasks, postTask,  getSingleTask, updateTask, deleteTask}

