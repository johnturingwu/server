

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var histories=new Schema({
//     dttm:string,
//     content:string,
// });
var resource = new Schema({
    name:{type:String,require:true},
    createEid:{type:String,require:true},
    description:{type:String,require:true},
    templateNm:{type:String},
    templateUrl:{type:String},
    templateUrl2:{type:String},
    template:{type:String},
    types:{type:String},
    status:{type:String},
    keyNm:{type:String,ref:'account'},
    Date:{type:Date},
    account:[{type:Schema.Types.ObjectId,ref:'account'}],
    histories:
        [
        { 	dttm:{type:String},
            content:{type:String},
        }
        ],
    getResourceLists:
        [
          {
         Id:{type:String,},
         ResourceNm:{type:String,},
         LastDttm:{type:String},
         Status:{type:String},
          }
        ]
});

module.exports = mongoose.model('resource', resource);