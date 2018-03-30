var express = require("express");

var router = express.Router();

var path = process.cwd() + '/libs/';

var log = require(path+'log')(module);

var db = require(path+'/db/mongoose');

var keymodel = require(path+"/model/account");


//show by creater
router.get('/:createEid',function(req,res){
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");    
    var createEid = req.params.createEid;
    keymodel.find({createEid},function(err,keymodel){
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
    // keymodel.find(createEid,function(err,keymodel){
    //     if(!keymodel){
    //         log.info(keymodel);
    //         res.statusCode=404;
    //         return  res.json({
    //             error:"404 Not found"
    //         });
    //     }
    //     if(!err){
    //         log.info(createEid);
    //         return  res.json({
    //             status:"OK",
    //             keymodel:keymodel,

    //         });
    //     }else{
    //         res.statusCode = 500;
    //         log.error('Internal error '+res.statusCode+":"+err.message);
    //         log.info(keymodel);
    //         return res.json({
    //             error:'Server error'
    //         });
    //     }


    // });
});

module.exports=router;
