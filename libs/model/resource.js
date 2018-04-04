

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var histories=new Schema({
//     dttm:string,
//     content:string,
// });
var resource = new Schema({
    name:{type:String},
    createEid:{type:String},
    description:{type:String},
    templateNm:{type:String},
    // templateUrl:{type:String},
    // templateUrl2:{type:String},
    template:{type:String},
    types:{type:String},
    status:{type:String},
    keyNm:{type:String},
    Date:{type:Date},
    result:{type:String},
    account:[{type:Schema.Types.ObjectId,ref:'account'}],
    // histories:
    //     [
    //     {
    //         content:{type:String},
    //         Date:{type:Date},
    //         Status: {type:String},
    //         TemplateNm:{type:String},
    //         Template:{type:String},
    //         AccountNm:{type:String},
    //         Details:{type:String},
    //         User:{type:String}
    //     }
    //     ],
    // getResourceLists:
    //     [
    //       {
    //      Id:{type:String,},
    //      ResourceNm:{type:String,},
    //      LastDttm:{type:String},
    //      Status:{type:String},
    //       }
    //     ]
});

module.exports = mongoose.model('resource', resource);