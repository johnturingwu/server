
// writeFile
// var fs=require("fs");
// var strs="sfsfsfdgv4brethergrhterht";
// fs.writeFile('./john.tf',strs,{flag:'w',encoding:'utf-8',moede:'0666'},function(err){
//     if (!err){
//         console.log('success');
//     }else{
//         console.log('fail');
//     }
// });
var init = function(err,resource,eid){
    var
    spawn = require('child_process').spawn,
    exec = require('child_process').exec


//+ create folder name-res,eid
var folder = "res_eid";
var mkdir= exec("cd C:/Users/Dolphin/Desktop/ppt && mkdir "+folder);
var output1 = exec("cd C:/Users/Dolphin/Desktop/ppt/"+folder+" && terraform init")
var output = exec("cd C:/Users/Dolphin/Desktop/ppt && terraform init")

output.stdout.on('data', function (data) {
    //save db , send res qianduan
    console.log('stdout: ' + data);
});

output.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

output.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});
}

module.exports=init;

//  module.exports = exec.module('output',output);

