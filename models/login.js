var dbUser=require('../config/db').User
var getUserByName=(name)=>{
      return dbUser.findOne({name:name}).exec();
}
module.exports={
    getUserByName
}