const mongoose = require('mongoose');
const Client = new mongoose.Schema({
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
    dateRegistered: {
        type: Date,
        required: false,
        default: new Date()
      },
    panics: {
        type: Array,
        required: false
      }
});
module.exports = mongoose.model("Client", Client);
