

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var plan=new Schema({
    name:'string',
    template:'string',
    status:'string',
    eid:'string',
    time:'string',
    result:'string'
});

module.exports = mongoose.model('plan',plan);