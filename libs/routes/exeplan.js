
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



router.get('/:template&:id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var template = req.params.template;
    var id = req.params.id;
    var status = "INPROGRESS";

    // put()
    // var status = req.params.status;s
    // resource.find({template},function(err,resource){
    // });
// folder=
fs.writeFile('C:/Users/Dolphin/Desktop/ppt/'+id+'/'+ template+'.tf',template,{flag:'w',encoding:'utf-8',moede:'0666'},function(err){
    if (!err){
        console.log('success');
    }else{
        console.log('fail');
    }
});
var output = exec("cd C:/Users/Dolphin/Desktop/ppt/"+id+" && terraform init");
// var output1 = exec("cd C:/Users/Dolphin/Desktop/ppt && terraform apply");
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
});
module.exports = router;