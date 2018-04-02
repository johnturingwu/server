

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var history=new Schema({
            content:{type:String},
            Date:{type:Date},
            Status: {type:String},
            TemplateNm:{type:String},
            Template:{type:String},
            AccountNm:{type:String},
            Details:{type:String},
            User:{type:String},
            resource:[{type:Schema.Types.ObjectId,ref:'resource'}],
});

module.exports = mongoose.model('history',history);