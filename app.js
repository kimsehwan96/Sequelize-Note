const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');

const { getAllUsers , getUserById } = require('./controllers/user.controller');
const {getAllTasks , getTaskById } = require('./controllers/task.controller');

db.sequelize.sync({force: false}).then(() =>{
console.log("success db init");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`
    <H1> Hello world !</H1>
    <p> This is API test page</p>
    `)
});

app.get('/users', async (req, res) => {
    try {
        const result = await getAllUsers();
        res.json({
            success: true,
            message : result
        })
    } catch (err) {
        res.json({
            success: false,
            message : err
        })
    }
})

app.get('/users/:userId', async (req, res) => {
    try {
        const result = await getUserById(req.params.userId);
        res.json({
            success: true,
            message : result
        })
    } catch (err) {
        res.json({
            success: false,
            message : err
        })
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const result = await getAllTasks();
        res.json({
            success: true,
            message : result
        })
    } catch (err) {
        res.json({
            success: false,
            message : err
        })
    }
})

app.get('/tasks/:taskId', async (req, res) => {
    try {
        const result = await getTaskById(req.params.taskId);
        res.json({
            success: true,
            message : result
        })
    } catch (err) {
        res.json({
            success: false,
            message : err
        })
    }
})


module.exports = app;