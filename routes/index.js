const express = require('express');
const nugu = require('../nugu');
const router = express.Router();

router.post(`/startAction`, nugu);

module.exports = router;
