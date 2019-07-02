const mongoose = require('mongoose');

const Respondent = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      cellPhone: {
        type: String,
        required: false
      },
      location: {
        type: String,
        required: false
      },
      dateRegistered: {
        type: Date,
        required: false,
        default: new Date()
      },
      panics: {
        type: Array,
        require: false
      }
});
module.exports = mongoose.model("Respondent", Respondent);
