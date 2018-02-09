const express = require('express');
const router  = express.Router();
const path = require('path')
const fs = require('fs')
let infoMsg = require('../another.json')
router.post('/info/edit', (req,res,next) =>{
  let { aboutInfo } = req.body
  let modifiNum = 'self'+(parseInt(infoMsg.num)+1)
  infoMsg[modifiNum] = aboutInfo
  infoMsg['num']++
  fs.writeFile(path.join(__dirname,'../another.json'),JSON.stringify(infoMsg, null, 2), (err) =>{
    if(err){
      res.send({
        code:-200,
        message:err
    })
    }else{
      res.send({
        code:200,
        message:'更新成功'
    })
    }
  })
})

module.exports = router;