var express = require("express");

var router = express.Router();

var path = process.cwd() + '/libs/';

var log = require(path+'log')(module);

var db = require(path+'/db/mongoose');

var resource = require(path+"/model/resource");
var account = require(path+"/model/account");

//show by creater
router.get('/:keyNm',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var keyNm = req.params.keyNm;
    log.info(keyNm+"1111");
    resource.findOne({keyNm:keyNm}).exec(function(err,resource){
        if(!err){
            log.info(resource+"1111");
            resource.populate('account',function(err){
                if (!err){
                    return  res.json({
                        "access_key":resource.account[0].access_key,
                        "secret_key":resource.account[0].secret_key,
                    });
                }else{
                    return res.json({
                        error:"Server errorxxxxxxxxxxxxxxxxxxx"
                    });
                }
            });
        }else{
            return res.json({
                error:"Server error!!!!!!!!!!!!!!!!!!"
            });
        }
    });

});

module.exports=router;