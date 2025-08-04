const express = require('express')
const {addLocation, getnearbyLocations} = require('../controller/location.controller')  

const router = express.Router();

router.route('/').post(addLocation); 
router.route('/').get(getnearbyLocations);

module.exports = router;