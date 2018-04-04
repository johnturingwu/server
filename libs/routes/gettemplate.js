
var express = require("express");

var router = express.Router();

var path = process.cwd() + '/libs/';

var log = require(path+'log')(module);

var db = require(path+'/db/mongoose');

var tempmodel=require(path+'/model/resource');
var plan = require(path+"/model/plan");
var fs=require("fs");
const child_process = require("child_process");

var spawn = require("child_process").spawn;
var exec = require("child_process").exec;
var execSync = require('child_process').execSync;


// var cmd = require(path+'/utils/cmds');

//show all
router.get('/',function(req,res){
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
tempmodel.find(function(err,tempmodels){
       if(!err){
           return res.json(tempmodels);
       }else{
           res.statusCode=500;
           log.error('Tnternal error'+res.statusCode+":"+err.message);
           log.info('..................');
           return res.json({
               error:"Server error"
           });
       }
    });
});


//new one
router.post('/',function(req,res){
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    var tempmodel_new = new tempmodel({
         name:req.body.name,
         templateNm:req.body.templateNm,
         template:req.body.template,
         description:req.body.description,
         keyNm:req.body.keyNm,
         types:req.body.types,
         createEid:req.body.createEid,
         status:"new",
         account:req.body.account,
    });

    tempmodel_new.save(function(err){
        if(!err){
            log.info('New template create');
            return res.json({
                // status:"OK",
                tempmodel_new:tempmodel_new
            });
        }else{
            if(err.name==="ValidationError"){
                res.statusCode = 400;
                res.json({
                    error:'Validation Error!'
                });
            }else{
                res.statusCode = 500;
                log.error("Tnternal error "+res.statusCode+":"+err.message);
                log.error("....");
                res.json({
                    error:"Server Error!"
                });
            }
        }
    });
    // cmd.init();
    var
    spawn = require('child_process').spawn,
    exec = require('child_process').exec


//+ create folder name-res,eid
var folder = tempmodel_new.id;
var mkdir= exec("cd /usr/local/servers && mkdir "+folder);

fs.writeFile('/usr/local/servers/'+folder+'/'+ tempmodel_new.name+'.tf',tempmodel_new.template,{flag:'w',encoding:'utf-8',moede:'0666'},function(err){
    if (!err){
        console.log('success');
    }else{
        console.log('fail');
    }
});
var output = exec("cd /usr/local/servers/"+folder+" && terraform init");
// var output1 = exec("cd C:/Users/Dolphin/Desktop/ppt && terraform init");
log.info(folder);

let data = child_process.execSync("cd /usr/local/servers/"+folder+" && terraform init").toString();
// console.log("2",data);
// if (data.indexOf("apply complete")>0){    //apply complete
//     console.log("good success")
// }else{
//     console.log(data)
// }


// var str=null;
output.stdout.on('data', function (data) {
    //save db , send res qianduan
    str=data;
    console.log('stdout: ' + data);
});
// log.info("str=",str);

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

// router.get('/x', (req, res) => {

//     let data = child_process.execSync('python -V');
//     console.log(data);
//     return  res.json({
//         data:data,
//     });

// });

//get a template
router.get("/:id",function(req,res){
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    tempmodel.findById(req.params.id,function(err,template){
        if(!template){
            res.statusCode=404;

            return res.json({
                error:"404 Not found"
            });
        }

        if(!err){
            return res.json({
                status:'OK',
                template:template,
            });
        }else{
            res.statusCode = 500;
            log.error('Internal error '+res.statusCode+":"+err.message);

            return res.json({
                error:'Server error'
            });
        }
    });
});




//modify template
router.put('/:id',function(req,res){
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var templateID = req.params.id;
    log.info(templateID);
    tempmodel.findById(templateID,function(err,tempmodel){
        if(!tempmodel){
            res.statusCode = 404;
            log.error('template id:'+templateID+"Not found");
            return res.json({
                error:"404 NOT Found"
            });
        }


        tempmodel.name = req.body.name;
        tempmodel.description=req.body.description;
        tempmodel.templateNm=req.body.templateNm;
        tempmodel.template=req.body.template;
        tempmodel.keyNm=req.body.keyNm;
        tempmodel.types=req.body.types;
        tempmodel.status=req.body.status;
        tempmodel.createEid=req.body.createEid;

        tempmodel.save(function(err){
            if(!err){
                log.info('template with id:'+tempmodel.id+"is updated");
                return res.json({
                    status:"Ok",
                    tempmodel:tempmodel
                });
            }else{
                if(err.name==="ValidationError"){
                    res.statusCode = 400;
                    return res.json({
                        error:"Validation Error!!"
                    });
                }else{
                    res.statusCode = 500;

                    return res.json({
                        error:"Server error"
                    });
                }
                log.error("Internal error"+res.statusCode+":"+err.message);

            }
        });
    });
});

// router.post('/status',function(req,res){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     // // var id = req.params.id;
//     // var template = req.params.template;
//     var status = "new";

//     var plan = new plan({
//         name:req.body.name,
//         template:req.body.template,
//         status:status,
//         eid:req.body.eid,
//         time:new Date(),
//         result:"data",
//     });

//     plan.save(function(err){
//         if(!err){
//             log.info('the plan has been saved!');
//             return res.json({
//                 plan:plan,
//             });
//         }else{
//             if(err.name==="ValidationError"){
//                 res.statusCode=400;
//                  res.json({
//                      error:'Validation Error!',
//                  });
//             }else{
//                 res.statusCode=500;
//                 log.error("Internal error"+res.status);
//                 return  res.json({
//                     error:"The Server error!"
//                 });
//             }
//         }
//     });
// });


//delete template
router.delete('/:id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       var tempID = req.params.id;
       tempmodel.findById(tempID,function(err,tempmodel){
           if(!tempmodel){
               console.log("res,",res.statusCode)
               res.statusCode = 400;
               log.error("key:"+tempID+" is not found");
               return res.json({
                   error:"Not found"
               });
           }

           tempmodel.remove(function(err){
               if(!err){
                   log.info('key'+tempID+' is deleted')
                   return res.json({
                       status:"delete",
                   });
               }else{
                   if(err.name==="ValidationError"){
                       res.statusCode = 400;
                       return res.json({
                           error:'Validation  Error!'
                       });
                   }else{
                       res.statusCode=500;
                       return res.json({
                           error:"Server error"
                       });
                   }
                   log.error("Internal error"+res.statusCode+":"+err.message);
               }
           })
       });

       var
       spawn = require('child_process').spawn,
       exec = require('child_process').exec


   //+ create folder name-res,eid
// //    var folder = "res_eid";
//    var mkdir= exec("cd C:/Users/Dolphin/Desktop/ppt && mkdir "+folder);
//    var output1 = exec("cd C:/Users/Dolphin/Desktop/ppt/"+folder+" && terraform init")
   var output = exec("cd /usr/local/servers && terraform destory")

   output.stdout.on('data', function (data) {
       //save db , send res qianduan
       console.log('stdout: ' + data);
   });
   
   output.stderr.on('data', function (data) {
       console.log('stderr: ' + data);
   });
   
   output.on('exit', function (code) {
    //  if (code==1){
    //     output.stderr.on('data', function (data) {
    //         console.log('stderr: ' + data);
    //     });
    //  }
    //  if (code==0){
    //     output.stderr.on('data', function (data) {
    //         console.log('stderr: ' + data);
    //     });
    //  }

       console.log('child process exited with code ' + code);
   });


   });

   router.post('/id',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    if (status=="INPROGRESS"){
        return res.json({
            Inprogress:"in progress,you can't change it"
        })
    }else{
       var status = "INPROGRESS";
id="goo";
template="hi";
fs.writeFile('/usr/local/servers/'+id+'/'+ template+'.tf',template,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
    if (!err){
        console.log('success');
    }else{
        console.log('fail');
    }
});
// var output = exec("cd C:/Users/Dolphin/Desktop/ppt/"+id+" && terraform apply");
// var output1 = exec("cd C:/Users/Dolphin/Desktop/ppt && terraform apply");
var data=execSync("cd C:/Users/Dolphin/Desktop/ppt/"+id+" && terraform apply").toString();  //toString()
console.log("data=",data);

if (data.indexOf("Apply complete")>0){    //apply complete
     console.log("good success");
     var tempmodel = new tempmodel({
        name:"{type:String}",
        createEid:"{type:String}",
        description:"{type:String}",
        templateNm:"{type:String}",
        // templateUrl:{type:String},
        // templateUrl2:{type:String},
        template:"{type:String}",
        types:"{type:String}",
        status:"{type:String}",
        keyNm:"wyqx",
        // Date:new Date(),
        // // result:{type:String},
        // account:"5abb53744575294da493bd4f",
    });
     tempmodel.save(function(err){
         log.info("!!!!!!!!!!!!!!!!!!!!!!!!!!")
        if(!err){
            log.info('the plan has been saved!');
            return res.json({
                tempmodel:tempmodel,
            });
        }else{
    
                return  res.json({
                    error:"The Server error!"
                });
    
    
        }
    });
    //   res.json({
    //       data:data
    //   });
}else{
    console.log('some exception');
    // res.json({
    //     data:data
    // });
}
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




    }
});

module.exports=router;
