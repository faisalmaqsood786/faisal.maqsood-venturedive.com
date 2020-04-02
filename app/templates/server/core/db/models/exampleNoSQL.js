const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExampleSchema = new Schema({
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model('example', ExampleSchema);
