const express = require('express');
const scrapeWithAsync = require('../scrapeWithAsyn');

const router = express.Router();

router.get('/', (req, res) => {
    res.end('csv file is generating with urls recursively');
    scrapeWithAsync();
});

module.exports = router;
