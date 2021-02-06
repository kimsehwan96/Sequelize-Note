const express = require('express');
const router = express.Router();
const {getAllTasks , getTaskById } = require('./controllers/task.controller');

router.get('/', async (req, res) => {
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

router.get('/:taskId', async (req, res) => {
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

module.exports = router;