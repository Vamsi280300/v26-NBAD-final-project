const mongoose = require('mongoose');
const ChartSchema = new mongoose.Schema({
  name:    { type: String, unique: true },
  labels:  [String],
  datasets: mongoose.Schema.Types.Mixed   // flexible; can hold objects or arrays
});
module.exports = mongoose.model('Chart', ChartSchema);