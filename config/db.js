var Mongolass = require('mongolass')
var mongolass = new Mongolass()
var dbUrl = 'mongodb://mura_admin_blog:109226cat!@127.0.0.1:19999/mywebsite'
var moment = require('moment');//时间格式化(前后台都可以用的npm包)
var objectIdToTimestamp = require('objectid-to-timestamp')// 根据_id生成时间戳
var UserSchema = require('../schemas/User')
var ClassifySchema = require('../schemas/Classify')
var ArticleSchema = require('../schemas/Article')
// var env = process.env.NODE_ENV||'development'
// if(env ==='development'){
//   dbUrl = 'mongodb://localhost/mywebsite'
// }
mongolass.connect(dbUrl)

mongolass.plugin('addCreateAt',{
  afterFind:(results)=>{
    results.forEach((item)=>{
      item.created_at = item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    })
    return results
  },
  afterFindOne:(result)=>{
    if(result){
      result.created_at =result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result
  }
})
//用户
exports.User=mongolass.model('User',UserSchema)
exports.User.index({name:1},{unique:true}).exec(); //创建以name键升序排列的位移索引

//分类
exports.Classify=mongolass.model('Classify',ClassifySchema)
exports.Classify.index({_id:1}).exec();

//文章
exports.Article=mongolass.model('Article',ArticleSchema)
exports.Article.index({_id:1,classify:-1}).exec();