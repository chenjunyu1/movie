const mongoose=require('mongoose');
const commentSchema=require('../schema/comment');

const commentModel=mongoose.model('Comment',commentSchema);


module.exports=commentModel;