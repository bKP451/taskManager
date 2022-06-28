const taskModel = require('../Models/Task')
const  asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (request, response) => {
    
        const tasks = await taskModel.find({})
        response
        .status(200)
        .json({status:"success", data:{tasks, nbHits:tasks.length}});
        // console.log(typeof(tasks), tasks.length);
    }
)

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

const getSingleTask = asyncWrapper( async (request, response) => {
    // response.send(request.params)
    // response.json({id:"I am the  getSingleTask Route"})
        // const taskInfo = await taskModel.findOne({_id:request.params});
        // const {id:taskId} = request.params;
        const taskId = request.params;
        // taskId gives {id:"12323de"}
        const task = await taskModel.findOne({_id:taskId.id});
        if(!task) {
            return response.status(404).json({msg:`Server could not find task with ${taskId.id}`})
        }
        return response.status(200).json({task});
    
}
)

const updateTask = asyncWrapper(async (request, response) => {
    // response.send("Update a task")
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
        response.status(200).json({task});

        if(!task) {
            return response.status(404).json({msg:`Server could not find task with ${taskId.id}`})
        }
}
)


const deleteTask = asyncWrapper(async (request, response) => {

        // extracting the id from the url
        const taskIdObject = request.params;
        // it returns the object
        const task = await taskModel.findOneAndDelete({_id:taskIdObject.id});
        if(!task) {
            return response.status(404).json({msg:`Could not delete task with id ${taskIdObject.id}`});
        }
        response.status(200).json({msg:`Successfully deleted ${task}`});
}
)


module.exports = {getAllTasks, postTask,  getSingleTask, updateTask, deleteTask}

