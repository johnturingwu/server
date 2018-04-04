
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
var exec = require("child_process").exec;
var execSync = require('child_process').execSync;
var iconv = require('iconv-lite');

router.get('/:id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    // var resource = new resource({
    //     name:req.body.name,
    //     template:req.body.template,
    //     status:req.body.status,
    //     eid:req.body.eid,
    //     time:req.body.time,
    //     // result:data,
    // });
    var status=null;
    var template=null;
    resource.findById(req.params.id,function(err,resource){
        if(!err){
            // resource.find({template:1,status:1}).toArray(function(err,val){
            //     console.log(val);
            status=resource.status;
            template = resource.template;
            var templateNm=resource.templateNm;
            if (status=="INPROGRESS"){
                        return res.json({
                            Inprogress:"in progress,you can't change it"
                        })
                    }else{
                          status = "INPROGRESS";
                          console.log(status);
fs.writeFile('/usr/local/servers/'+req.params.id+'/'+ templateNm+'.tf',template,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
    if (!err){
        console.log('success');
    }else{
        console.log('fail');
    }
});
var data=execSync("cd /usr/local/servers/"+req.params.id+" && terraform apply").toString();  //toString()
// datas=iconv.encode(data, 'utf-8')
console.log("data=",data);
if (data.indexOf("Apply complete")>0){    //apply complete
     console.log("success1");
     var planq = new plan({
        name:resource.name,
        template:template,
        status:"Complete",
        // eid:req.body.eid,
        time:Date.now(),
        result:data,
    });
    planq.save(function(err){
            if(!err){
                log.info('the plan has been saved!');
                return res.json({
                    plan:planq,
                    data:data
                });
            }else{
                if(err.name==="ValidationError"){
                    res.statusCode=400;
                    log.info("ValidationError");
                    //  res.json({
                    //      error:'Validation Error!',
                    //  });
                }else{
                    res.statusCode=500;
                    log.error("Internal error"+res.status);
                    // return  res.json({
                    //     error:"The Server error!"
                    // });
                }
    
            }
        });




    //  return  res.json({
    //      data:"success",data
    //  });
}else{
    console.log('some exception');
    return  res.json({
        data:"some exception",data
    });
}






                    }

        }else{
            console.log(err);
        }

    });

    // console.log("resource=", status);
    // console.log("resource=", template);


// id='kdw'
// status='good';
// template='kas';
//     if (status=="INPROGRESS"){
//         return res.json({
//             Inprogress:"in progress,you can't change it"
//         })
//     }else{
//        var status = "INPROGRESS";

// fs.writeFile('C:/Users/Dolphin/Desktop/ppt/'+id+'/'+ template+'.tf',template,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
//     if (!err){
//         console.log('success');
//     }else{
//         console.log('fail');
//     }
// });
// var output = exec("cd C:/Users/Dolphin/Desktop/ppt/"+id+" && terraform apply");
// // var output1 = exec("cd C:/Users/Dolphin/Desktop/ppt && terraform apply");
// var data=execSync("cd C:/Users/Dolphin/Desktop/ppt/"+id+" && terraform apply").toString();  //toString()
// datas=iconv.encode(data, 'utf-8')
// console.log("data=",datas);
// if (data.indexOf("apply complete")>0){    //apply complete
//      console.log("good success");
// }else{
//     console.log('some exception');
// }
// output.stdout.on('data', function (data) {
//     //save db , send res qianduan
//     console.log('stdout: ' + data);
// });
// output.stderr.on('data', function (data) {
//     console.log('stderr: ' + data);
// });
// output.on('exit', function (code) {
//     console.log('child process exited with code ' + code);
// });
// var planq = new plan({
//     name:req.body.name,
//     template:req.params.template,
//     status:status,
//     eid:req.body.eid,
//     time:req.body.time,
//     result:data,
// });

// planq.save(function(err){
//     if(!err){
//         log.info('the plan has been saved!');
//         return res.json({
//             plan:planq,
//         });
//     }else{
//         if(err.name==="ValidationError"){
//             res.statusCode=400;
//              res.json({
//                  error:'Validation Error!',
//              });
//         }else{
//             res.statusCode=500;
//             log.error("Internal error"+res.status);
//             return  res.json({
//                 error:"The Server error!"
//             });
//         }

//     }
// });



    // }
});


module.exports = router;