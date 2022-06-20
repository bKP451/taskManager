const mongoose = require('mongoose');
require('dotenv').config()
const connectionString = process.env.CONNECTION_STRING;


const dataBaseConnection = ()=>{
return mongoose
   .connect(connectionString, 
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
}

module.exports = dataBaseConnection