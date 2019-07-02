const mongoose = require('mongoose');

const Panic = new mongoose.Schema({
    
    streetAddress: {
        type: String,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      latitude: {
        type: Number,
        required: true
      },
      timeLogged: {
        type: Date,
        required: true,
        default: new Date()
      },
      active: {
        type: Boolean,
        required: true,
        default: true
      },
      confirmed: {
        type: Boolean,
        required: true,
        default: false
      },
      timeResolved: {
        type: Date,
        required: false
        },      
      client: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Client'
      },
      respondent: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Respondent'
      }
      
});
module.exports = mongoose.model("Panic", Panic);

