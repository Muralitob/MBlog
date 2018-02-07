var dbArticle = require('../config/db').Article

var createArticle = (params)=>{
    try {
        return dbArticle.create(params).exec();
    } catch (error) {
        throw new Error('数据库错误')
    }
    
}
var getArticleList = (page,limit)=>{
    try {
        if(page&&limit){
            var skip = (page-1)*limit
            return Promise.all([
                dbArticle.find()
                .addCreateAt()
                .skip(skip)
                .limit(limit)
                .sort({_id:-1})
                .exec(),
                dbArticle.count().exec()
            ])
        }else{
            return dbArticle.find()
                            .addCreateAt()
                            .sort({_id:-1})
                            .exec();
        }
    } catch (error) {
        throw new Error('数据库错误')
    }
}
var removeOneArticle = (articleid)=>{
    try {
        return dbArticle.remove({
            _id:articleid
        }).exec()
    } catch (error) {
        console.log(error)
    }
}
var findOneArticle = (articleid)=>{
    try {
        return dbArticle.findOne({
            _id:articleid
        }).addCreateAt()
          .exec()
    } catch (error) {
        
    }
}
var updateArticle = (articleid,data)=>{
    try {
        return dbArticle.update({
            _id:articleid,
        },
        {
            $set:data
        })
    } catch (error) {
        console.log(error)
    }
}
var getArticleListByClassify = (classify)=>{
    try {
        return dbArticle.find({classify})
                        .addCreateAt()
                        .sort({_id:-1})
                        .exec()
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    createArticle,
    getArticleList,
    removeOneArticle,
    findOneArticle,
    updateArticle,
    getArticleListByClassify,
}