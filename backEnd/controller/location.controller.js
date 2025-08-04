const  Location  = require('../models/locationModel');


exports.addLocation = async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        location: newLocation
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
}


exports.getnearbyLocations = async (req, res) => {
  try {
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide longitude and latitude'
      });
    }

    const locations = await Location.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 5000 // 5 km
        }
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        locations
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Server Error'+ error.message
    });
  }
}
