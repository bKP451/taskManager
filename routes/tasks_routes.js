const express = require('express');
const router = express.Router();
const {getAllTasks, postTask, getSingleTask, updateTask, deleteTask}= require('../controllers/tasks')

router.route('/')
    .get(getAllTasks)
    .post(postTask)

router.route('/:id')
    .get(getSingleTask)
    .patch(updateTask)
    .delete(deleteTask)

module.exports = router;
