var dbClassify=require('../config/db').Classify
var createClass = (data)=>{
    try {
        return dbClassify.create(data).exec()
    } catch (error) {
        console.log(error)
    }
}

var findAllClass = (data)=>{
    try {
        return dbClassify.find()
                         .addCreateAt()
                         .sort({_id:-1})
                         .exec()
    } catch (error) {
        console.log(error)
    }
}
var checkClass = (name) =>{
    try {
        return dbClassify.findOne({
            classify:name
        }).exec()
    } catch (error) {
        console.log(error)
    }
}
var removeClassifyList = (classid)=>{
    try {
        return dbClassify.remove({
            _id:classid
        }).exec()
    } catch (error) {
        console.log(error)
    }
}
var updateClass = (classId,data)=>{
    try {
        return dbClassify.update({_id:classId},{$set:data}).exec()
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    createClass,
    findAllClass,
    checkClass,
    removeClassifyList,
    updateClass,
}