//model
const movie = require('../model/movie');
const Comment=require('../model/comment');
const ObjectId = require('mongoose').Types.ObjectId // 把字符串转为ObjectId类型
//ObjectId

//展示电影详情页
exports.movieDetail=(req,res)=>{
    let {id}=req.params;
    movie.findById(id,(err,docObj)=>{
        if(err){console.log(err);return}
        console.log(ObjectId(id))
        Comment.find({movie: ObjectId(id)})
            .populate('from','username')
            .populate('reply.from reply.to','username')
            .sort({'meta.createAt':-1})
            .exec((err,commentArr)=>{
                if(err){
                    console.log(err);
                    return
                }
                console.log(commentArr)
                res.render('./page/detail',{'title':movie.movieName,movie:docObj,comments:commentArr})
            })
    })
}