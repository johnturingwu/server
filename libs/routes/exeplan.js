
var express = require("express");

var router = express.Router();

var path = process.cwd() + '/libs/';

var log = require(path+'log')(module);

var db = require(path+'/db/mongoose');

var plan = require(path+"/model/plan");
var account = require(path+"/model/account");
var resource = require(path+"/model/resource");
var fs = require("fs");
var spawn = require("child_process").spawn;
var exec = require("child_process").spawn;
var data = require('child_process').execSync;



router.post('/:template&:id&:status',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var template = req.params.template;
    var id = req.params.id;
    var status = req.params.status;

    if (status=="INPROGRESS"){
        return res.json({
            "Inprogress":"in progress"
        })
    }else{
       var status = "INPROGRESS";

       var plan = new plan({
           name:req.body.name,
           template:req.body.template,
           status:"INPROGRESS",
           eid:req.body.eid,
           time:new Date(),

       })
    // put()
fs.writeFile('C:/Users/Dolphin/Desktop/ppt/'+id+'/'+ template+'.tf',template,{flag:'w',encoding:'utf-8',moede:'0666'},function(err){
    if (!err){
        console.log('success');
    }else{
        console.log('fail');
    }
});
var output = exec("cd C:/Users/Dolphin/Desktop/ppt/"+id+" && terraform init");
// var output1 = exec("cd C:/Users/Dolphin/Desktop/ppt && terraform apply");
var data=execSync("cd C:/Users/Dolphin/Desktop/ppt/"+id+" && terraform init").toString();
if (data.indexOf("Terraform initialized")>0){    //apply complete
     console.log("good success")
}

// var stra
output.stdout.on('data', function (data) {
    //save db , send res qianduan
    console.log('stdout: ' + data);

});
output.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

output.on('exit', function (code) {
    // if (code==1){
    //     output.stderr.on('data', function (data) {
    //         console.log('stderr: ' + data);
    //     });
    //  }
    //  if (code==0){
    //     output.stderr.on('data', function (data) {
    //         console.log('stderr: ' + data);
    //         log.info(data);
    //     });}
    console.log('child process exited with code ' + code);
});
    }
});
module.exports = router;