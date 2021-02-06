const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');

const indexRouter = require('./routes/index.route');
const usersRouter = require('./routes/users.route');
const tasksRouter = require('./routes/tasks.route');

db.sequelize.sync({force: false}).then(() =>{
console.log("success db init");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);




module.exports = app;