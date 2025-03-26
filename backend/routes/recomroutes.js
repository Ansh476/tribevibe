const express = require('express');
const { recommendForUser } = require('../controllers/recomcontrol');

const router = express.Router();

router.get('/:userId', recommendForUser);

module.exports = router;
