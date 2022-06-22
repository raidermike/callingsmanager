const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/speakers', require('./speakers'));

module.exports = router;