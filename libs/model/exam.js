

var mongoose = require("mongoose");
var schema = new mongoose.Schema({ name: 'string', size: 'string'});
// var Tank = mongoose.model('Tank', schema);

module.exports = mongoose.model('Tank',schema);