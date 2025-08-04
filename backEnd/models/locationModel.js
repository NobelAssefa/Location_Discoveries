const mongoose  = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A location must have a name'],
    trim:true
  },

  description:{
    type: String,
    trim: true
  },

  category:{
    type:String,
    required: true,
    enum:['cafe', 'park', 'bookstore', 'hidden-gem', 'other'],

  },
  location:{
    type:{
        type: String,
        enum: ['Point'],
        default: 'Point',
      
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;