const express = require('express');
const bodyParser = require('body-parser');
const { getResultByUserId, getWhoHaveTask } = require('./controller.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//for example root path

app.get('/' , (req, res) => {
    res.send(`
    <h1> Hello this is test index </h1>
    <p> Welcome</p>
    `);
});

app.get('/user/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            success : false,
            message : "You should put path params"
        });
    } else {
        const result = await getResultByUserId(req.params.id);
        res.json({
            success: true,
            message : result
        });
    }
})

app.get('/task/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            success: false,
            message: "You should put path params"
        });
    } else {
            const result = await getWhoHaveTask(req.params.id);
            res.json({
                success: true,
                message : result
            });
    }
})


module.exports = app;