var loginModel = require('../models/login')
var checkLogin=async(name)=>{
    var UserInfo = await loginModel.getUserByName(name)
    return UserInfo
}
module.exports={
    checkLogin
}