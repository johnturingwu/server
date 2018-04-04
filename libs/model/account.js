

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var account=new Schema({
    keyNm:{type:String,ref:'resource'},
    access_key:{type:String,require:true},
    secret_key:{type:String,require:true},
    types:{type:String,require:true},
    createEid:{type:String},
    region:{type:String},
    
});

module.exports = mongoose.model('account',account);