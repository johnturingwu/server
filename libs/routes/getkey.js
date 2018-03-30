
var express = require("express");

var router = express.Router();

var path = process.cwd() + '/libs/';

var log = require(path+'log')(module);

var db = require(path+'/db/mongoose');

var keymodel = require(path+"/model/account");

//show all
router.get('/',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // log.info(keymodel+"sss");
    keymodel.find(function(err,keymodel){
       if(!err){
           return res.json(keymodel);
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

//show by key
router.get('/:id',function(req,res){
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    log.info(req.params.id,"and",req.params.keyNm);
    keymodel.findById(req.params.id,function(err,keymodel){
        if(!keymodel){
            res.statusCode=404;

            return  res.json({
                error:"404 Not found"
            });
        }
        if(!err){
            log.info(keymodel);
            return  res.json({
                status:"OK",
                keymodel:keymodel,
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




//add key
router.post('/',function(req,res){
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
      var keymodels=new keymodel({
        keyNm:req.body.keyNm,
        access_key:req.body.access_key,
        secret_key:req.body.secret_key,
        types:req.body.types,
        createEid:req.body.createEid,
        region:req.body.region,
      });

      keymodels.save(function(err){
          log.info(keymodels);
          if(!err){
              log.info('New key:'+"keymodels.id");
              return res.json({
                  status:"OK",
                  keymodels:keymodels
              });
          }else{
              if(err.name==="ValidationError"){
                  res.statusCode = 400;
                  res.json({
                      error:"Validation Error!"
                  });
              }else{
                  res.statusCode = 500;

                  log.error("Internet error"+res.statusCode+":"+err.message);

                  res.json({
                      error:'Server error'
                  });
              }
          }
      });
});

// // update key

router.put('/:id',function(req,res){
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
     var keyID = req.params.id;
     log.info(keyID);
    keymodel.findById(keyID,function(err,keymodel){
        if(!keymodel){
            res.statusCode = 404;
            log.error("key is not found",keyID);
            return res.json({
                error:'Not Found!'
            });
        }

        keymodel.keyNm = req.body.keyNm;
        keymodel.types = req.body.types;
        keymodel.access_key = req.body.access_key;
        keymodel.secret_key = req.body.secret_key;
        keymodel.createEid = req.body.createEid;
        keymodel.region = req.body.region;


        keymodel.save(function(err){
            if(!err){
                log.info('key id'+req.params.id+"is update");
                return res.json({
                    status:"Ok",
                    keymodel:keymodel
                });
            }else{
                if(err.name==='ValidationError'){
                    res.statusCode = 400;
                    return res.json({
                        error:"Validation Error!!!"
                    });
                }else {
                    res.statusCode = 500;
                    return res.json({
                        error:'Server error'
                    });
                }
                log.error("Internet error"+res.statusCode+":"+err.message);
            }
        });
    });
});

// module.exports = router;


//delete key
router.delete('/:id',function(req,res){
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var keyID = req.params.id;

    keymodel.findById(keyID,function(err,keymodel){
        if(!keymodel){
            console.log("res,",res.statusCode)
            res.statusCode = 400;
            log.error("key:"+keyID+" is not found");
            return res.json({
                error:"Not found"
            });
        }

        keymodel.remove(function(err){
            if(!err){
                log.info('key'+keyID+' is deleted')
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
});

module.exports = router;
