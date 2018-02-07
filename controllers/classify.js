var ClassifyModel=require('../models/classify')
var createClass = async(res,data)=>{
    var Info = await ClassifyModel.checkClass(data.classify)
    if(Info){
        res.json({
            code:-200,
            message:'创建失败,有相同的了'
        })
        return
    }else{
        ClassifyModel.createClass(data)
            .then(({result:{ok,n}})=>{
                if(ok&&n>=1){
                    res.send({
                        code:200,
                        message:'创建成功'
                    })
                }else{
                    throw new Error('创建失败')
                }
            })
    }
}
var getClassify=(async()=>{
    var lists=await ClassifyModel.findAllClass()
    return lists
})
var removeClassifyList = async(id)=>{
     return await ClassifyModel.removeClassifyList(id)
}
var updateClass = async(classId,data)=>{
    return await ClassifyModel.updateClass(classId,data)
}
module.exports={
    createClass,
    getClassify,
    removeClassifyList,
    updateClass,
}