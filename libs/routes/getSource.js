

var express = require("express");

var router = express.Router();

var path = process.cwd() + '/libs/';

var log = require(path+'log')(module);

var db = require(path+'/db/mongoose');
var account = require(path+"/model/account");
var resource=require(path+'/model/resource');
var cmds = require(path+"/utils/cmds");

router.get("/:id",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    keyNm=req.params.keyNm;
    resource.findById(req.params.id).populate(keyNm).exec(function(err,resource){
        if (!err){
            log.info(resource.keyNm.access_key);
        }
    });
    // req.params.id
    // tempmodel.findById(req.params.id,function(err,tempmodel){
    //     log.info("......."+tempmodel.keyNm);
    //     keyname=tempmodel.keyNm;
    //     keymodel.find({keyname},function(err,keymodel){
    //         log.info(keymodel+"111");
    //         return res.json(keymodel.secret_key+"aaaa")
    //     });
    //     // return res.json(tempmodel.name+"hello");
    // });

});
module.exports=router;