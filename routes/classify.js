var express = require('express');
const router  = express.Router();
const ClassifyController=require('../controllers/classify')
router.post('/classify/create',(req,res,next)=>{
    ClassifyController.createClass(res,req.body)
})
router.get('/classify/lists',async (req,res,next)=>{
    let lists=await ClassifyController.getClassify()
    res.json({
        code:200,
        lists:lists,
    })
})
router.post('/classify/remove',(req,res,next)=>{
    ClassifyController.removeClassifyList(req.body.id)
        .then(({result:{ok,n}})=>{
            if(ok&&n>0){
                res.send({
                    code:200,
                    message:'删除成功'
                })
            }else{
                throw new Error('该分类不存在')
            }
        }).catch(err=>{
            res.send({
                code:-200,
                message:err.toString()
            })
        })
})
router.post('/classify/edit',(req,res,next)=>{
    var id = req.body.id
    var classify = req.body.classify
    ClassifyController.updateClass(id,{classify:classify})
        .then(({result:{ok,n}})=>{
            if(ok&&n>0){
                res.send({
                    code:200,
                    message:'修改成功'
                })
            }else{
                throw new Error('修改失败')
            }
        }).catch(err=>{
            res.send({
                code:-200,
                message:err.toString()
            })
        })
})
router.post('/article/articleLists',(req,res,next)=>{
    
})
module.exports = router;