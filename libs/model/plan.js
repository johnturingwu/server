

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var plan=new Schema({
    name:{type:String,require:true},
    template:{type:String,require:true},
    status:{type:String,require:true},
    eid:{type:String,require:true},
    time:{type:Date},
});

module.exports = mongoose.model('plan',plan);