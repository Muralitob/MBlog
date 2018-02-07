var express = require('express');
var router  = express.Router();
var LoginController=require('../controllers/login')
var createToken = require('../middleware/createToken');
var sha1 = require('sha1');
require('dotenv').load()
router.post('/login',async(req,res,next)=>{
    var name=req.body.account;
    var password= sha1(req.body.password);
    var userInfo=await LoginController.checkLogin(name)
    if(userInfo){
        if(userInfo.password===password){
            res.json({
                code:200,
                message:'ok',
                token:createToken(name)
            })
        }else{
            res.json({
                code:-200,
                message:'用户名或者密码错误'
            })
        }
    }else{
        res.json({
            code:-200,
            message:'用户名或者密码错误'
        })
    }
})
module.exports = router;