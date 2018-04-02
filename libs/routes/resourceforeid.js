var express = require("express");

var router = express.Router();

var path = process.cwd() + '/libs/';

var log = require(path+'log')(module);

var db = require(path+'/db/mongoose');

var resource = require(path+"/model/resource");


//show by creater   name desc eid id ,status ,new Date
router.get('/:createEid',function(req,res){
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var createEid = req.params.createEid;
    resource.find({createEid},function(err,resource){
        if(!err){
            return res.json(resource);
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

module.exports=router;
