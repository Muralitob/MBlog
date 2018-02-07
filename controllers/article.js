var articleModel = require('../models/article')
//创建文章
var createArticle = (res,params)=>{
    articleModel.createArticle(params)
    .then(({result:{ok,n}})=>{
        if(ok&&n>0){
            res.json({
                code:200,
                    message:'创建成功'
                })
            }else{
                throw new Error('创建失败')
            }
        })
        .catch(err=>{
            res.json({
                code:200,
                message:err.toString()
            })
        })
    }
    //获取文章列表 带分页
var getArticleList = async(res,page,limit)=>{
        var lists = await articleModel.getArticleList(page,limit)
        /**前台不需要内容这些数据 */
        lists[0].forEach((article)=>{
        delete article.content,
        delete article.contentToMark
        })
    res.json({
        code:200,
        message:'请求成功',
        lists:lists
    })
}
// 获取所有文章(每次返回10个)前台使用
var getAllArticles = async(res,page,limit)=>{
    var lists = await articleModel.getArticleList(page,limit)
    var articleLists = lists[0],
        total = lists[1],
        totalPage =Math.ceil(total/limit)
        hasNext=totalPage>page?1:0,
        hasPrev=page>1
    articleLists.forEach((article)=>{
        delete article.content
    })
    res.json({
        code:200,
        message:'请求成功',
        articleLists,
        hasNext,
        hasPrev
    })
}
//删除一篇文章
var removeOneArticle = (res,id)=>{
    articleModel.removeOneArticle(id).then(({result:{ok,n}})=>{
        if(ok&&n>0){
            res.json({
                code:200,
                message:'删除成功',
            })
        }else{
            throw new Error ('删除失败')
        }
    }).catch(err=>{
        res.json({
            code:200,
            message:err.toString()
        })
    })
}
//根据id找到文章用于修改
var findOneArticle = (res,articleid)=>{
    articleModel.findOneArticle(articleid)
        .then((result)=>{
            if(result){
                res.json({
                    code:200,
                    message:'成功找到',
                    articleInfo:result
                })
            }else{
                res.json({
                    code:-200,
                    message:'无此数据'
                })
            }
        })
        .catch(err=>{
            res.json({
                code:-200,
                message:err.toString()
            })
        })
}
//编辑文章
var updateArticle = (res,id,data)=>{
    articleModel.updateArticle(id,data)
        .then(({result:{ok,n}})=>{
            if(ok&&n>0){
                res.json({
                    code:200,
                    message:'更新成功',
                })
            }else{
                throw new Error('编辑失败')
            }
        }).catch(err=>{
            res.json({
                code:-200,
                message:err.toString(),
            })
        })
}
var getArticleListByClassify = (res,classify)=>{
    articleModel.getArticleListByClassify(classify)
        .then((articleLists)=>{
            articleLists.forEach((article=>{
                delete article.content
           }))  
           res.json({
               code:200,
               message:'查找成功',
               articleLists
           })
        })
        .catch(err=>{
            res.json({
                code:200,
                message:err.toString()
            })
        })
}
module.exports={
    createArticle,
    getArticleList,
    removeOneArticle,
    findOneArticle,
    updateArticle,
    getAllArticles,
    getArticleListByClassify,
}