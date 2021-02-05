const express = require('express');
const bodyParser = require('body-parser');
const { getResultByUserId, getWhoHaveTask } = require('./archive/controller.js');

const app = express();
const db = require('./models');

db.sequelize.sync({force: false}).then(() =>{
console.log("success db init");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




module.exports = app;