const db = require('../models');
const User = db.User;
const Task = db.Task;


const getAllTasks = async () => {
    const result = await Task.findAll();
    return result;
}

const getTaskById = async (taskId) => {
    const result = await Task.findOne({
        where: {id : taskId},
        include : User
    });
    return result;
}

// test

module.exports = { getAllTasks, getTaskById };