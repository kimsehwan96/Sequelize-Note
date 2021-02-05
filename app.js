const express = require('express');
const bodyParser = require('body-parser');
const { getResultByUserId, getWhoHaveTask } = require('./archive/controller.js');

const app = express();
const db = require('./models');

db.sequelize.sync({ force: true }).then(()=> {
    console.log("Drop and rsync");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




module.exports = app;