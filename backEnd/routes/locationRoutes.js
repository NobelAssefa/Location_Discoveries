const express = require('express')
const {addLocation, getNearbyLocations} = require('../controller/location.controller')  

const router = express.Router();

router.route('/').post(addLocation); 
router.route('/').get(getNearbyLocations);

module.exports = router;