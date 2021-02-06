const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
    <H1> Hello world !</H1>
    <p> This is API test page</p>
    `)
});


module.exports = router;