const express = require('express');
const { getAllUsers , getUserById } = require('../controllers/user.controller');

const router = express.Router();

router.get('/', async (req, res) => {
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

router.get('/:userId', async (req, res) => {
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

module.exports = router;