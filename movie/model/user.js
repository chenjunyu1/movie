const mongoose=require('mongoose');
const userSchema=require('../schema/user');

const userModel=mongoose.model('User',userSchema);


module.exports=userModel;