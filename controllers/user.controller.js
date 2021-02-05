const db = require('../models');
const User = db.User;
const Task = db.Task;

const getAllUsers = async () => {
    const result = await User.findAll();
    return result;
}

const getUserById = async (userId) => {
    const result = await User.findOne({
        where: { id : userId },
        include : Task
    });
    return result;
}

module.exports = { getAllUsers , getUserById };