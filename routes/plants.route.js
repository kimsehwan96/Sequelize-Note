const express = require('express');
const { getAllPlants , getPlantById } = require('../controllers/plant.controller');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await getAllPlants();
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

router.get('/:plantId', async (req, res) => {
    try {
        const result = await getPlantById(req.params.plantId);
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