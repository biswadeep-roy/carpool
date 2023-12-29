
const express = require('express');
const router = express.Router();
const carpoolController = require('../controllers/carpoolController');  


router.post('/', carpoolController.createCarpool);

module.exports = router;
