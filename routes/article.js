var express = require('express');
var router  = express.Router();
var artilceController = require('../controllers/article')
router.post('/article/create',(req,res,next)=>{
    artilceController.createArticle(res,req.body)
})
router.post('/article/lists',(req,res,next)=>{
    var {page,limit} = req.body
    artilceController.getArticleList(res,page,limit)
})
router.post('/article/remove',(req,res,next)=>{
    var id = req.body.id
    artilceController.removeOneArticle(res,id)
})
router.post('/article/onePage',(req,res,next)=>{
    var id = req.body.id
    artilceController.findOneArticle(res,id)
})
router.post('/article/edit',(req,res,next)=>{
    var id = req.body.id
    var title = req.body.title
    var content = req.body.content
    var contentToMark = req.body.contentToMark
    var classify = req.body.classify
    artilceController.updateArticle(res,id,{title,content,contentToMark,classify})
})
router.post('/article/Alllists',(req,res,next)=>{
    var {page,limit} = req.body
    artilceController.getAllArticles(res,page,limit)
})
// 根据classify获取文章列表
router.post('/article/articleClassify',(req,res,next)=>{
    var {classify}= req.body;
    artilceController.getArticleListByClassify(res,classify)
})
module.exports = router;