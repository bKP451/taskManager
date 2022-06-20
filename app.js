const express = require('express');
const app = express();
const task_routes = require('./routes/tasks_routes')
const connectDatabase = require('./db/connect')
const port = 4500;

// middleware
app.use(express.static('./public'))
app.use(express.json());


const start = async () => {
    try{
        await connectDatabase();
        app.listen(port, ()=>{
            console.log(`I am running on port ${port}`);
        })
    } catch(error){
        console.log(error);
    }
}
// It loads the server
start();


// routes
app.get('/', (request, response)=> {
    
    response.send("hi");
})

app.use('/api/v1/tasks', task_routes);

console.log(connectDatabase);
console.log("I AM THE TASK MANAGER APP")

