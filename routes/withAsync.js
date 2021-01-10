const express = require('express');
const scrapeWithAsync = require('../scrapeWithAsyn');

const router = express.Router();

router.get('/', (req, res) => {
    res.end('generating csv fle....');
    scrapeWithAsync();
});

module.exports = router;