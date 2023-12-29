
const express = require('express');
const router = express.Router();
const findCarpoolersController = require('../controllers/findCarpoolersController');


router.post('/', findCarpoolersController.findCarpoolers);

module.exports = router;
